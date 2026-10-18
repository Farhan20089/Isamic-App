package com.islamicapp.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.content.res.AssetFileDescriptor;
import android.graphics.drawable.Icon;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import android.os.Looper;
import android.os.PowerManager;

import java.io.File;

/** Foreground service that plays the azan and shows a notification with a Stop button. */
public class AzanService extends Service {
    static final String CHANNEL = "azan_channel";
    static final String CHANNEL_FALLBACK = "azan_fallback";
    static final int NOTIF_ID = 4242;

    private MediaPlayer player;
    private PowerManager.WakeLock wakeLock;
    private AudioManager audioManager;
    private AudioFocusRequest focusRequest;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable killer = new Runnable() {
        @Override
        public void run() {
            stopAll();
        }
    };

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && "STOP".equals(intent.getAction())) {
            stopAll();
            return START_NOT_STICKY;
        }
        String name = intent != null ? intent.getStringExtra("name") : null;
        if (name == null) name = "";
        startForegroundCompat(name);
        playAzan();
        return START_NOT_STICKY;
    }

    private void startForegroundCompat(String name) {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (nm.getNotificationChannel(CHANNEL) == null) {
            NotificationChannel ch = new NotificationChannel(CHANNEL, "Azan", NotificationManager.IMPORTANCE_HIGH);
            ch.setSound(null, null);
            ch.enableVibration(false);
            nm.createNotificationChannel(ch);
        }
        PendingIntent open = PendingIntent.getActivity(this, 0, new Intent(this, MainActivity.class),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Intent stop = new Intent(this, AzanService.class);
        stop.setAction("STOP");
        PendingIntent stopPi = PendingIntent.getService(this, 1, stop,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification n = new Notification.Builder(this, CHANNEL)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentTitle("🕌 " + name)
                .setContentText(getString(R.string.azan_time))
                .setContentIntent(open)
                .setOngoing(true)
                .setCategory(Notification.CATEGORY_ALARM)
                .addAction(new Notification.Action.Builder(
                        Icon.createWithResource(this, android.R.drawable.ic_media_pause),
                        getString(R.string.stop), stopPi).build())
                .build();
        if (Build.VERSION.SDK_INT >= 29) {
            startForeground(NOTIF_ID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
        } else {
            startForeground(NOTIF_ID, n);
        }
    }

    private void playAzan() {
        release();
        handler.removeCallbacks(killer);
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "islamicapp:azan");
        wakeLock.acquire(10 * 60 * 1000L);

        String sound = AzanScheduler.prefs(this).getString("sound", "tone");
        if ("silent".equals(sound)) {
            handler.postDelayed(killer, 8000);
            return;
        }
        requestFocus();
        File custom = new File(getFilesDir(), "azan_custom");
        boolean started = false;
        if ("custom".equals(sound) && custom.exists()) {
            started = tryPlay(true);
        }
        if (!started) {
            started = tryPlay(false);
        }
        if (started) {
            handler.postDelayed(killer, 8 * 60 * 1000L);
        } else {
            stopAll();
        }
    }

    private boolean tryPlay(boolean useCustom) {
        try {
            MediaPlayer mp = new MediaPlayer();
            mp.setAudioAttributes(new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_ALARM)
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .build());
            if (useCustom) {
                mp.setDataSource(new File(getFilesDir(), "azan_custom").getAbsolutePath());
            } else {
                AssetFileDescriptor afd = getResources().openRawResourceFd(R.raw.chime);
                mp.setDataSource(afd.getFileDescriptor(), afd.getStartOffset(), afd.getLength());
                afd.close();
            }
            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer m) {
                    stopAll();
                }
            });
            mp.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                @Override
                public boolean onError(MediaPlayer m, int what, int extra) {
                    stopAll();
                    return true;
                }
            });
            mp.prepare();
            mp.start();
            player = mp;
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void requestFocus() {
        try {
            audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            focusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
                    .setAudioAttributes(new AudioAttributes.Builder()
                            .setUsage(AudioAttributes.USAGE_ALARM)
                            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                            .build())
                    .build();
            audioManager.requestAudioFocus(focusRequest);
        } catch (Exception ignored) {
        }
    }

    private void release() {
        if (player != null) {
            try {
                player.stop();
            } catch (Exception ignored) {
            }
            player.release();
            player = null;
        }
        if (audioManager != null && focusRequest != null) {
            try {
                audioManager.abandonAudioFocusRequest(focusRequest);
            } catch (Exception ignored) {
            }
            focusRequest = null;
        }
        if (wakeLock != null && wakeLock.isHeld()) {
            wakeLock.release();
        }
        wakeLock = null;
    }

    private void stopAll() {
        handler.removeCallbacks(killer);
        release();
        stopForeground(STOP_FOREGROUND_REMOVE);
        stopSelf();
    }

    @Override
    public void onDestroy() {
        handler.removeCallbacks(killer);
        release();
        super.onDestroy();
    }

    /** Used when Android refuses to start the foreground service: show a normal notification with sound. */
    static void postFallback(Context c, String name) {
        NotificationManager nm = c.getSystemService(NotificationManager.class);
        if (nm.getNotificationChannel(CHANNEL_FALLBACK) == null) {
            nm.createNotificationChannel(new NotificationChannel(CHANNEL_FALLBACK, "Azan alert",
                    NotificationManager.IMPORTANCE_HIGH));
        }
        PendingIntent open = PendingIntent.getActivity(c, 0, new Intent(c, MainActivity.class),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification n = new Notification.Builder(c, CHANNEL_FALLBACK)
                .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
                .setContentTitle("🕌 " + name)
                .setContentText(c.getString(R.string.azan_time))
                .setContentIntent(open)
                .setAutoCancel(true)
                .build();
        nm.notify(NOTIF_ID + 1, n);
    }
}

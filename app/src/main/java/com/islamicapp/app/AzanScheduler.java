package com.islamicapp.app;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

/** Keeps the list of upcoming azan times and registers them with AlarmManager. */
public class AzanScheduler {
    static final String PREFS = "azan_prefs";
    static final String ACTION_AZAN = "com.islamicapp.app.AZAN";

    static SharedPreferences prefs(Context c) {
        return c.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    /** json = [{"t": epochMillis, "n": "Fajr"}, ...] */
    static void saveAndSchedule(Context c, String json, String sound) {
        cancelAll(c);
        prefs(c).edit().putString("list", json).putString("sound", sound).apply();
        scheduleAll(c);
    }

    private static PendingIntent alarmIntent(Context c, long t, String name) {
        Intent i = new Intent(c, AzanReceiver.class);
        i.setAction(ACTION_AZAN);
        i.putExtra("name", name);
        int code = (int) (t / 60000L);
        return PendingIntent.getBroadcast(c, code, i,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    static void cancelAll(Context c) {
        String json = prefs(c).getString("list", null);
        if (json == null) return;
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        try {
            JSONArray a = new JSONArray(json);
            for (int k = 0; k < a.length(); k++) {
                JSONObject o = a.getJSONObject(k);
                am.cancel(alarmIntent(c, o.getLong("t"), o.optString("n", "")));
            }
        } catch (Exception ignored) {
        }
    }

    static void scheduleAll(Context c) {
        String json = prefs(c).getString("list", null);
        if (json == null) return;
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        long now = System.currentTimeMillis();
        boolean exact = Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms();
        PendingIntent show = PendingIntent.getActivity(c, 0, new Intent(c, MainActivity.class),
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        try {
            JSONArray a = new JSONArray(json);
            for (int k = 0; k < a.length(); k++) {
                JSONObject o = a.getJSONObject(k);
                long t = o.getLong("t");
                if (t <= now) continue;
                PendingIntent pi = alarmIntent(c, t, o.optString("n", ""));
                try {
                    if (exact) {
                        am.setAlarmClock(new AlarmManager.AlarmClockInfo(t, show), pi);
                    } else {
                        am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, t, pi);
                    }
                } catch (SecurityException e) {
                    am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, t, pi);
                }
            }
        } catch (Exception ignored) {
        }
    }
}

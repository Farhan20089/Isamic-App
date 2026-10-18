package com.islamicapp.app;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.OpenableColumns;
import android.provider.Settings;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.webkit.WebViewAssetLoader;

import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class MainActivity extends Activity {
    private static final int REQ_PICK = 11;
    private static final int REQ_NOTIF = 12;
    private static final int REQ_LOC = 13;

    private WebView web;
    private GeolocationPermissions.Callback geoCallback;
    private String geoOrigin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        web = new WebView(this);
        setContentView(web);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setGeolocationEnabled(true);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();
        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }
        });
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                if (checkSelfPermission(Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                    callback.invoke(origin, true, false);
                } else {
                    geoCallback = callback;
                    geoOrigin = origin;
                    requestPermissions(new String[]{
                            Manifest.permission.ACCESS_COARSE_LOCATION,
                            Manifest.permission.ACCESS_FINE_LOCATION}, REQ_LOC);
                }
            }
        });
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        web.loadUrl("https://appassets.androidplatform.net/assets/www/index.html");

        if (Build.VERSION.SDK_INT >= 33
                && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_NOTIF);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQ_LOC && geoCallback != null) {
            boolean ok = grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED;
            geoCallback.invoke(geoOrigin, ok, false);
            geoCallback = null;
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_PICK && resultCode == RESULT_OK && data != null && data.getData() != null) {
            final Uri uri = data.getData();
            new Thread(new Runnable() {
                @Override
                public void run() {
                    copyAzan(uri);
                }
            }).start();
        }
    }

    private void copyAzan(Uri uri) {
        String name = "azan";
        try {
            ContentResolver cr = getContentResolver();
            Cursor cur = cr.query(uri, null, null, null, null);
            if (cur != null) {
                try {
                    int idx = cur.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                    if (idx >= 0 && cur.moveToFirst()) name = cur.getString(idx);
                } finally {
                    cur.close();
                }
            }
            File out = new File(getFilesDir(), "azan_custom");
            long total = 0;
            InputStream in = cr.openInputStream(uri);
            OutputStream os = new FileOutputStream(out);
            try {
                byte[] buf = new byte[16384];
                int n;
                while ((n = in.read(buf)) > 0) {
                    total += n;
                    if (total > 20L * 1024 * 1024) throw new Exception("too big");
                    os.write(buf, 0, n);
                }
            } finally {
                os.close();
                in.close();
            }
            AzanScheduler.prefs(this).edit().putString("custom_name", name).apply();
            final String js = "window.onNativeAzanPicked&&onNativeAzanPicked(" + JSONObject.quote(name) + ")";
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    web.evaluateJavascript(js, null);
                }
            });
        } catch (Exception e) {
            new File(getFilesDir(), "azan_custom").delete();
        }
    }

    /** Functions the web page can call as AndroidBridge.xxx() */
    private class Bridge {
        @JavascriptInterface
        public boolean isNative() {
            return true;
        }

        @JavascriptInterface
        public void schedule(String json, String sound) {
            AzanScheduler.saveAndSchedule(getApplicationContext(), json, sound);
        }

        @JavascriptInterface
        public void pickAzan() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                    i.addCategory(Intent.CATEGORY_OPENABLE);
                    i.setType("audio/*");
                    startActivityForResult(i, REQ_PICK);
                }
            });
        }

        @JavascriptInterface
        public void clearAzan() {
            new File(getFilesDir(), "azan_custom").delete();
            AzanScheduler.prefs(MainActivity.this).edit().remove("custom_name").apply();
        }

        @JavascriptInterface
        public boolean hasCustom() {
            return new File(getFilesDir(), "azan_custom").exists();
        }

        @JavascriptInterface
        public String customName() {
            return AzanScheduler.prefs(MainActivity.this).getString("custom_name", "azan");
        }

        @JavascriptInterface
        public void testAzan(String name) {
            Intent s = new Intent(MainActivity.this, AzanService.class);
            s.putExtra("name", name);
            startForegroundService(s);
        }

        @JavascriptInterface
        public void stopAzan() {
            stopService(new Intent(MainActivity.this, AzanService.class));
        }

        @JavascriptInterface
        public boolean canExact() {
            if (Build.VERSION.SDK_INT < 31) return true;
            AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
            return am.canScheduleExactAlarms();
        }

        @JavascriptInterface
        public boolean notifOk() {
            if (Build.VERSION.SDK_INT >= 33
                    && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
            return true;
        }

        @JavascriptInterface
        public void askNotif() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= 33) {
                        requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, REQ_NOTIF);
                    }
                }
            });
        }

        @JavascriptInterface
        public void openExactSettings() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= 31) {
                        Intent i = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
                                Uri.parse("package:" + getPackageName()));
                        startActivity(i);
                    }
                }
            });
        }

        @JavascriptInterface
        public void openBatterySettings() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS));
                    } catch (Exception e) {
                        startActivity(new Intent(Settings.ACTION_SETTINGS));
                    }
                }
            });
        }

        @JavascriptInterface
        public void share(final String text) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Intent s = new Intent(Intent.ACTION_SEND);
                    s.setType("text/plain");
                    s.putExtra(Intent.EXTRA_TEXT, text);
                    startActivity(Intent.createChooser(s, null));
                }
            });
        }
    }
}

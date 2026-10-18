package com.islamicapp.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Fires when an azan alarm goes off, even if the app is closed. */
public class AzanReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String name = intent.getStringExtra("name");
        if (name == null) name = "";
        Intent s = new Intent(context, AzanService.class);
        s.putExtra("name", name);
        try {
            context.startForegroundService(s);
        } catch (Exception e) {
            AzanService.postFallback(context, name);
        }
    }
}

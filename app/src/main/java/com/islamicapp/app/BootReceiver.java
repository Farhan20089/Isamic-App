package com.islamicapp.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/** Re-registers the saved azan alarms after reboot, app update, or clock/time-zone change. */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        AzanScheduler.cancelAll(context);
        AzanScheduler.scheduleAll(context);
    }
}

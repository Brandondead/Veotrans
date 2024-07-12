package com.veotrans;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.view.View;
import android.os.Handler;

import java.io.File;
import java.io.IOException;;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "VeoTrans";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        View decorView = getWindow().getDecorView();
        HideNavigationBarUtil hideNavigationBarUtil = new HideNavigationBarUtil(decorView);
        hideNavigationBarUtil.startHidingNavigationBar();
        clearCache();
    }

    @Override
    public void onBackPressed() {
    }

    private void clearCache() {
        try {
            File dir = getApplicationContext().getCacheDir();
            if (dir != null && dir.isDirectory()) {
                deleteDir(dir);
            }
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    private boolean deleteDir(File dir) {
        if (dir != null && dir.isDirectory()) {
            String[] children = dir.list();
            for (int i = 0; i < children.length; i++) {
                boolean success = deleteDir(new File(dir, children[i]));
                if (!success) {
                    return false;
                }
            }
        }
        return dir.delete();
    }
}

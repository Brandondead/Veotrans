package com.veotrans;

import android.os.Handler;
import android.view.View;

public class HideNavigationBarUtil {

    private static final long HIDE_NAVIGATION_DELAY = 3000; // Tiempo en milisegundos antes de ocultar la barra de
                                                            // navegación
    private final View decorView;
    private final Handler handler;

    public HideNavigationBarUtil(View decorView) {
        this.decorView = decorView;
        this.handler = new Handler();
    }

    public void startHidingNavigationBar() {
        decorView.setOnSystemUiVisibilityChangeListener(visibility -> {
            if ((visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                // La barra de navegación está visible, programar para ocultarla después de un
                // tiempo
                handler.postDelayed(this::hideNavigationBar, HIDE_NAVIGATION_DELAY);
            }
        });
        hideNavigationBar(); // Ocultar inmediatamente al iniciar
    }

    private void hideNavigationBar() {
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    }
}

package com.veotrans.offscreen;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;

public class OffScreenModule extends ReactContextBaseJavaModule {

    private DevicePolicyManager devicePolicyManager;
    private ComponentName compName;
    private static final int REQUEST_CODE_ENABLE_ADMIN = 1;
    private Promise turnOffScreenPromise;

    public OffScreenModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
        Context context = getReactApplicationContext();
        devicePolicyManager = (DevicePolicyManager) context.getSystemService(Context.DEVICE_POLICY_SERVICE);
        compName = new ComponentName(context, MyDeviceAdminReceiver.class);

        // Registrar el ActivityEventListener
        reactContext.addActivityEventListener(new BaseActivityEventListener() {
            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == REQUEST_CODE_ENABLE_ADMIN) {
                    if (resultCode == Activity.RESULT_OK) {
                        if (devicePolicyManager.isAdminActive(compName)) {
                            devicePolicyManager.lockNow();
                            if (turnOffScreenPromise != null) {
                                turnOffScreenPromise.resolve("Pantalla apagada");
                            }
                        } else {
                            if (turnOffScreenPromise != null) {
                                turnOffScreenPromise.reject("No se pudo activar el administrador de dispositivos");
                            }
                        }
                    } else {
                        if (turnOffScreenPromise != null) {
                            turnOffScreenPromise.reject("El usuario canceló la activación del administrador de dispositivos");
                        }
                    }
                }
            }
        });
    }

    @Override
    public String getName() {
        return "OffScreen";
    }

    @ReactMethod
    public void turnOffScreen(Promise promise) {
        Context context = getReactApplicationContext();
        if (devicePolicyManager.isAdminActive(compName)) {
            devicePolicyManager.lockNow();
            promise.resolve("Pantalla apagada");
        } else {
            turnOffScreenPromise = promise;
            Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
            intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, compName);
            intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "Necesitamos activar el administrador de dispositivos para apagar la pantalla.");
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                currentActivity.startActivityForResult(intent, REQUEST_CODE_ENABLE_ADMIN);
            } else {
                promise.reject("No se pudo iniciar la actividad para activar el administrador de dispositivos");
            }
        }
    }
    
}

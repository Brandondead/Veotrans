package com.veotrans;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.capslock.RNDeviceBrightness.RNDeviceBrightness;

import com.veotrans.offscreen.OffScreenPackage;

import com.thebylito.navigationbarcolor.NavigationBarColorPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.opensettings.OpenSettingsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceBrightness(),
            new NavigationBarColorPackage(),
            new KCKeepAwakePackage(),
            new AsyncStoragePackage(),
            new ReactToolbarPackage(),
            new ReactNativeLocalizationPackage(),
            new RNGestureHandlerPackage(),
            new OpenSettingsPackage(),
            new SplashScreenReactPackage(),
            new RNScreensPackage(),
            new ScreenPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new SafeAreaContextPackage(),
            new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

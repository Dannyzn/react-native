package com.rn_project;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rn_project.jason.JasonDecodeDialog;
import com.rn_project.jason.JasonToast;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by david on 19/4/2017.
 */

public class JasonReactPackage implements ReactPackage {

    //注册Java Native模块
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> list = new ArrayList<NativeModule>();
        list.add(new JasonToast(reactContext));
        list.add(new JasonDecodeDialog(reactContext));
        return list;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}

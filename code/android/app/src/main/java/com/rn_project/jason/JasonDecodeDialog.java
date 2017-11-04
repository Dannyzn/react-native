package com.rn_project.jason;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rn_project.R;

/**
 * Created by david on 19/4/2017.
 */

public class JasonDecodeDialog extends ReactContextBaseJavaModule{


    public JasonDecodeDialog(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "JasonDecodeDialog";
    }

    @ReactMethod
    public void alert(final Callback successCallback, final Callback errorCallback){
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
        builder.setTitle("标题");
        View layout = LayoutInflater.from(getCurrentActivity()).inflate(R.layout.dialog_layout,null);
        final EditText et_input1 = (EditText) layout.findViewById(R.id.et_input1);
        final EditText et_input2 = (EditText) layout.findViewById(R.id.et_input2);
        builder.setView(layout);
        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                try{
                    String str = et_input1.getText().toString() + et_input2.getText().toString();
                    String result = str;
                    //String result = new String(MD5Util.md5(str));
                    //调用js的回调函数，传参
                    successCallback.invoke(result);
                }catch (Exception e){
                    e.printStackTrace();
                    errorCallback.invoke(e.getMessage());
                }
            }
        });

        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });

        builder.create().show();
    }
}

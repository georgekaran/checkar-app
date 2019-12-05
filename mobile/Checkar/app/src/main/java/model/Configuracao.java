package model;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.checkar.R;

public class Configuracao {
    public static Configuracao configGerais = null;
    private SharedPreferences sharedPref;

    public Configuracao(Context context) {
        this.sharedPref = context.getSharedPreferences(context.getString(R.string.preference_file_key), Context.MODE_PRIVATE);
    }

    public void salvarConfig(String chave, String valor){
        SharedPreferences.Editor editor = this.sharedPref.edit();
        editor.putString(chave, valor);
        editor.commit();
    }

    public String lerConfig(String chave){
        return sharedPref.getString(chave, "");
    };
}

package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import db.DatabaseConnection;
import model.Configuracao;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        DatabaseConnection.getInstance(this);

        Configuracao.configGerais = new Configuracao(this);

        Intent intent= new Intent(MainActivity.this, LoginActivity.class);
        intent.setAction(Intent.ACTION_VIEW); // opcional
        startActivity(intent);
    }
}

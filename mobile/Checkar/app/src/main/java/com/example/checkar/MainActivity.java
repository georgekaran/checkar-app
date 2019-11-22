package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

import db.DatabaseConnection;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        DatabaseConnection.getInstance(this);

        Intent intent= new Intent(MainActivity.this, Login.class);
        intent.setAction(Intent.ACTION_VIEW); // opcional
        startActivity(intent);
    }
}

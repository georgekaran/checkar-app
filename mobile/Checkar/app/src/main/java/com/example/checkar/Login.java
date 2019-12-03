package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.Toast;

import dao.UserDAO;
import model.Usuario;

public class Login extends AppCompatActivity implements View.OnClickListener {
    EditText etEmail = null;
    EditText etSenha = null;
    Button btEntrar = null;
    CheckBox cbLembrar = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etEmail = (EditText) findViewById(R.id.et_email);
        etSenha = (EditText) findViewById(R.id.et_senha);
        btEntrar = (Button) findViewById(R.id.bt_entrar);
        cbLembrar = (CheckBox) findViewById(R.id.cb_lembrar_me);

        btEntrar.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.bt_entrar:
                Entrar();
                break;
        }
    }

    public void Entrar(){
        String email = etEmail.getText().toString();
        String senha = etSenha.getText().toString();

        if (email.equals("") || senha.equals("")){
            Toast toast = Toast.makeText(this, "Verifique as informações do usuário!", Toast.LENGTH_LONG);
            toast.show();
        } else {
            UserDAO userDAO = new UserDAO();
            Usuario user = userDAO.login(this, email, senha);

            if (user!=null) {
                // Entra no app
            } else {
                Toast toast = Toast.makeText(this, "Verifique as informações do usuário!", Toast.LENGTH_LONG);
                toast.show();

                Intent intent= new Intent(Login.this, MenuPrincipal.class);
                intent.setAction(Intent.ACTION_VIEW); // opcional
                startActivity(intent);
            }
        }
    }
}

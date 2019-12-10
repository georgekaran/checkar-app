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
import model.Configuracao;
import model.Usuario;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {
    EditText etEmail = null;
    EditText etSenha = null;
    Button btEntrar = null;
    CheckBox cbLembrar = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        setTitle("Login");

        etEmail = (EditText) findViewById(R.id.et_email);
        etSenha = (EditText) findViewById(R.id.et_senha);
        btEntrar = (Button) findViewById(R.id.bt_entrar);
        cbLembrar = (CheckBox) findViewById(R.id.cb_lembrar_me);

        btEntrar.setOnClickListener(this);

        if (Configuracao.configGerais.lerConfig(getString(R.string.config_lembrar)).equals("T")){
            cbLembrar.setChecked(true);
            etEmail.setText(Configuracao.configGerais.lerConfig(getString(R.string.config_email)));
            etSenha.setText(Configuracao.configGerais.lerConfig(getString(R.string.config_senha)));
        } else {
            cbLembrar.setChecked(false);
            etEmail.setText("");
            etSenha.setText("");
        }
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

                if (cbLembrar.isChecked()){
                    Configuracao.configGerais.salvarConfig(getString(R.string.config_email), etEmail.getText().toString());
                    Configuracao.configGerais.salvarConfig(getString(R.string.config_senha), etSenha.getText().toString());
                    Configuracao.configGerais.salvarConfig(getString(R.string.config_lembrar), cbLembrar.isChecked()?"T":"F");
                }

                Intent intent= new Intent(LoginActivity.this, MenuActivity.class);
                intent.setAction(Intent.ACTION_VIEW); // opcional
                startActivity(intent);
            }
        }
    }
}

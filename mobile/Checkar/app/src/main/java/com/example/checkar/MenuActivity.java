package com.example.checkar;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.Menu;
import android.view.MenuItem;

import android.view.View;
import android.widget.Toast;

import AdapterList.VeiculoAdapter;
import AdapterList.VistoriaAdapter;
import dao.VeiculoDAO;
import dao.VistoriaDAO;
import model.Vistoria;

public class MenuActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        FloatingActionButton btNovaVistoria = (FloatingActionButton) findViewById(R.id.bt_nova_vistoria);
        btNovaVistoria.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG).setAction("Action", null).show();
                Intent intent= new Intent(MenuActivity.this, VistoriaActivity.class);
                intent.setAction(Intent.ACTION_VIEW); // opcional
                startActivity(intent);
            }
        });

        listarVistoriasRealizadas();
    }

    public void listarVistoriasRealizadas(){
        RecyclerView rv = (RecyclerView) findViewById(R.id.rv_vistorias);

        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setHasFixedSize(true);

        LinearLayoutManager llm = new LinearLayoutManager(this);
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        rv.setLayoutManager(llm);

        VistoriaAdapter vistoriaAdapter = new VistoriaAdapter(new VistoriaDAO().selectAll(this));
        rv.setAdapter(vistoriaAdapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        int idItem = item.getItemId();

        if (idItem == R.id.acao_configuracao){
            Intent intent= new Intent(MenuActivity.this, ConfigActivity.class);
            intent.setAction(Intent.ACTION_VIEW); // opcional
            startActivity(intent);
            return true;
        }

        if (idItem == R.id.acao_sincronizar){
            Toast.makeText(getApplicationContext(), "Sincronizar selecionada", Toast.LENGTH_LONG).show();










            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

package com.example.checkar;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.Menu;
import android.view.MenuItem;

import android.view.View;
import android.widget.Toast;

import java.util.ArrayList;

import AdapterList.VeiculoAdapter;
import AdapterList.VistoriaAdapter;
import dao.VeiculoDAO;
import dao.VistoriaDAO;
import model.Configuracao;
import model.DownloadDados;
import model.ItemVistoria;
import model.Veiculo;
import model.Vistoria;

public class MenuActivity extends AppCompatActivity implements VistoriaAdapter.OnVistoriaListner {
    private static RecyclerView rv = null;
    private static VistoriaAdapter vistoriaAdapter = null;
    private static ArrayList<Vistoria> vistorias = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
        setTitle("Vistorias");
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        rv = (RecyclerView) findViewById(R.id.rv_vistorias);
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setHasFixedSize(true);
        vistorias = new VistoriaDAO().selectAll(this);
        vistoriaAdapter = new VistoriaAdapter(vistorias, this);

        LinearLayoutManager llm = new LinearLayoutManager(this);
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        rv.setLayoutManager(llm);

        FloatingActionButton btNovaVistoria = (FloatingActionButton) findViewById(R.id.bt_nova_vistoria);
        btNovaVistoria.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(Configuracao.configGerais.lerConfig(getString(R.string.config_veiculo)).equals("")){
                    AlertarConfgVeiculo();
                } else {
                    int idVeiculo = Integer.parseInt(Configuracao.configGerais.lerConfig(getString(R.string.config_veiculo)));

                    VeiculoDAO veiculoDAO = new VeiculoDAO();
                    Veiculo veiculo = veiculoDAO.selectId(idVeiculo, getApplicationContext());
                    ArrayList<ItemVistoria> itensVistoria = veiculoDAO.selectItensVeiculo(idVeiculo, getApplicationContext());
                    VistoriaActivity.vistoria = new Vistoria(veiculo, itensVistoria);

                    Intent intent = new Intent(MenuActivity.this, VistoriaActivity.class);
                    intent.setAction(Intent.ACTION_VIEW); // opcional
                    startActivity(intent);
                }
            }
        });

        listarVistoriasRealizadas(this);
    }

    public static void listarVistoriasRealizadas(Context context){
        vistorias = new VistoriaDAO().selectAll(context);
        vistoriaAdapter.setVistorias(vistorias);
        rv.setAdapter(vistoriaAdapter);
        rv.refreshDrawableState();
        vistoriaAdapter.notifyDataSetChanged();
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
            new DownloadDados(this).execute();
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    public void AlertarConfgVeiculo(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Atenção!");
        builder.setMessage("Nenhum veículo selecionado.");        // add a button
        builder.setPositiveButton("OK", null);        // create and show the alert dialog
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @Override
    public void onVistoriaClick(int position) {
        VistoriaActivity.vistoria = this.vistorias.get(position);
        Intent intent = new Intent(MenuActivity.this, VistoriaActivity.class);
        intent.setAction(Intent.ACTION_VIEW); // opcional
        startActivity(intent);
    }
}

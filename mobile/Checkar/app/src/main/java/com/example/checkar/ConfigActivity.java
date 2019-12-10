package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.AndroidException;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

import AdapterList.VeiculoAdapter;
import dao.VeiculoDAO;
import model.Configuracao;
import model.Veiculo;

public class ConfigActivity extends AppCompatActivity implements VeiculoAdapter.OnVeiculoListner{
    Spinner spVeiculos = null;
    List<Veiculo> veiculos = null;
    RecyclerView recyclerView;
    VeiculoAdapter veiculoAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config);
        setTitle("Configurações");

        this.veiculos = new VeiculoDAO().selectAll(this);

        recyclerView = (RecyclerView)findViewById(R.id.rv_veiculos);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setHasFixedSize(true);

        LinearLayoutManager llm = new LinearLayoutManager(this);
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(llm);

        veiculoAdapter = new VeiculoAdapter(this.veiculos, this);
        recyclerView.setAdapter(veiculoAdapter);
        recyclerView.refreshDrawableState();
    }

    @Override
    public void onVeiculoClick(int position) {
        Veiculo veiculo = this.veiculos.get(position);
        Configuracao.configGerais.salvarConfig(getString(R.string.config_veiculo), veiculo.getId() + "");
        Toast.makeText(getApplicationContext(), "Veículo placa: " + veiculo.getPlaca() + " selecionado!", Toast.LENGTH_LONG).show();
        recyclerView.refreshDrawableState();
        veiculoAdapter.notifyDataSetChanged();
    }
}

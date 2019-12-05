package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.AndroidException;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

import AdapterList.VeiculoAdapter;
import dao.VeiculoDAO;
import model.Veiculo;

public class ConfigActivity extends AppCompatActivity {
    Spinner spVeiculos = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config);

        List<String> veiculos = new VeiculoDAO().selectAllString(this);
        ArrayAdapter adapter = new ArrayAdapter(this, android.R.layout.simple_spinner_item, veiculos);

        spVeiculos = (Spinner) findViewById(R.id.sp_veiculos);
        spVeiculos.setAdapter(adapter);

        RecyclerView rv = (RecyclerView)findViewById(R.id.rv_veiculos);
        /*rv.setOnScrollChangeListener(new View.OnScrollChangeListener() {
            @Override
            public void onScrollChange(View v, int scrollX, int scrollY, int oldScrollX, int oldScrollY) {

            }
        });*/
        rv.setLayoutManager(new LinearLayoutManager(this));
        rv.setHasFixedSize(true);

        LinearLayoutManager llm = new LinearLayoutManager(this);
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        rv.setLayoutManager(llm);


        VeiculoAdapter veiculoAdapter = new VeiculoAdapter(new VeiculoDAO().selectAll(this));
        rv.setAdapter(veiculoAdapter);
    }
}

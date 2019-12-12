package com.example.checkar;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.viewpager.widget.ViewPager;

import android.view.View;
import android.widget.EditText;

import java.util.ArrayList;

import AdapterList.ItemAdapter;
import AdapterList.ItemAdapter.OnItemVistoriaListner;
import dao.VeiculoDAO;
import fragmentVistoria.MyFragmentPagerAdapter;
import model.Configuracao;
import model.ItemVistoria;
import model.Veiculo;
import model.Vistoria;

public class VistoriaActivity extends AppCompatActivity  {
    private TabLayout tabLayout;
    private ViewPager viewPager;
    public static Vistoria vistoria;

    @Override
    protected void onCreate(Bundle savedInstanceState)  {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vistoria_carro);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("Vistoria");

        tabLayout = (TabLayout) findViewById(R.id.tab_layout);
        viewPager = (ViewPager) findViewById(R.id.view_pager);

        viewPager.setAdapter(new MyFragmentPagerAdapter(getSupportFragmentManager(), 0, getResources().getStringArray(R.array.titles_tab)));
        tabLayout.setupWithViewPager(viewPager);
    }

}

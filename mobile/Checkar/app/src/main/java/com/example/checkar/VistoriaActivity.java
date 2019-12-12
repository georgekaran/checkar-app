package com.example.checkar;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.tabs.TabLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
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

public class VistoriaActivity extends AppCompatActivity implements LocationListener {
    private TabLayout tabLayout;
    private ViewPager viewPager;
    public static Vistoria vistoria;
    public static Boolean salvarLocal;

    @Override
    protected void onCreate(Bundle savedInstanceState)  {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vistoria_carro);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        setTitle("Vistoria");

        tabLayout = (TabLayout) findViewById(R.id.tab_layout);
        viewPager = (ViewPager) findViewById(R.id.view_pager);

        LocationManager mlocManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
            return;
        }
        mlocManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, this);

        viewPager.setAdapter(new MyFragmentPagerAdapter(getSupportFragmentManager(), 0, getResources().getStringArray(R.array.titles_tab)));
        tabLayout.setupWithViewPager(viewPager);
    }

    @Override
    public void onLocationChanged(Location location) {
        if (salvarLocal){
            VistoriaActivity.vistoria.setLatitude(location.getLatitude() + "");
            VistoriaActivity.vistoria.setLongitude(location.getLongitude() + "");
            salvarLocal = false;
        }
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }
}

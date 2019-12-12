package model;

import android.app.Application;
import android.content.Context;

import com.example.checkar.MySuperAppApplication;
import com.example.checkar.R;

import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;

import dao.VeiculoDAO;

public class Vistoria {
    private int id;
    private Veiculo veiculo;
    private Usuario usuario;
    private String data;
    private String hora;
    private int km;
    private String sincronizado;
    private String observacao;
    private String latitude;
    private String longitude;
    private ArrayList<ItemVistoria> itensVistoria;

    public Veiculo getVeiculo() {
        return veiculo;
    }

    public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    public String getData() {
        return data;
    }

    public String getSincronizado() {
        return sincronizado;
    }

    public void setSincronizado(String sincronizado) {
        this.sincronizado = sincronizado;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public int getKm() {
        return km;
    }

    public void setKm(int km) {
        this.km = km;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Vistoria() {

    }

    public Vistoria(Veiculo veiculo, ArrayList<ItemVistoria> itensVistoria) {
        this.id = 0;
        this.data = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.hora = new SimpleDateFormat("HH:mm").format(new Date());
        this.km = 0;
        this.veiculo = veiculo;
        this.itensVistoria = itensVistoria;
    }

    public ArrayList<ItemVistoria> getItensVistoria() {
        return itensVistoria;
    }

    public void setItensVistoria(ArrayList<ItemVistoria> itensVistoria) {
        this.itensVistoria = itensVistoria;
    }

    public int qtdItensAprovados(){
        int qtd = 0;
        for (int i=0; i<this.itensVistoria.size(); i++){
            if (this.itensVistoria.get(i).getSituacao().equals("S")){
                qtd++;
            }
        }

        return qtd;
    }

    public int qtdItensReprovados(){
        int qtd = 0;
        for (int i=0; i<this.itensVistoria.size(); i++){
            if (this.itensVistoria.get(i).getSituacao().equals("C")){
                qtd++;
            }
        }

        return qtd;
    }

    public boolean permiteSalvar(){
        boolean salvar = true;
        for (int i=0; i<this.itensVistoria.size(); i++){
            if (this.itensVistoria.get(i).getSituacao().equals("")){
                salvar = false;
            }
        }

        return salvar;
    }
}

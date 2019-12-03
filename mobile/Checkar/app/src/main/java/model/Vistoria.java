package model;

import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    public Vistoria() {
        this.data = new SimpleDateFormat("dd/MM/yyyy").format(new Date());
        this.hora = new SimpleDateFormat("HH:mm").format(new Date());
        this.km = 0;

        this.veiculo = new Veiculo();
    }
}

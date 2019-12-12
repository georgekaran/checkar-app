package model;

public class ItemVistoria {
    private int id;
    private int id_item_veiculo;
    private Item item;
    private String situacao;
    private String observacao;
    private String foto;

    public int getId() {
        return id;
    }

    public int getId_item_veiculo() {
        return id_item_veiculo;
    }

    public void setId_item_veiculo(int id_item_veiculo) {
        this.id_item_veiculo = id_item_veiculo;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getSituacao() {
        return situacao;
    }

    public void setSituacao(String situacao) {
        this.situacao = situacao;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }
}

package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.Item;
import model.ItemVistoria;
import model.Usuario;
import model.Veiculo;

public class VeiculoDAO implements IDAO_T<Veiculo> {
    private String tabela = "veiculo";
    private String tabela_itens = "veiculo_item";

    @Override
    public String save(Veiculo o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("tipo_veiculo_id", o.getIdTipo());
        values.put("placa", o.getPlaca());
        values.put("modelo", o.getModelo());
        values.put("marca", o.getMarca());
        values.put("ano", o.getAno());
        values.put("chassi", o.getChassi());
        values.put("renavam", o.getRenavam());
        values.put("empresa_id", o.getIdEmpresa());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(Veiculo o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }

    @Override
    public ArrayList<Veiculo> selectAll(Context context) {
        ArrayList<Veiculo> veiculos = new ArrayList();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        /*ContentValues values = new ContentValues();
        values.put("id", 1);
        values.put("tipo_veiculo_id", 1);
        values.put("placa", "BRA3R52");
        values.put("modelo", "Auto bomba tanque");
        values.put("marca", "Mitren");
        values.put("ano", 2016);
        values.put("chassi", "LJCPCBLCX11000237");
        values.put("renavam", "144003058");
        values.put("empresa_id", 1);
        long newRowId = db.insert(this.tabela,null, values);*/

        cur = db.query(this.tabela, new String[]{"id", "tipo_veiculo_id", "placa", "modelo", "marca", "ano", "chassi", "renavam", "empresa_id"}, null, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                do {
                    Veiculo veiculo = new Veiculo();
                    veiculo.setId(cur.getInt(0));
                    veiculo.setIdTipo(cur.getInt(1));
                    veiculo.setPlaca(cur.getString(2));
                    veiculo.setModelo(cur.getString(3));
                    veiculo.setMarca(cur.getString(4));
                    veiculo.setAno(cur.getInt(5));
                    veiculo.setChassi(cur.getString(6));
                    veiculo.setRenavam(cur.getString(7));
                    //veiculo.setIdEmpresa(cur.getInt(9));

                    veiculos.add(veiculo);
                } while (cur.moveToNext());
            }
        }

        return veiculos;
    }

    @Override
    public ArrayList select(String criterio, Context context) {
        return null;
    }

    @Override
    public Veiculo selectId(int id, Context context) {
        Veiculo veiculo = new Veiculo();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id", "tipo_veiculo_id", "placa", "modelo", "marca", "ano", "chassi", "renavam", "empresa_id"}, "id = " + id, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                    veiculo.setId(cur.getInt(0));
                    veiculo.setIdTipo(cur.getInt(1));
                    veiculo.setPlaca(cur.getString(2));
                    veiculo.setModelo(cur.getString(3));
                    veiculo.setMarca(cur.getString(4));
                    veiculo.setAno(cur.getInt(5));
                    veiculo.setChassi(cur.getString(6));
                    veiculo.setRenavam(cur.getString(7));
                    //veiculo.setIdEmpresa(cur.getInt(9));
            }
        }

        return veiculo;
    }

    public ArrayList<ItemVistoria> selectItensVeiculo(int id, Context context){
        ArrayList<ItemVistoria> itens = new ArrayList<ItemVistoria>();

        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        cur = db.query(this.tabela_itens, new String[]{"id_item"}, "id_veiculo = " + id, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                do {
                    ItemVistoria item = new ItemVistoria();
                    item.setItem(new ItemDAO().selectId(cur.getInt(0), context));
                    item.setSituacao("");
                    item.setObservacao("");
                    itens.add(item);
                } while (cur.moveToNext());
            }
        }

        return itens;
    }

    public String saveItemVeiculo(int id, int idItem, int idVeiculo, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", id);
        values.put("id_item", idItem);
        values.put("id_veiculo", idVeiculo);
        long Id = db.insert(this.tabela_itens,null, values);
        return Id + "";
    }
}

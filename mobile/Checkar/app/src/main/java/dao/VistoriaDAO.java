package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.ItemVistoria;
import model.Usuario;
import model.Vistoria;

public class VistoriaDAO implements IDAO_T<Vistoria> {
    private String tabela = "vistoria";
    private String tabela_itens = "item_vistoria";

    @Override
    public String save(Vistoria o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        // values.put("id", o.getId());
        values.put("id_usuario", 1);
        values.put("id_veiculo", o.getVeiculo().getId());
        values.put("data", o.getData());
        values.put("hora", o.getHora());
        values.put("km", o.getKm());
        values.put("sincronizado", "F");
        values.put("observacao", o.getObservacao());
        values.put("latitude", o.getLatitude());
        values.put("longitude", o.getLongitude());
        long Id = db.insert(this.tabela,null, values);

        for (int i=0; i<o.getItensVistoria().size(); i++) {
            ContentValues valuesItens = new ContentValues();
            // valuesItens.put("id", o.getItensVistoria().get(i).getId());
            valuesItens.put("id_vistoria", Id);
            valuesItens.put("id_veiculo_item", o.getItensVistoria().get(i).getId());
            valuesItens.put("situacao", o.getItensVistoria().get(i).getSituacao());
            valuesItens.put("observacao", o.getItensVistoria().get(i).getObservacao());
            valuesItens.put("foto", o.getItensVistoria().get(i).getFoto());
            db.insert(this.tabela_itens, null, valuesItens);
        }

        return Id + "";
    }

    @Override
    public String update(Vistoria o, Context context) {
        this.delete(o.getId(), context);
        this.save(o, context);
        return null;
    }

    public String updateSincronizado(int id, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        ContentValues values = new ContentValues();
        values.put("sincronizado", "T");

        db.update(this.tabela, values, "id = " + id, null);
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela_itens, "id = " + id, null);
        db.delete(this.tabela, "id = " + id, null);
        return null;
    }


    @Override
    public ArrayList<Vistoria> selectAll(Context context) {
        ArrayList<Vistoria> vistorias = new ArrayList();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id", "id_usuario", "id_veiculo", "data", "hora", "km", "sincronizado", "observacao", "latitude", "longitude"}, null, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                do {
                    Vistoria vistoria = new Vistoria();
                    vistoria.setId(cur.getInt(0));
                    vistoria.setUsuario(new UserDAO().selectId(cur.getInt(1), context));
                    vistoria.setVeiculo(new VeiculoDAO().selectId(cur.getInt(2), context));
                    vistoria.setData(cur.getString(3));
                    vistoria.setHora(cur.getString(4));
                    vistoria.setKm(cur.getInt(5));
                    vistoria.setSincronizado(cur.getString(6));
                    vistoria.setObservacao(cur.getString(7));
                    vistoria.setLatitude(cur.getString(8));
                    vistoria.setLongitude(cur.getString(9));

                    vistoria.setItensVistoria(this.selectAllItemVistoria(cur.getInt(0), context));
                    vistorias.add(vistoria);
                } while (cur.moveToNext());
            }
        }

        return vistorias;
    }

    public ArrayList<Vistoria> selectEnvio(Context context) {
        ArrayList<Vistoria> vistorias = new ArrayList();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id", "id_usuario", "id_veiculo", "data", "hora", "km", "sincronizado", "observacao", "latitude", "longitude"}, "sincronizado <> 'T'", null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                do {
                    Vistoria vistoria = new Vistoria();
                    vistoria.setId(cur.getInt(0));
                    vistoria.setUsuario(new UserDAO().selectId(cur.getInt(1), context));
                    vistoria.setVeiculo(new VeiculoDAO().selectId(cur.getInt(2), context));
                    vistoria.setData(cur.getString(3));
                    vistoria.setHora(cur.getString(4));
                    vistoria.setKm(cur.getInt(5));
                    vistoria.setSincronizado(cur.getString(6));
                    vistoria.setObservacao(cur.getString(7));
                    vistoria.setLatitude(cur.getString(8));
                    vistoria.setLongitude(cur.getString(9));

                    vistoria.setItensVistoria(this.selectAllItemVistoria(cur.getInt(0), context));
                    vistorias.add(vistoria);
                } while (cur.moveToNext());
            }
        }

        return vistorias;
    }

    @Override
    public ArrayList<Vistoria> select(String criterio, Context context) {
        return null;
    }

    @Override
    public Vistoria selectId(int id, Context context) {
        return null;
    }

    public ArrayList<ItemVistoria> selectAllItemVistoria(int idVist, Context context){
        ArrayList<ItemVistoria> itens = new ArrayList();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela_itens, new String[]{"id", "situacao", "observacao", "foto", "id_veiculo_item"}, "id_vistoria = " + idVist, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                do {
                    ItemVistoria item = new ItemVistoria();
                    item.setId(cur.getInt(0));
                    item.setSituacao(cur.getString(1));
                    item.setObservacao(cur.getString(2));
                    item.setFoto(cur.getString(3));
                    item.setId_item_veiculo(cur.getInt(4));

                    Cursor curItem = db.query("veiculo_item", new String[]{"id_item"}, "id = " + cur.getInt(4), null, null, null, null);;

                    if (curItem != null) {
                        if (curItem.moveToFirst()) {
                            item.setItem(new ItemDAO().selectId(curItem.getInt(0), context));
                        }
                    }
                    itens.add(item);
                } while (cur.moveToNext());
            }
        }

        return itens;
    }

}

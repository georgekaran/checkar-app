package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.Item;

public class ItemDAO implements IDAO_T<Item> {
    private String tabela = "item";

    @Override
    public String save(Item o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("nome", o.getNome());
        values.put("id_tipo_item", o.getIdTipo());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(Item o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    @Override
    public ArrayList<Item> selectAll(Context context) {
        return null;
    }

    @Override
    public ArrayList<Item> select(String criterio, Context context) {
        return null;
    }

    @Override
    public Item selectId(int id, Context context) {
        return null;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }
}

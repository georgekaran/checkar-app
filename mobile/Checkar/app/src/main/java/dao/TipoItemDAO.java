package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.TipoItem;

public class TipoItemDAO implements IDAO_T<TipoItem> {
    private String tabela = "tipo_item";

    @Override
    public String save(TipoItem o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("tipo_item", o.getTipo_item());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(TipoItem o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    @Override
    public ArrayList<TipoItem> selectAll(Context context) {
        return null;
    }

    @Override
    public ArrayList<TipoItem> select(String criterio, Context context) {
        return null;
    }

    @Override
    public TipoItem selectId(int id, Context context) {
        TipoItem tipo = new TipoItem();
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id", "tipo_item"}, "id = " + id, null, null, null, null);

        if (cur != null) {
            if (cur.moveToFirst()) {
                tipo.setId(cur.getInt(0));
                tipo.setTipo_item(cur.getString(1));
            }
        }

        return tipo;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }
}

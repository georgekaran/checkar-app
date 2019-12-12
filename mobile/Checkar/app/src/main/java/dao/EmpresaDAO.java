package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.Empresa;

public class EmpresaDAO implements IDAO_T<Empresa> {
    private String tabela = "empresa";

    @Override
    public String save(Empresa o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("nome", o.getNome());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(Empresa o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    @Override
    public ArrayList<Empresa> selectAll(Context context) {
        return null;
    }

    @Override
    public ArrayList<Empresa> select(String criterio, Context context) {
        return null;
    }

    @Override
    public Empresa selectId(int id, Context context) {
        return null;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }
}

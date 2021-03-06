package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.TipoVeiculo;

public class TipoVeiculoDAO implements IDAO_T<TipoVeiculo> {
    private String tabela = "tipo_veiculo";

    @Override
    public String save(TipoVeiculo o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("tipo_veiculo", o.getTipoVeiculo());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(TipoVeiculo o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    @Override
    public ArrayList<TipoVeiculo> selectAll(Context context) {
        return null;
    }

    @Override
    public ArrayList<TipoVeiculo> select(String criterio, Context context) {
        return null;
    }

    @Override
    public TipoVeiculo selectId(int id, Context context) {
        return null;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }
}

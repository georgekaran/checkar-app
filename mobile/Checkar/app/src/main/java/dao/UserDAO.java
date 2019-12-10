package dao;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.Usuario;

public class UserDAO implements IDAO_T<Usuario> {
    private String tabela = "usuario";


    public Usuario login(Context context, String email, String password){
        Usuario user = null;
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id", "nome", "email"}, "email = '" + email + "' and senha = '" + password + "'", null, null, null, null);

        if(cur!=null){
            if (cur.moveToFirst()) {
                user = new Usuario();
                user.setId(cur.getInt(1));
                user.setNome(cur.getString(2));
                user.setEmail(cur.getString(3));
            }
        }

        return user;
    }

    @Override
    public String save(Usuario o, Context context) {
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        ContentValues values = new ContentValues();
        values.put("id", o.getId());
        values.put("empresa_id", o.getId());
        values.put("tipo_usuario_id", o.getIdTipoUsuario());
        values.put("nome", o.getNome());
        values.put("senha", o.getSenha());
        values.put("email", o.getEmail());
        long Id = db.insert(this.tabela,null, values);
        return Id + "";
    }

    @Override
    public String update(Usuario o, Context context) {
        return null;
    }

    @Override
    public String delete(int id, Context context) {
        return null;
    }

    @Override
    public ArrayList<Usuario> selectAll(Context context) {
        return null;
    }

    @Override
    public ArrayList<Usuario> select(String criterio, Context context) {
        return null;
    }

    @Override
    public Usuario selectId(int id, Context context) {
        return null;
    }

    public String deleteAll(Context context){
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();
        db.delete(this.tabela, null, null);
        return null;
    }
}

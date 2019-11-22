package dao;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.util.ArrayList;

import db.DatabaseConnection;
import model.Usuario;

public class UserDAO implements IDAO_T<Usuario> {
    private String tabela = "Usuario";

    @Override
    public String save(Usuario o) {
        return null;
    }

    @Override
    public String update(Usuario o) {
        return null;
    }

    @Override
    public String delete(int id) {
        return null;
    }

    @Override
    public ArrayList<Usuario> selectAll() {
        return null;
    }

    @Override
    public ArrayList<Usuario> select(String criterio) {
        return null;
    }

    @Override
    public Usuario selectId(int id) {
        return null;
    }

    public Usuario login(Context context, String email, String password){
        Usuario user = null;
        Cursor cur = null;
        SQLiteDatabase db = DatabaseConnection.getInstance(context).getConnection();

        cur = db.query(this.tabela, new String[]{"id_usuario", "nome", "email"}, "email = '" + email + "' and senha = '" + password + "'", null, null, null, null);

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
}

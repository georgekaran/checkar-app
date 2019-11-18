package db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

public class DatabaseConnection {
    private static DatabaseConnection instance = null;
    private SQLiteDatabase connection = null;

    private DatabaseConnection(Context context) {
        this.connection = new DatabaseManager(context).getWritableDatabase();
    }

    // Retorna instância
    public static DatabaseConnection getInstance(Context context) {
        if (instance == null) {
            instance = new DatabaseConnection(context);
        }
        return instance;
    }

    // Retorna conexão
    public SQLiteDatabase getConnection() {
        if (connection == null) {
            throw new RuntimeException("conexao==null");
        }
        return connection;
    }
}

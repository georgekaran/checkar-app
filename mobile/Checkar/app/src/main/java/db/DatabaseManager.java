package db;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class DatabaseManager extends SQLiteOpenHelper {
    private static final String databaseName = "checkar";
    private static final int version = 1;

    public DatabaseManager(Context context) {
        super(context, databaseName, null, version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL("CREATE TABLE IF NOT EXISTS Usuario (" +
                "  id_usuario INT NOT NULL," +
                "  nome VARCHAR(200) NOT NULL," +
                "  usuario VARCHAR(20) NOT NULL," +
                "  senha VARCHAR(45) NOT NULL," +
                "  email VARCHAR(100) NOT NULL," +
                "  PRIMARY KEY (id_usuario));");

    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}

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
        // Tabela de empresa
        db.execSQL("CREATE TABLE IF NOT EXISTS empresa (" +
                   "  id INTEGER PRIMARY KEY AUTOINCREMENT," +
                   "  nome VARCHAR(100) NOT NULL UNIQUE);");

        // Tabela de tipo de usuário
        db.execSQL("CREATE TABLE IF NOT EXISTS tipo_usuario (" +
                "  id INTEGER PRIMARY KEY," +
                "  tipo_usuario VARCHAR(100) NOT NULL," +
                "  nivel_permissao CHAR(1) NOT NULL);");

        // Tabela de usuário
        db.execSQL("CREATE TABLE IF NOT EXISTS usuario (" +
                "  id INTEGER PRIMARY KEY," +
                "  empresa_id INTEGER NOT NULL CONSTRAINT fk_usuario_empresa REFERENCES empresa(id)," +
                "  tipo_usuario_id INTEGER NOT NULL CONSTRAINT fk_usuario_tipo_u REFERENCES tipo_usuario (id)," +
                "  nome VARCHAR(200) NOT NULL," +
                "  senha TEXT NOT NULL," +
                "  email VARCHAR(100) NOT NULL UNIQUE);");

        // Tabela de tipo de veiculo
        db.execSQL("CREATE TABLE IF NOT EXISTS tipo_veiculo (" +
                    "  id INTEGER PRIMARY KEY," +
                    "  tipo_veiculo VARCHAR(150) NOT NULL UNIQUE);");

        // Tabela de veiculo
        db.execSQL("CREATE TABLE IF NOT EXISTS veiculo (" +
                "  id INTEGER PRIMARY KEY," +
                "  tipo_veiculo_id INTEGER NOT NULL CONSTRAINT fk_veiculo_tipo_veiculo REFERENCES tipo_veiculo (id)," +
                "  placa VARCHAR(8) NOT NULL UNIQUE," +
                "  modelo VARCHAR(50) NOT NULL," +
                "  marca VARCHAR(50) NOT NULL," +
                "  ano BIGINTEGER NOT NULL," +
                "  chassi TEXT," +
                "  renavam TEXT," +
                "  empresa_id INTEGER NOT NULL CONSTRAINT fk_veiculo_empresa REFERENCES empresa (id));");

        // Tabela de tipo de item
        db.execSQL("CREATE TABLE IF NOT EXISTS tipo_item (" +
                   "  id INTEGER PRIMARY KEY," +
                   "  tipo_item VARCHAR(100) NOT NULL);");

        // Tabela de item
        db.execSQL("CREATE TABLE IF NOT EXISTS item (" +
                   "  id INTEGER PRIMARY KEY," +
                   "  id_tipo_item INTEGER NOT NULL CONSTRAINT fk_item_tipo_item REFERENCES tipo_item (id)," +
                   "  nome VARCHAR(200) NOT NULL);");

        // Tabela de itens do veiculo
        db.execSQL("CREATE TABLE IF NOT EXISTS veiculo_item (" +
                   "  id INTEGER PRIMARY KEY," +
                   "  id_item INTEGER NOT NULL CONSTRAINT fk_veiculo_Item_Item REFERENCES item (id)," +
                   "  id_veiculo INTEGER NOT NULL CONSTRAINT fk_veiculo_Item_veiculo REFERENCES veiculo (id_veiculo)," +
                   "  ordem INTEGER);");

        // Tabela de vistoria
        db.execSQL("CREATE TABLE IF NOT EXISTS vistoria (" +
                "  id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "  id_usuario INTEGER NOT NULL CONSTRAINT fk_vistoria_Usuario REFERENCES usuario (id)," +
                "  id_veiculo INTEGER NOT NULL CONSTRAINT fk_Vistoria_Veiculo REFERENCES veiculo (id_veiculo)," +
                "  data DATE NOT NULL," +
                "  hora TIME NOT NULL," +
                "  km BIGINTEGER NOT NULL," +
                "  sincronizado CHAR(1)," +
                "  observacao TEXT," +
                "  latitude TEXT," +
                "longitude TEXT );");

        // Tabela de itens da vistoria
        db.execSQL("CREATE TABLE IF NOT EXISTS item_vistoria (" +
                "  id INTEGER PRIMARY KEY AUTOINCREMENT," +
                "  id_vistoria INTEGER NOT NULL CONSTRAINT fk_item_vistoria_vistoria REFERENCES vistoria (id)," +
                "  id_veiculo_item INTEGER NOT NULL CONSTRAINT fk_Item_Vistoria_Veiculo_Item REFERENCES veiculo_item (id)," +
                "  situacao CHAR(1) NOT NULL," +
                "  observacao TEXT," +
                "  foto TEXT );");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }
}

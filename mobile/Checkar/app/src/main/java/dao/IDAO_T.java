package dao;

import android.content.Context;

import java.util.ArrayList;

public interface IDAO_T <T> {
    public String save(T o, Context context);

    public String update(T o, Context context);

    public String delete(int id, Context context);

    public ArrayList<T> selectAll(Context context);

    public ArrayList<T> select(String criterio, Context context);

    public T selectId(int id, Context context);
}

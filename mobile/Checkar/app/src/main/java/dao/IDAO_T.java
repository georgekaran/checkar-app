package dao;

import java.util.ArrayList;

public interface IDAO_T <T> {
    public String save(T o);

    public String update(T o);

    public String delete(int id);

    public ArrayList<T> selectAll();

    public ArrayList<T> select(String criterio);

    public T selectId(int id);
}

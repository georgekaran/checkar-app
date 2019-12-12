package fragmentVistoria;

import android.app.Application;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.checkar.ItemVistoriaActivity;
import com.example.checkar.R;
import com.example.checkar.VistoriaActivity;

import java.util.List;

import AdapterList.ItemAdapter;
import model.ItemVistoria;

public class FragmentItens extends Fragment implements ItemAdapter.OnItemVistoriaListner {
    List<ItemVistoria> itens = null;
    RecyclerView recyclerView;
    ItemAdapter itemAdapter;
    View view;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_itens, container, false);

        this.itens = VistoriaActivity.vistoria.getItensVistoria();

        recyclerView = (RecyclerView) view.findViewById(R.id.rv_itens_vistoria);
        recyclerView.setLayoutManager(new LinearLayoutManager(view.getContext()));
        recyclerView.setHasFixedSize(true);

        LinearLayoutManager llm = new LinearLayoutManager(view.getContext());
        llm.setOrientation(LinearLayoutManager.VERTICAL);
        recyclerView.setLayoutManager(llm);

        itemAdapter = new ItemAdapter(this.itens, this);
        recyclerView.setAdapter(itemAdapter);
        recyclerView.refreshDrawableState();

        return view;
    }

    @Override
    public void onItemVistoriaClick(int position) {
        ItemVistoriaActivity.item = VistoriaActivity.vistoria.getItensVistoria().get(position);
        Intent it = new Intent(view.getContext(), ItemVistoriaActivity.class);
        startActivity(it);
    }
}

package AdapterList;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.checkar.R;

import java.util.List;

import model.Vistoria;

public class VistoriaAdapter extends RecyclerView.Adapter<VistoriaAdapter.VistoriaViewHolder> {
    List<Vistoria> vistorias;

    public VistoriaAdapter(List<Vistoria> vistorias) {
        this.vistorias = vistorias;
    }

    @NonNull
    @Override
    public VistoriaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_vistoria, parent, false);
        VistoriaAdapter.VistoriaViewHolder pvh = new VistoriaAdapter.VistoriaViewHolder(v);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull VistoriaViewHolder holder, int position) {
        holder.dataView.setText(vistorias.get(position).getData());
        holder.situacaoView.setText("Aprovado");
        holder.horaView.setText(vistorias.get(position).getHora());
    }

    @Override
    public int getItemCount() {
        return vistorias.size();
    }

    public static class VistoriaViewHolder extends RecyclerView.ViewHolder {
        TextView dataView;
        TextView situacaoView;
        TextView horaView;
        ImageView fotoView;

        VistoriaViewHolder(View itemView) {
            super(itemView);
            dataView = (TextView)itemView.findViewById(R.id.tv_data_vistoria);
            situacaoView = (TextView)itemView.findViewById(R.id.tv_situacao_vistoria);
            horaView = (TextView)itemView.findViewById(R.id.tv_hora_vistoria);
            fotoView = (ImageView)itemView.findViewById(R.id.iv_img_vistoria);
        }
    }
}

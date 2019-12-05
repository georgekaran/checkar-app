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

import model.Veiculo;

public class VeiculoAdapter extends RecyclerView.Adapter<VeiculoAdapter.VeiculoViewHolder> {
    List<Veiculo> veiculos;

    public VeiculoAdapter(List<Veiculo> veiculos){
        this.veiculos = veiculos;
    }

    @NonNull
    @Override
    public VeiculoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_veiculo, parent, false);
        VeiculoViewHolder pvh = new VeiculoViewHolder(v);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull VeiculoViewHolder holder, int position) {
        holder.nomeView.setText(veiculos.get(position).getPlaca());
        holder.idadeView.setText(veiculos.get(position).getMarca() + "/" +  veiculos.get(position).getModelo());
        ///holder.fotoView.setImageResource(R.drawable.logo);
       // holder.fotoView.setMaxWidth(50);
        //holder.fotoView.setMaxHeight(50);
    }

    @Override
    public int getItemCount() {
        return veiculos.size();
    }

    public static class VeiculoViewHolder extends RecyclerView.ViewHolder {
        TextView nomeView;
        TextView idadeView;
        ImageView fotoView;

        VeiculoViewHolder(View itemView) {
            super(itemView);
            nomeView = (TextView)itemView.findViewById(R.id.tv_placa_item);
            idadeView = (TextView)itemView.findViewById(R.id.tv_marca_modelo_item);
            fotoView = (ImageView)itemView.findViewById(R.id.iv_foto_item);
        }
    }
}

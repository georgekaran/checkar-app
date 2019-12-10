package AdapterList;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.checkar.R;

import java.util.List;

import model.Configuracao;
import model.Veiculo;

public class VeiculoAdapter extends RecyclerView.Adapter<VeiculoAdapter.VeiculoViewHolder> {
    private List<Veiculo> veiculos;
    private OnVeiculoListner mOnVeiculoListner;

    public VeiculoAdapter(List<Veiculo> veiculos, OnVeiculoListner onVeiculoListner){
        this.veiculos = veiculos;
        this.mOnVeiculoListner = onVeiculoListner;
    }

    @NonNull
    @Override
    public VeiculoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_veiculo, parent, false);
        VeiculoViewHolder pvh = new VeiculoViewHolder(v, this.mOnVeiculoListner);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull VeiculoViewHolder holder, int position) {
        holder.nomeView.setText(veiculos.get(position).getPlaca());
        holder.idadeView.setText(veiculos.get(position).getMarca() + "/" +  veiculos.get(position).getModelo());

        if( Configuracao.configGerais.lerConfig("Veiculo").equals(veiculos.get(position).getId() +"")){
            holder.checkView.setChecked(true);
        } else {
            holder.checkView.setChecked(false);
        }
    }

    @Override
    public int getItemCount() {
        return veiculos.size();
    }

    public static class VeiculoViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{
        TextView nomeView;
        TextView idadeView;
        CheckBox checkView;
        OnVeiculoListner onVeiculoListner;

        VeiculoViewHolder(View itemView, OnVeiculoListner onVeiculoListner) {
            super(itemView);
            nomeView = (TextView)itemView.findViewById(R.id.tv_placa_item);
            idadeView = (TextView)itemView.findViewById(R.id.tv_marca_modelo_item);
            checkView = (CheckBox)itemView.findViewById(R.id.cb_veiculo_item);
            this.onVeiculoListner = onVeiculoListner;

            itemView.setOnClickListener(this);
        }


        @Override
        public void onClick(View v) {
            onVeiculoListner.onVeiculoClick(getAdapterPosition());
        }
    }

    public interface OnVeiculoListner{
        void onVeiculoClick(int position);
    }
}

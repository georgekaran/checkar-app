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
    private OnVistoriaListner mOnVistoriaListner;

    public VistoriaAdapter(List<Vistoria> vistorias, OnVistoriaListner onVistoriaListner) {
        this.vistorias = vistorias;
        this.mOnVistoriaListner = onVistoriaListner;
    }

    public void setVistorias(List<Vistoria> vistorias) {
        this.vistorias = vistorias;
    }

    @NonNull
    @Override
    public VistoriaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_vistoria, parent, false);
        VistoriaAdapter.VistoriaViewHolder pvh = new VistoriaAdapter.VistoriaViewHolder(v, this.mOnVistoriaListner);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull VistoriaViewHolder holder, int position) {
        holder.dataView.setText(vistorias.get(position).getData());

        holder.horaView.setText(vistorias.get(position).getHora());

        if(this.vistorias.get(position).qtdItensReprovados() <= 0){
            holder.situacaoView.setText("Aprovado");
            holder.fotoView.setImageResource(R.drawable.ok);
        } else if(this.vistorias.get(position).qtdItensReprovados() > 0) {
            holder.situacaoView.setText("Reprovado");
            holder.fotoView.setImageResource(R.drawable.alerta);
        } else {
            holder.situacaoView.setText("-");
            holder.fotoView.setImageResource(R.drawable.vazio);
        }
    }

    @Override
    public int getItemCount() {
        return vistorias.size();
    }

    public static class VistoriaViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{
        TextView dataView;
        TextView situacaoView;
        TextView horaView;
        ImageView fotoView;
        OnVistoriaListner onVistListner;

        VistoriaViewHolder(View itemView, OnVistoriaListner onVistoriaListner) {
            super(itemView);
            dataView = (TextView)itemView.findViewById(R.id.tv_data_vist_item);
            situacaoView = (TextView)itemView.findViewById(R.id.tv_situacao_vist_item);
            horaView = (TextView)itemView.findViewById(R.id.tv_hora_vist_item);
            fotoView = (ImageView)itemView.findViewById(R.id.im_situacao_item_vist);
            onVistListner = onVistoriaListner;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            onVistListner.onVistoriaClick(getAdapterPosition());
        }
    }

    public interface OnVistoriaListner{
        void onVistoriaClick(int position);
    }
}

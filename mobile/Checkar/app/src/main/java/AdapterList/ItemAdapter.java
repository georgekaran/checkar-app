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

import model.ItemVistoria;

public class ItemAdapter extends RecyclerView.Adapter<ItemAdapter.ItemViewHolder>{
    private List<ItemVistoria> itens;
    private OnItemVistoriaListner mOnItemVistoriaListner;

    public ItemAdapter(List<ItemVistoria> itens, OnItemVistoriaListner onItemVistoriaListner){
        this.itens = itens;
        this.mOnItemVistoriaListner = onItemVistoriaListner;
    }

    @NonNull
    @Override
    public ItemViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_item_vistoria, parent, false);
        ItemViewHolder pvh = new ItemViewHolder(v, this.mOnItemVistoriaListner);
        return pvh;
    }

    @Override
    public void onBindViewHolder(@NonNull ItemViewHolder holder, int position) {
        holder.descricaoView.setText(this.itens.get(position).getItem().getNome());
        holder.tipoView.setText(this.itens.get(position).getItem().getNomeTipo());

        if(this.itens.get(position).getSituacao().equals("S")){
            holder.imageView.setImageResource(R.drawable.ok);
        } else if(this.itens.get(position).getSituacao().equals("C")) {
            holder.imageView.setImageResource(R.drawable.alerta);
        } else {
            holder.imageView.setImageResource(R.drawable.vazio);
        }
    }

    @Override
    public int getItemCount() {
        return itens.size();
    }


    public static class ItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{
        TextView descricaoView;
        TextView tipoView;
        ImageView imageView;
        OnItemVistoriaListner onItemVistoriaListner;

        ItemViewHolder(View itemView, OnItemVistoriaListner onItemVistoriaListner) {
            super(itemView);
            descricaoView = (TextView) itemView.findViewById(R.id.tv_data_vist_item);
            tipoView = (TextView) itemView.findViewById(R.id.tv_situacao_vist_item);
            imageView = (ImageView) itemView.findViewById(R.id.im_situacao_item_vist);
            this.onItemVistoriaListner = onItemVistoriaListner;

            itemView.setOnClickListener(this);
        }


        @Override
        public void onClick(View v) {
            onItemVistoriaListner.onItemVistoriaClick(getAdapterPosition());
        }
    }

    public interface OnItemVistoriaListner{
        void onItemVistoriaClick(int position);
    }
}

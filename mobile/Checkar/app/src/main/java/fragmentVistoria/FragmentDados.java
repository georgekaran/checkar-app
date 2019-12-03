package fragmentVistoria;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.checkar.R;
import com.example.checkar.VistoriaCarro;

public class FragmentDados extends Fragment {
    private EditText etPlaca = null;
    private EditText etModelo = null;
    private EditText etMarca = null;
    private EditText etData = null;
    private EditText etHora = null;
    private EditText etkmVeiculo = null;
    private EditText etObservacoes = null;


    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_dados, container, false);

        etPlaca = (EditText) view.findViewById(R.id.et_placa);
        etModelo = (EditText) view.findViewById(R.id.et_modelo);
        etMarca = (EditText) view.findViewById(R.id.et_marca);
        etData = (EditText) view.findViewById(R.id.et_data);
        etHora = (EditText) view.findViewById(R.id.et_hora);
        etkmVeiculo = (EditText) view.findViewById(R.id.et_km_veiculo);
        etObservacoes = (EditText) view.findViewById(R.id.et_observacoes);

        etPlaca.setText(VistoriaCarro.vistoria.getVeiculo().getPlaca());
        etModelo.setText(VistoriaCarro.vistoria.getVeiculo().getModelo());
        etMarca.setText(VistoriaCarro.vistoria.getVeiculo().getMarca());
        etData.setText(VistoriaCarro.vistoria.getData());
        etHora.setText(VistoriaCarro.vistoria.getHora());
        etkmVeiculo.setText(VistoriaCarro.vistoria.getKm()+"");
        etObservacoes.setText(VistoriaCarro.vistoria.getObservacao());

        return view;
    }

}

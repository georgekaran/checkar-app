package fragmentVistoria;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.checkar.R;
import com.example.checkar.VistoriaActivity;

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
        etData = (EditText) view.findViewById(R.id.tv_data_vistoria);
        etHora = (EditText) view.findViewById(R.id.et_hora);
        etkmVeiculo = (EditText) view.findViewById(R.id.et_km_veiculo);

        etPlaca.setText(VistoriaActivity.vistoria.getVeiculo().getPlaca());
        etModelo.setText(VistoriaActivity.vistoria.getVeiculo().getModelo());
        etMarca.setText(VistoriaActivity.vistoria.getVeiculo().getMarca());
        etData.setText(VistoriaActivity.vistoria.getData());
        etHora.setText(VistoriaActivity.vistoria.getHora());
        etkmVeiculo.setText(VistoriaActivity.vistoria.getKm()+"");

        etkmVeiculo.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                VistoriaActivity.vistoria.setKm(Integer.parseInt(s.toString()));
            }
        });

        return view;
    }

}

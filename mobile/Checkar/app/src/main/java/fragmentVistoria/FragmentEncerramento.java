package fragmentVistoria;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.fragment.app.Fragment;

import com.example.checkar.MenuActivity;
import com.example.checkar.R;
import com.example.checkar.VistoriaActivity;

import dao.VistoriaDAO;

public class FragmentEncerramento extends Fragment {
    private EditText etObservacoes = null;
    private EditText etQtdItensReprovados = null;
    private EditText etQtdItensAprovados = null;
    private Button btConcluir = null;
    private Button btBuscar = null;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.fragment_encerramento, container, false);
        View viewDados = inflater.inflate(R.layout.fragment_dados, container, false);

        etObservacoes = (EditText) view.findViewById(R.id.et_obs_vist_enc);
        etQtdItensAprovados = (EditText) view.findViewById(R.id.et_itens_aprov);
        etQtdItensReprovados = (EditText) view.findViewById(R.id.et_itens_reprov);
        btConcluir = (Button) view.findViewById(R.id.bt_concluir_vist);
        btBuscar = (Button) view.findViewById(R.id.bt_buscar);

        etObservacoes.setText(VistoriaActivity.vistoria.getObservacao());
        etQtdItensAprovados.setText(VistoriaActivity.vistoria.qtdItensAprovados() + "");
        etQtdItensReprovados.setText(VistoriaActivity.vistoria.qtdItensReprovados() + "");

        btConcluir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (VistoriaActivity.vistoria.permiteSalvar()) {
                    VistoriaActivity.vistoria.setObservacao(etObservacoes.getText().toString());

                    if(VistoriaActivity.vistoria.getId() <= 0) {
                        new VistoriaDAO().save(VistoriaActivity.vistoria, getContext());
                    } else {
                        new VistoriaDAO().update(VistoriaActivity.vistoria, getContext());
                    }

                    Toast.makeText(view.getContext(), "Vistoria concluáda!", Toast.LENGTH_SHORT).show();
                    getActivity().finish();
                    MenuActivity.listarVistoriasRealizadas(view.getContext());
                } else {
                    Toast.makeText(getContext(), "Vistoria não esta completa!", Toast.LENGTH_LONG).show();
                }
            }
        });

        btBuscar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                VistoriaActivity.salvarLocal = true;
            }
        });

        return view;
    }
}

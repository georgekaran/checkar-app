package model;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.checkar.MainActivity;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import dao.EmpresaDAO;
import dao.ItemDAO;
import dao.TipoItemDAO;
import dao.TipoVeiculoDAO;
import dao.VeiculoDAO;
import dao.VistoriaDAO;

public class DownloadDados extends AsyncTask<Void, Void, String> {
    Context context = null;
    RequestQueue queue = null;
    ProgressDialog load;

    public DownloadDados(Context context) {
        this.context = context;
    }

    @Override
    protected void onPreExecute() {
        load = ProgressDialog.show(this.context, "Por favor Aguarde ...", "Sincronizando dados ...");
    }

    @Override
    protected void onPostExecute(String string) {
        load.dismiss();
    }

    @Override
    protected String doInBackground(Void... voids) {
        new EmpresaDAO().deleteAll(this.context);
        new TipoVeiculoDAO().deleteAll(this.context);
        new VeiculoDAO().deleteAll(this.context);
        new TipoItemDAO().deleteAll(this.context);
        new ItemDAO().deleteAll(this.context);
        new VeiculoDAO().deleteAllItemVeiculo(this.context);

        queue = Volley.newRequestQueue(this.context);
        queue.add(baixarEmpresa());
        queue.add(baixarTipoVeiculo());
        queue.add(baixarVeiculo());
        queue.add(baixarTipoItem());
        queue.add(baixarItem());
        queue.add(baixarItemVeiculo());

        ArrayList<Vistoria> vistorias = new VistoriaDAO().selectEnvio(context);
        for (int i = 0; i < vistorias.size(); i++) {
            try {
                queue.add(enviarVistorias(vistorias.get(i)));

                for (int x=0; x<vistorias.get(i).getItensVistoria().size(); x++)
                {
                    queue.add(enviarItensVistorias(vistorias.get(i).getId(), vistorias.get(i).getItensVistoria().get(x)));
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    private StringRequest baixarUsuario() {
        String url = "http://10.0.2.2:5000/user";
        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            Usuario usuario = new Usuario();
                            JsonObject id = arrayFromString.get(i).getAsJsonObject();
                            usuario.setId(id.get("id").getAsInt());
                            usuario.setEmail(id.get("email").getAsString());
                            usuario.setNome(id.get("nome").getAsString());
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );
    }

    private StringRequest baixarTipoVeiculo() {
        String url = "http://10.0.2.2:5000/vehicle/type";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            TipoVeiculo veiculo = new TipoVeiculo();
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            veiculo.setId(jsonO.get("id").getAsInt());
                            veiculo.setTipoVeiculo(jsonO.get("tipo_veiculo").getAsString());
                            new TipoVeiculoDAO().save(veiculo, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    private StringRequest baixarTipoItem() {
        String url = "http://10.0.2.2:5000/item/type";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            TipoItem tipoItem = new TipoItem();
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            tipoItem.setId(jsonO.get("id").getAsInt());
                            tipoItem.setTipo_item(jsonO.get("tipo_item").getAsString());
                            new TipoItemDAO().save(tipoItem, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    private StringRequest baixarItem() {
        String url = "http://10.0.2.2:5000/item";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            Item item = new Item();
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            item.setId(jsonO.get("id").getAsInt());
                            item.setIdTipo(jsonO.get("id_tipo_item").getAsInt());
                            item.setNome(jsonO.get("nome").getAsString());
                            new ItemDAO().save(item, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    private StringRequest baixarEmpresa() {
        String url = "http://10.0.2.2:5000/company";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            Empresa empresa = new Empresa();
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            empresa.setId(jsonO.get("id").getAsInt());
                            empresa.setNome(jsonO.get("nome").getAsString());
                            new EmpresaDAO().save(empresa, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    private StringRequest baixarVeiculo() {
        String url = "http://10.0.2.2:5000/vehicle";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            Veiculo veiculo = new Veiculo();
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            veiculo.setId(jsonO.get("id_veiculo").getAsInt());
                            veiculo.setIdTipo(jsonO.get("tipo_veiculo_id").getAsInt());
                            veiculo.setPlaca(jsonO.get("placa").getAsString());
                            veiculo.setModelo(jsonO.get("modelo").getAsString());
                            veiculo.setMarca(jsonO.get("marca").getAsString());
                            veiculo.setAno(Integer.parseInt(jsonO.get("ano").getAsString()));
                            veiculo.setChassi(jsonO.get("chassi").getAsString());
                            veiculo.setRenavam(jsonO.get("renavam").getAsString());
                            veiculo.setIdEmpresa(jsonO.get("empresa_id").getAsInt());
                            new VeiculoDAO().save(veiculo, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    private StringRequest baixarItemVeiculo() {
        String url = "http://10.0.2.2:5000/vehicle/item";

        return new StringRequest(
                Request.Method.GET,                                        // Método
                url,                                                // link (acima)
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {             // o que fazer com a resposta
                        String r = response;
                        JsonParser jsonParser = new JsonParser();
                        JsonArray arrayFromString = jsonParser.parse(r).getAsJsonArray();
                        System.out.println(arrayFromString.toString());

                        for (int i = 0; i < arrayFromString.size(); i++) {
                            JsonObject jsonO = arrayFromString.get(i).getAsJsonObject();
                            int id = jsonO.get("id").getAsInt();
                            int veiculo = jsonO.get("id_veiculo").getAsInt();
                            int item = jsonO.get("id_item").getAsInt();
                            new VeiculoDAO().saveItemVeiculo(id, item, veiculo, context);
                        }
                    }
                },

                new Response.ErrorListener() {                            // se der erro
                    @Override
                    public void onErrorResponse(VolleyError error) {

                    }
                }
        );

    }

    public JsonObjectRequest enviarVistorias(final Vistoria vistoria) throws JSONException {

        String url = "http://10.0.2.2:5000/inspection";

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("id", vistoria.getId());
        jsonBody.put("id_usuario", 1);
        jsonBody.put("id_veiculo", vistoria.getVeiculo().getId());
        jsonBody.put("data", vistoria.getData());
        jsonBody.put("hora", vistoria.getHora());
        jsonBody.put("km", vistoria.getKm());
        jsonBody.put("sincronizado", vistoria.getSincronizado());
        jsonBody.put("observacao", vistoria.getObservacao());
        jsonBody.put("latitude", vistoria.getLatitude());
        jsonBody.put("longitude", vistoria.getLongitude());

        return new JsonObjectRequest(Request.Method.POST,
                url, jsonBody,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("JSONPost", response.toString());

                        try {
                            if (response.get("message").toString().equals("Create successfully")){
                                new VistoriaDAO().updateSincronizado(vistoria.getId(), context);
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        VolleyLog.d("JSONPost", "Error: " + error.getMessage());
                    }
        }
        );
    }

    public JsonObjectRequest enviarItensVistorias(int idVist, ItemVistoria itemVistoria) throws JSONException {
        String url = "http://10.0.2.2:5000/inspection/item";

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("id", itemVistoria.getId());
        jsonBody.put("id_vistoria", idVist);
        jsonBody.put("id_veiculo_item", itemVistoria.getId_item_veiculo());
        jsonBody.put("situacao", itemVistoria.getSituacao());
        jsonBody.put("observacao", itemVistoria.getObservacao());
        jsonBody.put("foto", itemVistoria.getFoto());

        return new JsonObjectRequest(Request.Method.POST,
                url, jsonBody,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d("JSONPost", response.toString());
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.d("JSONPost", "Error: " + error.getMessage());
            }
        }
        );
    }
}

package model;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

public class AutenticarUsu {
    public static void autenticarUsuario(String email, String senha, Context context) {
        RequestQueue queue = Volley.newRequestQueue(context);

        try {

            String url = "http://10.0.2.2:5000/auth/login";

            JSONObject jsonBody = new JSONObject();
            jsonBody.put("email", email);
            jsonBody.put("password", senha);

            JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.POST,
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
            queue.add(jsonObjReq);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

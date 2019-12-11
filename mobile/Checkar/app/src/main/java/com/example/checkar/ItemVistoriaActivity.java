package com.example.checkar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import model.ItemVistoria;

public class ItemVistoriaActivity extends AppCompatActivity {
    static final int REQUEST_IMAGE_CAPTURE = 1;
    static final int REQUEST_TAKE_PHOTO = 1;


    public static ItemVistoria item;
    private EditText etDescItem = null;
    private EditText etTipoItem = null;
    private EditText etObservacoes = null;
    private RadioButton rbSemProblema = null;
    private RadioButton rbComProblema = null;
    private Button btSalvar = null;
    private ImageView imFotoItem = null;
    public static String caminhoImagem = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_vistoria);

        etDescItem = (EditText) findViewById(R.id.et_desc_item_vist);
        etTipoItem = (EditText) findViewById(R.id.et_tipo_item_vist);
        etObservacoes = (EditText) findViewById(R.id.et_obs_item_vist);
        rbComProblema = (RadioButton) findViewById(R.id.rb_com_problema);
        rbSemProblema = (RadioButton) findViewById(R.id.rb_sem_problema);
        btSalvar = (Button) findViewById(R.id.bt_salvar_item_vist);
        imFotoItem = (ImageView) findViewById(R.id.im_foto_item_vist);

        etDescItem.setText(ItemVistoriaActivity.item.getItem().getNome());
        etTipoItem.setText(ItemVistoriaActivity.item.getItem().getNomeTipo());
        etObservacoes.setText(ItemVistoriaActivity.item.getObservacao());

        if (!ItemVistoriaActivity.item.getFoto().equals("")){
            File imgFile = new  File(ItemVistoriaActivity.item.getFoto());

            if(imgFile.exists()){
                Bitmap myBitmap = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
                imFotoItem.setImageBitmap(myBitmap);
            }
        }

        rbSemProblema.setChecked(false);
        rbComProblema.setChecked(false);

        if (ItemVistoriaActivity.item.getSituacao().equals("S")){
            rbSemProblema.setChecked(true);
        } else if ( ItemVistoriaActivity.item.getSituacao().equals("C")){
            rbComProblema.setChecked(true);
        }

        btSalvar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ItemVistoriaActivity.item.setObservacao(etObservacoes.getText().toString());
                ItemVistoriaActivity.item.setSituacao("");
                ItemVistoriaActivity.item.setFoto(ItemVistoriaActivity.caminhoImagem);
                if (rbSemProblema.isChecked()) {
                    ItemVistoriaActivity.item.setSituacao("S");
                } else if(rbComProblema.isChecked()){
                    ItemVistoriaActivity.item.setSituacao("C");
                }
            }
        });

        imFotoItem.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dispatchTakePictureIntent();
            }
        });

    }

    /*private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }*/

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            // Create the File where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                // Error occurred while creating the File
                // ...
            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                Uri photoURI = FileProvider.getUriForFile(this,"com.example.android.fileprovider", photoFile);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                startActivityForResult(takePictureIntent, REQUEST_TAKE_PHOTO);
            }
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            imFotoItem.setImageBitmap(imageBitmap);
        }
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        this.caminhoImagem = image.getAbsolutePath();
        return image;
    }


}

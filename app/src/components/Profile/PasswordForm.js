import React from 'react';
import useForm, {FormContext} from 'react-hook-form'
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { profile } from '../../main/api'
import BasicPage from '../common/BasicPage'
import * as Yup from "yup";
import Input from "../input/Input";
import Grid from "@material-ui/core/Grid";

const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Campo é obrigatório.'),
  passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas devem ser iguais.')
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
    width: '100%'
  }
}));

function Profile() {

  const classes = useStyles();
  const methods = useForm({
    validationSchema: PasswordSchema
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSubmit = (values) => {
    closeSnackbar();

    profile.updatePassword(values).then(res => {
      enqueueSnackbar("Senha alterada!", { variant: 'success' });
    }).catch(e => {
      if (e.response) {
        enqueueSnackbar(e.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar('Falha ao contatar o servidor de autenticação!', { variant: 'error' });
      }
    })
  }

  return (

      <BasicPage title={<div><LockIcon /> {'Alterar Senha'}</div>}>
        <FormContext {...methods} >
          <form className={classes.container} onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid container item xs={12}>
                <Input name="password"
                       label="Nova Senha"
                       type="password" />
              </Grid>
              <Grid container item xs={12}>
                <Input name="passwordConfirmation"
                       label="Confirmar"
                       type="password" />
              </Grid>

              <Box display="flex" p={1} bgcolor="background.paper" justifyContent="flex-end" className={classes.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    startIcon={<SaveIcon />}
                >Alterar</Button>
              </Box>
            </Grid>
          </form>
        </FormContext>

      </BasicPage>


  );
}

export default Profile;
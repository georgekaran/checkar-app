import React from 'react';
import { useDispatch } from 'react-redux'
import useForm from 'react-hook-form'
import { useSnackbar } from 'notistack';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import { auth } from '../main/api'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const classes = useStyles();

  const onSubmit = (values) => {
    console.log(values);
    closeSnackbar()
    auth.login(values).then(res => {
      console.log(res);
      dispatch({ type: 'USER_FETCHED', payload: res.data })
    }).catch(e => {
      if (e.response) {
        enqueueSnackbar('Usuário ou senha inválidos', { variant: 'error' });
      } else {
        enqueueSnackbar('Falha ao contatar o servidor de autenticação!', { variant: 'error' });
      }
    })
  }

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="email"
        name="email"
        label="Usuário ou e-mail"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        inputProps={{ ref: register }}
        autoComplete="login"
        autoFocus
      />

      <TextField
        type="password"
        name="password"
        label="Senha"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        inputProps={{ ref: register }}
      />

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >Entrar</Button>
    </form>

  )


}

export default LoginForm;
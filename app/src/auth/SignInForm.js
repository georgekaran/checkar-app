import React from 'react'
import { useDispatch } from 'react-redux'
import useForm from 'react-hook-form'
import { useSnackbar } from 'notistack'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { auth } from '../main/api'
import * as Yup from "yup";
import Form from "../components/form/Form";
import Input from "../components/input/Input";

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignInSchema = Yup.object().shape({
    name: Yup.string().default('').required("Campo obrigatório."),
    email: Yup.string().email("Não é um email válido.").required("Campo obrigatório."),
    password: Yup.string().min(6, "Mínimo de 6 caracteres.").required('Campo obrigatório.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais.')
});

function SignInForm() {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const methods = useForm({
        validationSchema: SignInSchema
    });
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = (values) => {
    closeSnackbar();
    auth.signIn(values).then(res => {
        enqueueSnackbar('Usuário criado com sucesso! Para acessar a ferramenta solicite à um administrador a ativação de sua conta.', { variant: 'sucesss' });
    }).catch(e => {
        enqueueSnackbar('Erro ao criar usuário.', { variant: 'error' });
    })
  }

  return (
      <Form onSubmit={onSubmit} methods={methods}>
          <Input name="name"
                 label="Nome Completo"
                 variant="outlined"
                 margin="normal" />

          <Input name="email"
                 type="email"
                 label="E-mail"
                 variant="outlined"
                 margin="normal" />

          <Input name="password"
                 type="password"
                 label="Senha"
                 variant="outlined"
                 margin="normal" />

          <Input name="passwordConfirmation"
                 type="password"
                 label="Confirmar senha"
                 variant="outlined"
                 margin="normal" />

          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
          >Registrar</Button>
      </Form>
  )
}

export default SignInForm;
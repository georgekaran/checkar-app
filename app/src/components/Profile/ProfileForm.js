import React from 'react';
import useForm, {FormContext} from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as Yup from "yup";

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import { profile } from '../../main/api'
import BasicPage from '../common/BasicPage'
import Loading from '../common/Loading'
import Input from "../input/Input";
import Grid from "@material-ui/core/Grid";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().default('').required("Campo obrigatório."),
  email: Yup.string().email("Deve ser um email válido.").required("Campo obrigatório."),
  phoneNumber: Yup.string().default('').nullable()
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
  const [ loading, setLoading ] = React.useState(true);
  const methods = useForm({
    validationSchema: ProfileSchema
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    profile.get().then(({ data }) => {
      setLoading(false);
      methods.reset(data)
    })
  }, []);

  const onSubmit = (values) => {
    closeSnackbar();

    profile.update(values).then(res => {
      enqueueSnackbar("Sucesso!", { variant: 'success' });
    }).catch(e => {
      if (e.response) {
        enqueueSnackbar(e.response.data.error, { variant: 'error' });
      } else {
        enqueueSnackbar('Falha ao contatar o servidor de autenticação!', { variant: 'error' });
      }
    })
  }

  return (
      <BasicPage title="Editar Perfil">
        {loading
            ? <Loading />
            : <FormContext {...methods} >
                <form className={classes.container} onSubmit={methods.handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid container item xs={12}>
                      <Input name="name"
                             label="Nome" />
                    </Grid>
                    <Grid container item xs={12}>
                      <Input name="email"
                             label="E-mail" />
                    </Grid>
                    <Grid container item xs={12}>
                      <Input name="phoneNumber"
                             label="Telefone"
                             InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                     <PhoneIcon />
                                   </InputAdornment>
                               ),
                             }}/>
                    </Grid>
                  </Grid>

                  <Box display="flex" p={1} bgcolor="background.paper" justifyContent="flex-end" className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        startIcon={<SaveIcon />}>
                      Salvar
                    </Button>
                  </Box>
                </form>
              </FormContext>
        }
      </BasicPage>
  );
}

export default Profile;
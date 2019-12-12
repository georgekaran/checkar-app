import React, { useEffect } from 'react';
import useForm, {FormContext} from 'react-hook-form';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { useSnackbar } from 'notistack';

import Title from '../common/Title';
import { clients } from '../../main/api'
import Input from "../input/Input";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        // paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        // width: 200,
    },
    button: {
        width: 100
    }
}));

const renderLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const ClientSchema = Yup.object().shape({
    companyName: Yup.string().default(''),
    tradingName: Yup.string().default('').required("Campo obrigatório."),
    cnpj: Yup.string().matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}/, "É preciso informar um CNPJ válido.").required("Campo obrigatório."),
    district: Yup.string().min(2, "Minímo de 2 letras").max(2, "Máximo de 2 letras").default(''),
    city: Yup.string().default(''),
    address: Yup.string().default(''),
    country: Yup.string().default(''),
    state: Yup.boolean().default(true)
});

export default function Client(props) {
    const methods = useForm({
        validationSchema: ClientSchema
    });

    const id = props.match.params.id;

    useEffect(() => {
        if (id) {
            clients.get(id).then((res) => {
                methods.reset(res.data)
            })
        }
    }, [id, methods])

    const { enqueueSnackbar } = useSnackbar();

    const handleSave = values => {
        clients.save(id, values).then((res) => {
            enqueueSnackbar('Cliente criado/atualizado com sucesso!', { variant: 'success' });
        }).catch((err) => {
            console.log(err.response.data);
            enqueueSnackbar('Erro ao criar/atualizar cliente! ', { variant: 'error' });
        })
    };

    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <FormContext {...methods} >
                        <form onSubmit={methods.handleSubmit(handleSave)}>
                            <div style={{ width: '100%' }}>
                                <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                                    <Title>{id ? 'Editar Cliente ' + id : 'Adicionar Cliente'}</Title>
                                    <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/clients'}>
                                        <ArrowBackIcon />
                                    </Fab>
                                </Box>
                            </div>
                            <Grid container spacing={2}>
                                <Grid container item xs={12}>
                                    <Input name="companyName"
                                           label="Razão Social" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="tradingName"
                                           label="Nome Fantasia" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="cnpj"
                                           label="CNPJ" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="address"
                                           label="Endereço" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="country"
                                           label="País" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="district"
                                           label="Estado" />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Input name="city"
                                           label="Cidade" />
                                </Grid>
                            </Grid>

                            <Box display="flex" p={1} bgcolor="background.paper" justifyContent="flex-end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </form>
                    </FormContext>
                </Paper>
            </Grid>
        </Container>

    );
}
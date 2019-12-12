import React, { useEffect, useState } from 'react';
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
import {clients, users} from '../../main/api'
import * as Yup from "yup";
import Form from "../form/Form";
import Input from "../input/Input";
import useForm from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingBottom: theme.spacing(1),
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
        width: 'auto'
    },
    select: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

const renderLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const UserFullSchema = Yup.object().shape({
    name: Yup.string().default('').required("Campo obrigatório."),
    email: Yup.string().email("Não é um email válido.").required("Campo obrigatório."),
    phoneNumber: Yup.string().nullable().max(45, "45 caracteres é o limite máximo para esse campo."),
    client: Yup.number().nullable(),
    profile: Yup.number().default(1).required("Campo obrigatório."),
    password: Yup.string().required('Campo obrigatório.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais.')
});

const UserBaseInfoSchema = Yup.object().shape({
    name: Yup.string().default('').required("Campo obrigatório."),
    email: Yup.string().email("Não é um email válido.").required("Campo obrigatório."),
    phoneNumber: Yup.string().nullable().max(45, "45 caracteres é o limite máximo para esse campo."),
    client: Yup.number().nullable(),
    profile: Yup.number().default(1).required("Campo obrigatório."),
});

const UserPasswordSchema = Yup.object().shape({
    password: Yup.string().required('Campo obrigatório.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais.')
});

const profiles = [
    { value: 1, label: "Administrador" },
    { value: 2, label: "Consultor" },
    { value: 3, label: "Gestor de projetos" },
    { value: 4, label: "Cliente" }
];

export default function UserForm(props) {

    const id = props.match.params.id;

    const methodsUserFull = useForm({
        validationSchema: UserFullSchema
    });
    const methodsUserBasicInfo = useForm({
        validationSchema: UserBaseInfoSchema
    });
    const methodsUserPassword = useForm({
        validationSchema: UserPasswordSchema
    });

    const [stateClients, setStateClients] = useState([]);
    const [client, setClient] = useState(null);
    const [profile, setProfile] = useState(null);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getClients();
    }, []);

    useEffect(() => {
        console.log(client);
    }, [client])

    useEffect(() => {
        if (id) {
            users.get(id).then((res) => {
                console.log(res);
                console.log(stateClients);
                setClient(stateClients.find(cli => cli.value === res.data.client));
                setProfile(profiles.find(profi => profi.value === res.data.profile));
                methodsUserBasicInfo.reset(res.data)
            })
        }
    }, [id, stateClients]);

    function getClients() {
        clients.list().then(resp => {
            const clientsSelect = resp.data.map(client => {
                return { value: client.id, label: client.tradingName }
            });
            setStateClients(clientsSelect);
        })
    }

    const handleSave = values => {
        console.log(values);
        let newValues = Object.assign(values, client && { client: {id: client.value} }, { profile: {id: profile.value} });
        users.save(id, newValues).then((res) => {
            enqueueSnackbar('Usuário criado/atualizado com sucesso.', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Falha ao criar/atualizar usuário.' + err.response.data.errors[0].message, { variant: 'error' });
        })
    };

    const handleChangePassword = values => {
        console.log(values);
        users.updatePassword(id, values).then((res) => {
            enqueueSnackbar('Senha alterada com sucesso!', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Erro ao atualizar senhas! ', { variant: 'error' });
        })
    };

    return (
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <div style={{ width: '100%' }}>
                        <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                            <Title>{id ? 'Editar usuário ' + id : 'Criar usuário'}</Title>
                            <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/users'}>
                                <ArrowBackIcon />
                            </Fab>
                        </Box>
                    </div>
                    <Form onSubmit={handleSave} methods={id ? methodsUserBasicInfo : methodsUserFull}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}>
                                <Input name="name"
                                       label="Nome" />
                            </Grid>

                            <Grid container item xs={6}>
                                <Input name="email"
                                       label="E-mail" />
                            </Grid>

                            <Grid container item xs={6}>
                                <Input name="phoneNumber"
                                       label="Telefone" />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    options={stateClients}
                                    getOptionLabel={option => option.label}
                                    value={client}
                                    onChange={(event, newValue) => {
                                        setClient(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} className={classes.textField} label="Cliente" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    options={profiles}
                                    getOptionLabel={option => option.label}
                                    value={profile}
                                    onChange={(event, newValue) => {
                                        setProfile(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} className={classes.textField} label="Perfil de usuário" fullWidth />
                                    )}
                                />
                            </Grid>

                            {!id &&
                            <>
                                <Grid container item xs={12}>
                                    <Input name="password"
                                           type="password"
                                           label="Senha" />
                                </Grid>

                                <Grid container item xs={12}>
                                    <Input name="passwordConfirmation"
                                           type="password"
                                           label="Confirmar senha" />
                                </Grid>
                            </>}
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
                    </Form>
                </Paper>

                {id && <Paper className={classes.paper}>

                    <Title>{id ? 'Alterar senha' : 'Senha'}</Title>

                    <Form onSubmit={handleChangePassword} methods={methodsUserPassword}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}>
                                <Input name="password"
                                       type="password"
                                       label="Senha" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="passwordConfirmation"
                                       type="password"
                                       label="Confirmar senha" />
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
                                Salvar Senha
                            </Button>
                        </Box>
                    </Form>
                </Paper>}
            </Grid>

        </Container>

    );
}
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
import { clients, users as usersAPI, typeUser as typeUserAPI, company as companyAPI } from '../../main/api'
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
    nome: Yup.string().default('').required("Campo obrigatório."),
    email: Yup.string().email("Não é um email válido.").required("Campo obrigatório."),
    senha: Yup.string().required('Campo obrigatório.'),
    senhaConfirmation: Yup.string()
        .oneOf([Yup.ref('senha'), null], 'Senhas precisam ser iguais.')
});

const UserBaseInfoSchema = Yup.object().shape({
    nome: Yup.string().default('').required("Campo obrigatório."),
    email: Yup.string().email("Não é um email válido.").required("Campo obrigatório."),
});

export default function UserForm(props) {

    const id = props.match.params.id;

    const methodsUserFull = useForm({
        validationSchema: UserFullSchema
    });
    const methodsUserBasicInfo = useForm({
        validationSchema: UserBaseInfoSchema
    });

    const [stateClients, setStateClients] = useState([]);
    const [company, setCompany] = useState(null);
    const [companys, setCompanys] = useState([]);
    const [typeUser, setTypeUser] = useState(null);
    const [typesUser, setTypesUser] = useState([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (id) {
            usersAPI.get(id).then((res) => {
                setCompany(companys.find(cli => cli.value === res.data.empresa_id));
                setTypeUser(typesUser.find(profi => profi.value === res.data.tipo_usuario_id));
                methodsUserBasicInfo.reset(res.data)
            })
        }
    }, [id, companys, typesUser]);

    function fetchAll() {
        companyAPI.get().then(resp => {
            const companySelect = resp.data.map(comp => {
                return { value: comp.id, label: comp.nome }
            });
            setCompanys(companySelect);
            if (companySelect.length !== 0) {
                setCompany(companySelect[0])
            }
        })
        typeUserAPI.get().then(resp => {
            const typeUserSelect = resp.data.map(tu => {
                return { value: tu.id, label: tu.tipo_usuario }
            });
            setTypesUser(typeUserSelect);
            if (typeUserSelect.length !== 0) {
                setTypeUser(typeUserSelect[0])
            }
        })
    }

    const handleSave = values => {
        console.log(values);
        let newValues = Object.assign(values, company && { empresa_id: company.value }, { tipo_usuario_id: typeUser.value });
        delete newValues.senhaConfirmation;
        console.log(newValues);
        usersAPI.save(id, newValues).then((res) => {
            enqueueSnackbar('Usuário criado/atualizado com sucesso.', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Falha ao criar/atualizar usuário.' + err.response.data.errors[0].message, { variant: 'error' });
        })
    };

    const handleChangePassword = values => {
        console.log(values);
        usersAPI.updatePassword(id, values).then((res) => {
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
                                <Input name="nome"
                                       label="Nome" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="email"
                                       label="E-mail" />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    options={companys}
                                    getOptionLabel={option => option.label}
                                    disableClearable
                                    value={company}
                                    onChange={(event, newValue) => {
                                        setCompany(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} className={classes.textField} label="Empresa" fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    options={typesUser}
                                    getOptionLabel={option => option.label}
                                    disableClearable
                                    value={typeUser}
                                    onChange={(event, newValue) => {
                                        setTypeUser(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField  {...params}
                                                    className={classes.textField} 
                                                    label="Perfil de usuário" 
                                                    fullWidth />
                                    )}
                                />
                            </Grid> 
                            <Grid container item xs={12}>
                                <Input  name="senha"
                                        type="password"
                                        label="Senha" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input  name="senhaConfirmation"
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
                                Salvar
                            </Button>
                        </Box>
                    </Form>
                </Paper>
            </Grid>

        </Container>

    );
}
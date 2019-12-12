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
import {company, users} from '../../main/api'
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

const CompanySchema = Yup.object().shape({
    nome: Yup.string().default('').required("Campo obrigatório.")
});

export default function UserForm(props) {

    const id = props.match.params.id;

    const methodsCompany = useForm({
        validationSchema: CompanySchema
    });

    const [companys, setCompanys] = useState([]);
    const [client, setClient] = useState(null);
    const [profile, setProfile] = useState(null);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getCompanys();
    }, []);

    function getCompanys() {
        company.get().then(resp => {
            setCompanys(resp.data);
        })
    }

    useEffect(() => {
        if (id) {
            company.get(id).then((res) => {
                methodsCompany.reset(res.data)
            })
        }
    }, [id, companys]);

    const handleSave = values => {
        company.save(id, values).then((res) => {
            enqueueSnackbar('Empresa criada/atualizada com sucesso.', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Falha ao criar/atualizar empresa.' + err.response.data.errors[0].message, { variant: 'error' });
        })
    };

    return (
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <div style={{ width: '100%' }}>
                        <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                            <Title>{id ? 'Editar Empresa ' + id : 'Criar empresa'}</Title>
                            <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/companys'}>
                                <ArrowBackIcon />
                            </Fab>
                        </Box>
                    </div>
                    <Form onSubmit={handleSave} methods={methodsCompany}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}>
                                <Input name="nome"
                                       label="Nome" />
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
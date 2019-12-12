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
import { typeItem as typeItemAPI, item as itemAPI } from '../../main/api'
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

const ItemSchema = Yup.object().shape({
    nome: Yup.string().default('').required("Campo obrigatório.")
});

export default function UserForm(props) {

    const id = props.match.params.id;

    const methodsItem = useForm({
        validationSchema: ItemSchema
    });

    const [typeItem, setTypeItem] = useState(null);
    const [typesItem, setTypesItem] = useState([]);
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getTypesItems();
    }, []);

    function getTypesItems() {
        typeItemAPI.get().then(resp => {
                const typeItemSelect = resp.data.map(ti => {
                    return { value: ti.id, label: ti.tipo_item }
                });
                setTypesItem(typeItemSelect);
                if (typeItemSelect.length !== 0) {
                    setTypeItem(typeItemSelect[0])
                }
        })
    }

    useEffect(() => {
        if (id) {
            itemAPI.get(id).then((res) => {
                methodsItem.reset(res.data)
            })
        }
    }, [id, typesItem]);

    const handleSave = values => {
        let newValues = Object.assign(values, typeItem && { id_tipo_item: typeItem.value });
        itemAPI.save(id, newValues).then((res) => {
            enqueueSnackbar('Item criado/atualizado com sucesso.', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Falha ao criar/atualizar item.' + err.response.data.errors[0].message, { variant: 'error' });
        })
    };

    return (
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <div style={{ width: '100%' }}>
                        <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                            <Title>{id ? 'Editar Item ' + id : 'Criar Item'}</Title>
                            <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/items'}>
                                <ArrowBackIcon />
                            </Fab>
                        </Box>
                    </div>
                    <Form onSubmit={handleSave} methods={methodsItem}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}>
                                <Input name="nome"
                                       label="Nome" />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    options={typesItem}
                                    getOptionLabel={option => option.label}
                                    disableClearable
                                    value={typeItem}
                                    onChange={(event, newValue) => {
                                        setTypeItem(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField {...params} className={classes.textField} label="Tipo de item" fullWidth />
                                    )}
                                />
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
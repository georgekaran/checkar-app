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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSnackbar } from 'notistack';

import Title from '../common/Title';
import { vehicle as vehicleAPI, typeVehicle as typeVehicleAPI, company as companyAPI, item as itemAPI, vehicleItem as vehicleItemAPI } from '../../main/api'
import * as Yup from "yup";
import Form from "../form/Form";
import Input from "../input/Input";
import useForm from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import CheckboxHook from '../input/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

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

const VehicleSchema = Yup.object().shape({
    placa: Yup.string().max(8, "Máximo 8 caracteres!").default('').required("Campo obrigatório."),
    modelo: Yup.string().required("Campo obrigatório."),
    marca: Yup.string().required('Campo obrigatório.'),
    ano: Yup.number().integer("Deve ser inteiro").default(2019).required("Campo obrigatório."),
    renavam: Yup.string(),
    chassi: Yup.string(),
});

export default function UserForm(props) {

    const id = props.match.params.id;

    const methods = useForm({
        validationSchema: VehicleSchema
    });

    const [stateClients, setStateClients] = useState([]);
    const [company, setCompany] = useState(null);
    const [companys, setCompanys] = useState([]);
    const [typeVehicle, setTypeVehicle] = useState(null);
    const [typesVehicle, setTypesVehicle] = useState([]);

    const [items, setItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        fetchAll();
    }, []);

    useEffect(() => {
        if (id) {
            vehicleAPI.get(id).then((res) => {
                setCompany(companys.find(cli => cli.value === res.data.empresa_id));
                setTypeVehicle(typesVehicle.find(tv => tv.value === res.data.tipo_veiculo_id));
                methods.reset(res.data)
            })
        }
    }, [id, companys, typesVehicle]);

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
        typeVehicleAPI.get().then(resp => {
            const typesVehicleSelect = resp.data.map(tu => {
                return { value: tu.id, label: tu.tipo_veiculo }
            });
            setTypesVehicle(typesVehicleSelect);
            if (typesVehicleSelect.length !== 0) {
                setTypeVehicle(typesVehicleSelect[0])
            }
        })
        itemAPI.get().then(resp => {
            const itemsSelect = resp.data.map(tu => {
                return { value: tu.id, label: tu.nome }
            });
            setItems(itemsSelect);
        })
        if (id) {
            vehicleItemAPI.get().then(resp => {
                const itemsSelect = resp.data.filter(tu => tu.id_veiculo == id);
                setSelectedItems(itemsSelect.map(i => i.id));
            })
        }
    }

    const handleSave = values => {
        console.log(values);
        let newValues = Object.assign(values, company && { empresa_id: company.value }, { tipo_veiculo_id: typeVehicle.value });
        delete newValues.senhaConfirmation;
        console.log(newValues);
        vehicleAPI.save(id, newValues).then((res) => {
            enqueueSnackbar('Veículo criado/atualizado com sucesso.', { variant: 'success' });
        }).catch((err) => {
            enqueueSnackbar('Falha ao criar/atualizar veículo.' + err.response.data.errors[0].message, { variant: 'error' });
        })
    };

    const handleCheckBoxChange = value => {
        if (selectedItems.find(i => i == value)) {
            setSelectedItems(selectedItems.filter(i => i != value));
        } else {
            setSelectedItems([ ...selectedItems, value ]);
        }
      };

      const handleSaveItems = (e) => {
          e.preventDefault();
          const itemsVehicle = selectedItems.map(i => { return { id_item: i, id_veiculo: id } });
          itemsVehicle.forEach(iv => {
            vehicleItemAPI.save(null, iv).then((res) => {
                enqueueSnackbar('Item criado/atualizado com sucesso.', { variant: 'success' });
            }).catch((err) => {
                enqueueSnackbar('Falha ao criar/atualizar item.' + err.response.data.errors[0].message, { variant: 'error' });
            })
          })
      }

    return (
        <Container maxWidth="lg" className={classes.container}>

            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <div style={{ width: '100%' }}>
                        <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                            <Title>{id ? 'Editar Veículo ' + id : 'Criar veículo'}</Title>
                            <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/vehicles'}>
                                <ArrowBackIcon />
                            </Fab>
                        </Box>
                    </div>
                    <Form onSubmit={handleSave} methods={methods}>
                        <Grid container spacing={2}>
                            <Grid container item xs={12}>
                                <Input name="placa"
                                       label="Placa" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="modelo"
                                       label="Modelo" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="marca"
                                       label="Marca" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="ano"
                                       type="number"
                                       label="Ano" />
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
                                    options={typesVehicle}
                                    getOptionLabel={option => option.label}
                                    disableClearable
                                    value={typeVehicle}
                                    onChange={(event, newValue) => {
                                        setTypeVehicle(newValue);
                                    }}
                                    renderInput={params => (
                                        <TextField  {...params}
                                                    className={classes.textField} 
                                                    label="Tipo de veículo" 
                                                    fullWidth />
                                    )}
                                />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="renavam"
                                       label="Renavam" />
                            </Grid>

                            <Grid container item xs={12}>
                                <Input name="chassi"
                                       label="Chassi" />
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

                {id &&<Paper className={classes.paper}>

                    <Title>Items</Title>

                    <form onSubmit={handleSaveItems}>
                        <Grid container spacing={2}>
                            {items.length !== 0 && items.map(i => (
                                <Grid container item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={selectedItems.length != 0 ? selectedItems.filter(it => it === i.value).length != 0 : false} 
                                                        onChange={(e) => handleCheckBoxChange(i.value)} 
                                                        value={i.value} />
                                        }
                                        label={i.label}
                                    />
                                </Grid>
                            ))}
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
                                Salvar Items
                            </Button>
                        </Box>
                    </form>
                </Paper>}
            </Grid>

        </Container>

    );
}
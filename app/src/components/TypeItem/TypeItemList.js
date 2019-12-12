import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import renderLink from '../common/RouterLink';
import { useSnackbar } from 'notistack';
import moment from 'moment'

import Title from '../common/Title';
import { typeVehicle as typeVehicleAPI } from '../../main/api'
import { useConfirmDialog } from '../common/ConfirmDialog/index'

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}));

export default function UsersList() {
    const { enqueueSnackbar } = useSnackbar();
    const { showConfirmDialog } = useConfirmDialog();
    const [typesVehicle, setTypesVehicle] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getTypeVehicle();
    }, []);

    function getTypeVehicle() {
        typeVehicleAPI.get().then(resp => {
            setTypesVehicle(resp.data);
        })
    }

    const handleDelete = (tv) => {
        showConfirmDialog({
            title: 'Deletar',
            message: `Você gostaria de deletar a tipo veículo ${tv.tipo_veiculo}?`,
            confirmLabel: 'Sim',
            cancelLabel: 'Não',
            confirmCallback: () => {
                typeVehicleAPI.delete(tv.id).then((res) => {
                    enqueueSnackbar('Tipo de veículo deletado com sucesso.', { variant: 'success' });
                    setTypesVehicle(typesVehicle.filter(u => u.id !== tv.id));
                }).catch(e => {
                    enqueueSnackbar('Erro ao deletar empresa.', { variant: 'error' });
                });
            }
        });
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                        <Title>Tipos de veículos</Title>
                        <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/typesVehicle/create'}>
                            <AddIcon />
                        </Fab>
                    </Box>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Último atualização</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typesVehicle.map(typeVehicle => (
                                <TableRow key={typeVehicle.id}>
                                    <TableCell>{typeVehicle.id}</TableCell>
                                    <TableCell>{typeVehicle.tipo_veiculo}</TableCell>
                                    <TableCell>{typeVehicle.updated_at ? moment(typeVehicle.updated_at).locale("pt_BR").format("DD/MM/YYYY HH:mm") : "Sem registro"}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="small" component={renderLink} to={'/typesVehicle/' + typeVehicle.id}>
                                            <CreateIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(typeVehicle)}>
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </Paper>
            </Grid>
        </Container>
    );
}
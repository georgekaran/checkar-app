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
import { typeUser as typeUserAPI } from '../../main/api'
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
    const [typesUser, setTypesUser] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        typeUserAPI.get().then(resp => {
            setTypesUser(resp.data);
        })
    }, []);

    const handleDelete = (typeUser) => {
        showConfirmDialog({
            title: 'Deletar',
            message: `Você gostaria de deletar o tipo de usuário ${typeUser.tipo_usuario}?`,
            confirmLabel: 'Sim',
            cancelLabel: 'Não',
            confirmCallback: () => {
                typeUserAPI.delete(typeUser.id).then((res) => {
                    enqueueSnackbar('Tipo de usuário deletado com sucesso.', { variant: 'success' });
                    setTypesUser(typesUser.filter(u => u.id !== typeUser.id));
                }).catch(e => {
                    enqueueSnackbar('Erro ao deletar tipo de usuário.', { variant: 'error' });
                });
            }
        });
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                        <Title>Tipos de usuário</Title>
                        <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/typesUser/create'}>
                            <AddIcon />
                        </Fab>
                    </Box>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tipo Usuário</TableCell>
                                <TableCell>Nível Permissão</TableCell>
                                <TableCell>Último atualização</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {typesUser.map(tu => (
                                <TableRow key={tu.id}>
                                    <TableCell>{tu.id}</TableCell>
                                    <TableCell>{tu.tipo_usuario}</TableCell>
                                    <TableCell>{tu.nivel_permissao}</TableCell>
                                    <TableCell>{tu.updated_at ? moment(tu.updated_at).locale("pt_BR").format("DD/MM/YYYY HH:mm") : "Sem registro"}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="small" component={renderLink} to={'/typesUser/' + tu.id}>
                                            <CreateIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(tu)}>
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
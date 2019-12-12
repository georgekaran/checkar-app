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
import { users as usersApi } from '../../main/api'
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
    const [users, setUsers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        usersApi.get().then((res) => {
            setUsers(res.data.content)
        });
    }, []);

    const handleDelete = (user) => {
        showConfirmDialog({
            title: 'Deletar',
            message: `Você gostaria de deletar o usuário ${user.name}?`,
            confirmLabel: 'Sim',
            cancelLabel: 'Não',
            confirmCallback: () => {
                usersApi.delete(user.id).then((res) => {
                    enqueueSnackbar('Usuário deletado com sucesso.', { variant: 'success' });
                    setUsers(users.filter(u => u.id !== user.id));
                }).catch(e => {
                    enqueueSnackbar('Erro ao deletar usuário.', { variant: 'error' });
                });
            }
        });
    }

    const handleActiveCheckBoxChange = (user) => {
        showConfirmDialog({
            title: 'Status',
            message: `Você gostaria de ${!user.active ? 'ativar' : 'desativar'} o usuário ${user.name}?`,
            confirmLabel: 'Sim',
            cancelLabel: 'Não',
            confirmCallback: () => {
                usersApi.updateActive(user.id).then((res) => {
                    enqueueSnackbar('Usuário alterado com sucesso.', { variant: 'success' });
                    const tempUsers = users.map(u => u.id === user.id ? { ...user, active: !user.active } : u);
                    setUsers(tempUsers);
                }).catch(e => {
                    enqueueSnackbar('Erro ao alterar status do usuário.', { variant: 'error' });
                });
            }
        });
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                        <Title>Usuários</Title>
                        <Fab color="primary" aria-label="add" size="small" component={renderLink} to={'/users/create'}>
                            <AddIcon />
                        </Fab>
                    </Box>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Último login</TableCell>
                                <TableCell>Ativo</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.lastLogin ? moment(user.lastLogin).locale("pt_BR").format("DD/MM/YYYY HH:mm") : "Sem registro"}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={user.active}
                                                  onChange={() => handleActiveCheckBoxChange(user)} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="small" component={renderLink} to={'/users/' + user.id}>
                                            <CreateIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(user)}>
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
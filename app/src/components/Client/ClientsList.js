import React, { useEffect, useState } from 'react';
import { makeStyles, lighten } from '@material-ui/core/styles';
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
import { useSnackbar } from 'notistack';
import renderLink from '../common/RouterLink';

import Title from '../common/Title';
import { clients } from '../../main/api'
import { useConfirmDialog } from '../common/ConfirmDialog/index'
import Checkbox from '@material-ui/core/Checkbox';

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
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
}));

export default function ClientsList() {

    const [items, setItems] = useState([])

    useEffect(() => {
        clients.list().then((res) => {
            setItems(res.data)
        })
    }, [])

    const classes = useStyles();

    const { showConfirmDialog } = useConfirmDialog();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = (id) => {
        showConfirmDialog({
            title: 'Deletar',
            message: `Você tem certeza que deseja deletar o cliente ${id}?`,
            confirmLabel: 'Sim',
            cancelLabel: 'Não',
            confirmCallback: () => {
                clients.delete(id).then(resp => {
                    enqueueSnackbar(`Cliente ${id} deletado com sucesso!`, { variant: 'success' });
                    setItems(items.filter(item => item.id !== id))
                }).catch(err => {
                    enqueueSnackbar(`Erro ao deletar cliente ${id}!`, { variant: 'error' });
                });
            }
        })
    }

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>

                    <Box display="flex" p={1} bgcolor="background.paper" justifyContent="space-between">
                        <Title>Clientes</Title>
                        <Box display="flex">
                            <Fab color="primary" aria-label="Adicionar cliente" size="small" component={renderLink} to={'/clients/create'}>
                                <AddIcon />
                            </Fab>
                        </Box>
                    </Box>

                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>País</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Cidade</TableCell>
                                <TableCell>Ativo</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.tradingName}</TableCell>
                                    <TableCell>{row.country}</TableCell>
                                    <TableCell>{row.district}</TableCell>
                                    <TableCell>{row.city}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={row.state}
                                                  disabled={true} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit" size="small" component={renderLink} to={'/clients/' + row.id}>
                                            <CreateIcon fontSize="inherit" />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="small" onClick={() => {handleDelete(row.id)}}>
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
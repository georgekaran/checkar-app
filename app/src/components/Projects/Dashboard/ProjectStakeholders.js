import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useSnackbar } from 'notistack';

import { useStateValue } from './ProjectProvider';
import { updateCounters } from './actions';

import ProjectStakeholdersForm from './ProjectStakeholdersForm'
import { stakeholders as stakeholdersApi, users as usersApi } from '../../../main/api';
import { useConfirmDialog } from '../../common/ConfirmDialog/index'
import Loading from '../../common/Loading';
import Title from '../../common/Title';

const useStyles = makeStyles((theme) => ({
  rootTable: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  papel: {
    marginTop: theme.spacing(4)
  },
  fab: {
    margin: theme.spacing(1),
  },
  formPaper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  }
}));

export default function ProjectStakeholders(props) {

  const project = props.project;
  const classes = useStyles();
  const { showConfirmDialog } = useConfirmDialog();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [users, setUsers] = React.useState([]);
  const [stakeholders, setStakeholders] = React.useState([]);

  const [id, setId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [role, setRole] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  const [creating, setCreating] = React.useState(false);

  React.useEffect(() => {
    if (project.id) {
      refreshStakeholders();
    }

  }, [project]);

  React.useEffect(() => {
    usersApi.list().then(resp => {
      const usersSelect = resp.data.content.map(user => {
        return { value: user.id, label: user.name }
      });
      setUsers(usersSelect);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter usuários', { variant: 'error' });
    });
  }, []);

  const [state, dispatch] = useStateValue();

  function refreshStakeholders() {
    setLoading(true);
    setStakeholders([]);


    stakeholdersApi.list(project.id).then((res) => {
      setStakeholders(res.data);
      setLoading(false);
      updateCounters(dispatch, state.id);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter stakeholders', { variant: 'error' });
    })
  }

  const handleEdit = (stakeholder) => {
    setId(stakeholder.id)
    setRole(stakeholder.role);
    setUser({ value: stakeholder.user_id, label: stakeholder.user_name })
    setOpen(true);
  };

  const handleCreate = () => {
    setId(null);
    setRole('');
    setUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {

    if (!creating && !user) {
      enqueueSnackbar(`Selecione um usuário!`, { variant: 'error' });
      return;
    }

    if (creating && (!name || !email)) {
      enqueueSnackbar(`Insira o nome e o e-mail!`, { variant: 'error' });
      return;
    }

    if (!role) {
      enqueueSnackbar(`Insira um papel!`, { variant: 'error' });
      return;
    }

    let stakeholder = {
      id: id,
      user_id: user ? user.value : null,
      project_id: project.id,
      role: role,
      name: name,
      email: email,
    }

    setLoading(true);
    setOpen(false);

    stakeholdersApi.save(id, stakeholder).then(resp => {
      enqueueSnackbar(`Usuário foi adicionado do projeto!`, { variant: 'success' });
      refreshStakeholders();
    }).catch(err => {
      enqueueSnackbar(`Erro ao adicionar usuário do projeto!`, { variant: 'error' });
    }).finally(() => {
      setLoading(false);
    });
  }

  const handleDelete = (stakeholder) => {
    showConfirmDialog({
      title: 'Deletar',
      message: `Você tem certeza que deseja remover ${stakeholder.user_name} do projeto?`,
      confirmLabel: 'Sim',
      cancelLabel: 'Não',
      confirmCallback: () => {
        stakeholdersApi.delete(stakeholder.id).then(resp => {
          enqueueSnackbar(`Usuário foi removido do projeto!`, { variant: 'success' });
          refreshStakeholders();
        }).catch(err => {
          enqueueSnackbar(`Erro ao remover usuário do projeto!`, { variant: 'error' });
        }).finally(() => {
          setLoading(false);
        });
      }
    });
  }

  const renderButtons = () => {
    if (id) {
      return null;
    }

    if (creating) {
      return <Button onClick={() => setCreating(false)}>Cancelar</Button>
    } else {
      return <Button onClick={() => setCreating(true)}>Criar Pessoa</Button>
    }
  }

  return (
    <React.Fragment>

      <ProjectStakeholdersForm users={users} project={project} />

      <Box display="flex" p={1} justifyContent="space-between">
        <Title>Pessoas Envolvidas</Title>

        <Box>
          <Fab color="primary" aria-label="add" size="small" className={classes.fab} onClick={refreshStakeholders}>
            <RefreshIcon />
          </Fab>

          <Fab color="primary" aria-label="add" size="small" onClick={handleCreate}>
            <AddIcon />
          </Fab>
        </Box>
      </Box>

      <Paper className={classes.rootTable}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Papel</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stakeholders.map(stakeholder => (
              <TableRow key={stakeholder.id}>
                <TableCell component="th" scope="row">{stakeholder.user_name}</TableCell>
                <TableCell>{stakeholder.role}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" size="small" onClick={() => handleEdit(stakeholder)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small" onClick={() => handleDelete(stakeholder)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!loading && stakeholders.length === 0 ?
              <TableRow>
                <TableCell colSpan="3" scope="row" align="center">Nenhuma pessoa vinculada</TableCell>
              </TableRow>
              : null}

            {loading ?
              <TableRow>
                <TableCell colSpan="3" scope="row" align="center"><Loading show={true} type="linear" /></TableCell>
              </TableRow>
              : null}


          </TableBody>
        </Table>
      </Paper>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">Adicionar Envolvido</DialogTitle>
        <DialogContent>

          {!creating ?

            (<Autocomplete
              options={users}
              getOptionLabel={option => option.label}
              value={user}
              onChange={(event, newValue) => {
                setUser(newValue);
              }}
              renderInput={params => (
                <TextField {...params} label="Nome" fullWidth />
              )}
            />)

            :

            (
              <React.Fragment>
                <TextField
                  label="Nome"
                  fullWidth
                  value={name}
                  onChange={(event, newValue) => {
                    setName(event.target.value);
                  }}
                  className={classes.papel} />

                <TextField
                  label="E-mail"
                  fullWidth
                  value={email}
                  onChange={(event, newValue) => {
                    setEmail(event.target.value);
                  }}
                  className={classes.papel} />
              </React.Fragment>
            )

          }

          <TextField
            label="Papel"
            fullWidth
            value={role}
            onChange={(event, newValue) => {
              setRole(event.target.value);
            }}
            className={classes.papel} />

        </DialogContent>
        <DialogActions>

          {renderButtons()}

          <Button onClick={handleSave} color="primary">
            { id ? 'Salvar' : 'Adicionar'}
          </Button>

        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}

import React from 'react';

import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useSnackbar } from 'notistack';
import { useStateValue } from './ProjectProvider';
import { updateCounters } from './actions';

import { tasks as tasksApi } from '../../../main/api';
import ProjectTaskForm from './ProjectTaskForm';
import { taskStatus } from '../../../consts';
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
  root: {
    flexGrow: 1,
    height: 250,
    minWidth: 290,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  fab: {
    margin: theme.spacing(1),
  }
}));

export default function ProjectTasks(props) {

  const projectId = props.projectId;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [taskId, setTaskId] = React.useState(null);
  
  const [state, dispatch] = useStateValue();

  React.useEffect(() => {
    refreshTasks();
  }, []);

  function refreshTasks() {
    setLoading(true);
    setTasks([]);
    tasksApi.list(projectId).then((res) => {
      setTasks(res.data);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter tarefas', { variant: 'error' });
    }).finally(() => {
      setLoading(false);
    })
  }

  const handleClickOpen = (task) => {
    setTaskId(task.id);
    setOpen(true);
  };

  const handleClose = (update) => {
    if (update) {
      refreshTasks();
      updateCounters(dispatch, state.id)
    }
    setOpen(false);
  };

  const translateState = state => {
    let status = taskStatus.find(ts => ts.value === state);
    if (status) {
      return status.label;
    } else {
      return '-';
    }
  }

  return (
    <React.Fragment>

      <Box display="flex" p={1} justifyContent="space-between">
        <Title>Atividades</Title>

        <Box>
          <Fab color="primary" aria-label="add" size="small" className={classes.fab} onClick={refreshTasks}>
            <RefreshIcon />
          </Fab>
          <Fab color="primary" aria-label="add" size="small" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Box>

      </Box>

      <Paper className={classes.rootTable}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nº</TableCell>
              <TableCell>Atividade</TableCell>
              <TableCell>Responsável</TableCell>
              <TableCell>Data de Início</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell component="th" scope="row">{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.responsable}</TableCell>
                <TableCell>{task.start_date}</TableCell>
                <TableCell>{translateState(task.status)}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" size="small" onClick={() => handleClickOpen(task)}>
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!loading && tasks.length === 0 ?
              <TableRow>
                <TableCell colSpan="6" scope="row" align="center">Nenhuma tarefa cadastrada</TableCell>
              </TableRow>
              : null}

            {loading ?
              <TableRow>
                <TableCell colSpan="6" scope="row" align="center"><Loading show={true} type="linear" /></TableCell>
              </TableRow>
              : null}

          </TableBody>
        </Table>
      </Paper>

      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="form-dialog-title">

        <ProjectTaskForm projectId={projectId} taskId={taskId} handleClose={handleClose} />

      </Dialog>

    </React.Fragment>
  );
}

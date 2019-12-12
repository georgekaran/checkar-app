import React from 'react';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useSnackbar } from 'notistack';

import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Loading from '../../common/Loading';
import { taskStatus } from '../../../consts';
import { tasks as tasksApi, users as usersApi } from '../../../main/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  dialog: {
    height: '360px'
  }
}));

export default function ProjectTaskForm(props) {

  const taskId = props.taskId;

  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);

  const [users, setUsers] = React.useState([]);
  const [task, setTask] = React.useState({
    name: '',
    description: '',
    estimated_time: '',
    project_id: props.projectId
  });

  const [status, setStatus] = React.useState(null);
  const [responsable, setResponsable] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);

  React.useEffect(() => {

    if (taskId) {
      setLoading(true);
      tasksApi.get(taskId).then(res => {
        setTask({
          name: res.data.name,
          description: res.data.description,
          estimated_time: res.data.estimatedTime ? res.data.estimatedTime : '',
          responsable_id: res.data.responsable ? res.data.responsable.id : null,
          status: res.data.status,
          start_date: res.data.startDate
        });
        setStartDate(res.data.startDate ? new Date(res.data.startDate.split('/').reverse().join('-')) : null);
        setStatus(taskStatus.find(ts => ts.value === res.data.status));
        setResponsable(res.data.responsable ? { value: res.data.responsable.id, label: res.data.responsable.name } : null);
        setLoading(false);
      });
    }

    usersApi.list().then(resp => {
      const usersSelect = resp.data.content.map(user => {
        return { value: user.id, label: user.name }
      });
      setUsers(usersSelect);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter usuários', { variant: 'error' });
    })

  }, [taskId, enqueueSnackbar]);

  const handleChange = (field, event) => {

    let newValue = null;

    if (event.target) {
      newValue = event.target.value;
    } else {
      newValue = event.value;
    }

    let tempTask = Object.assign({}, task);
    tempTask[field] = newValue;
    setTask(tempTask);
  };

  const onClose = (update) => {
    if (props.handleClose && typeof props.handleClose === 'function') {
      props.handleClose(update);
    }
  }

  const handleSave = () => {
    tasksApi.save(taskId, task).then(res => {
      enqueueSnackbar('Tarefa salva com sucesso!', { variant: 'success' });
      onClose(true);
    }).catch(() => {
      enqueueSnackbar('Falha ao salvar tarefa!', { variant: 'error' });
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave();
  }

  const handleCancel = () => {
    onClose();
  }


  return (
    <React.Fragment>
      <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>
        <DialogTitle id="form-dialog-title">{taskId ? `Editando Atividade Nº ${taskId}` : 'Adicionar Atividade'}</DialogTitle>
        <DialogContent className={classes.dialog}>
          
          <Loading show={loading} type="linear" />

          <div style={{ flexGrow: 1 }}>

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  label="Atividade"
                  fullWidth
                  value={task.name}
                  onChange={(e) => handleChange('name', e)}/>
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  options={users}
                  getOptionLabel={option => option.label}
                  value={responsable}
                  onChange={(event, newValue) => {
                    setResponsable(newValue);
                    setTask({
                      ...task,
                      responsable_id: newValue ? newValue.value : null
                    });
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Responsável" fullWidth />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Autocomplete
                  options={taskStatus}
                  getOptionLabel={option => option.label}
                  value={status}
                  onChange={(event, newValue) => {
                    setStatus(newValue);
                    setTask({
                      ...task,
                      status: newValue ? newValue.value : null
                    });
                  }}
                  renderInput={params => (
                    <TextField {...params} label="Status" fullWidth />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker

                    disableToolbar
                    variant="inline"

                    label="Data de previsão de término"
                    format="DD/MM/YYYY"
                    fullWidth
                    value={startDate}
                    onChange={(event, newValue) => {
                      setStartDate(event);
                      setTask({
                        ...task,
                        start_date: newValue.split('/').reverse().join('-')
                      });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Horas previstas"
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>,
                  }}
                  value={task.estimated_time}
                  onChange={(e) => handleChange('estimated_time', e)} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Descrição"
                  fullWidth
                  multiline
                  rows="5"
                  className={classes.textField}
                  value={task.description}
                  onChange={(e) => handleChange('description', e)}
                />
              </Grid>

            </Grid>
          </div>
        </DialogContent>
        <DialogActions>

          <Button
            type="button"
            variant="contained"
            size="small"
            onClick={handleCancel}
            className={classes.button}>Cancelar</Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}>Salvar</Button>

        </DialogActions>
      </form>
    </React.Fragment >
  );
}

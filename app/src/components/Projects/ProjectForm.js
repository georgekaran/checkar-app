import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SaveIcon from "@material-ui/icons/Save";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { clients as clientsApi, projects as projectApi } from "../../main/api";
import { projectStatus } from '../../consts';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  }
}));

export default function ProjectForm(props) {

  const project = props.project;

  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState([]);

  const [state, setState] = React.useState({
    name: '',
    description: '',
    status: null,
    client: null,
    contractedHours: '',
    deadline: null,
    contract_signature_date: null,
    kick_off_meeting_date: null,
    start_date: null,
  });

  React.useEffect(() => {
    getClients();
  }, []);

  React.useEffect(() => {
    if (project && project.id) {
      setState({
        ...state,
        name: project.name,
        description: project.description !== null ? project.description : '',
        status: projectStatus.find(ts => ts.value == project.status),
        client: project.client ? clients.find(cl => cl.value == project.client.id) : null,
        contractedHours: project.contractedHours !== null ? project.contractedHours : '',
        deadline: stringToDate(project.deadline),
        contract_signature_date: stringToDate(project.contract_signature_date),
        kick_off_meeting_date: stringToDate(project.kick_off_meeting_date),
        start_date: stringToDate(project.start_date),
      });
    }
  }, [project]);

  function stringToDate(string)   {
    return string ? new Date(string.split('/').reverse().join('-')) : null
  }

  function getClients() {
    clientsApi.list().then(resp => {
      const clientsSelect = resp.data.map(client => {
        return { value: client.id, label: client.tradingName }
      });
      setClients(clientsSelect)
    })
  }

  const handleSave = () => {
    setLoading(true);

    let data = {
      name: state.name,
      description: state.description,
      status: state.status ? state.status.value : null,
      client_id: state.client ? state.client.value : null,
      contracted_hours: state.contractedHours,
      deadline: state.deadline,
      contract_signature_date: state.contract_signature_date,
      kick_off_meeting_date: state.kick_off_meeting_date,
      start_date: state.start_date,
    }

    let id = project ? project.id : undefined;

    projectApi.save(id, data).then(res => {
      if (!project) {
        history.push(`/projects/${res.data.id}`);
      } else {
        if (props.onSave && typeof props.onSave === 'function') {
          props.onSave(res.data);
        }
      }
      enqueueSnackbar('Projeto salvo com sucesso!', { variant: 'success' });
    }).catch(() => {
      enqueueSnackbar('Falha ao salvar projeto!', { variant: 'error' });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Paper className={classes.paper}>

      <Loading show={loading} type="linear" />

      <Grid container spacing={3}>

        <Grid item xs={6}>
          <Autocomplete
            options={clients}
            getOptionLabel={option => option.label}
            value={state.client}
            onChange={(e, newValue) => setState({ ...state, client: newValue })}
            renderInput={params => (<TextField {...params} label="Cliente" fullWidth />)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Nome do Projeto"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            fullWidth />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={projectStatus}
            getOptionLabel={option => option.label}
            value={state.status}
            onChange={(e, newValue) => setState({ ...state, status: newValue })}
            renderInput={params => (<TextField {...params} label="Status" fullWidth />)}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Horas Contratadas"
            fullWidth
            value={state.contractedHours}
            onChange={(e) => setState({ ...state, contractedHours: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start"><AccessTimeIcon /></InputAdornment>,
            }} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Descrição"
            fullWidth
            multiline
            rows="5"
            value={state.description}
            onChange={(e) => setState({ ...state, description: e.target.value })}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              label="Data de Assinatura de Contrato"
              format="DD/MM/YYYY"
              value={state.contract_signature_date}
              onChange={(e, newValue) => setState({ ...state, contract_signature_date: newValue.split('/').reverse().join('-') })}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              label="Data reunião de kickoff"
              format="DD/MM/YYYY"
              value={state.kick_off_meeting_date}
              onChange={(e, newValue) => setState({ ...state, kick_off_meeting_date: newValue.split('/').reverse().join('-') })}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              label="Data de início"
              format="DD/MM/YYYY"
              value={state.start_date}
              onChange={(e, newValue) => setState({ ...state, start_date: newValue.split('/').reverse().join('-') })}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={6}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              label="Data de entrega"
              format="DD/MM/YYYY"
              value={state.deadline}
              onChange={(e, newValue) => setState({ ...state, deadline: newValue.split('/').reverse().join('-') })}
              fullWidth
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>

      </Grid>


      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSave}
          disabled={loading}
          startIcon={<SaveIcon />}>Salvar</Button>
      </Box>

    </Paper>
  );
}


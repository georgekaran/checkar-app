import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { useSnackbar } from 'notistack';

import { projects as projectsApi } from '../../../main/api';
import Loading from '../../common/Loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  }
}));

export default function ProjectStakeholdersForm(props) {

  const users = props.users;
  const project = props.project;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);

  const [state, setState] = React.useState({
    manager: null,
    sponsor: null,
  });


  React.useEffect(() => {
    if (project.id) {
      let state = {
        sponsor: null,
        manager: null,
      }

      if (project.sponsor) {
        state.sponsor = ({ value: project.sponsor.id, label: project.sponsor.name });
      }

      if (project.manager) {
        state.manager = ({ value: project.manager.id, label: project.manager.name });
      }

      setState(state);
    }
  }, [project]);

  const handleSave = () => {

    setLoading(true);

    let data = {
      sponsor_id: state.sponsor ? state.sponsor.value : null,
      manager_id: state.manager ? state.manager.value : null,
    }

    projectsApi.updateUsers(project.id, data).then(resp => {
      enqueueSnackbar(`Usuário atualizados!`, { variant: 'success' });
    }).catch(err => {
      enqueueSnackbar(`Erro ao atualizar os usuário!`, { variant: 'error' });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Paper className={classes.paper}>

      <Loading show={loading} type="linear" m={2} />

      <Autocomplete
        options={users}
        getOptionLabel={option => option.label}
        value={state.manager}
        onChange={(event, newValue) => {
          setState({ ...state, manager: newValue });
        }}
        renderInput={params => (
          <TextField {...params} label="Gerente de Projeto" fullWidth />
        )}
      />

      <Autocomplete
        style={{ marginTop: '12px' }}
        options={users}
        getOptionLabel={option => option.label}
        value={state.sponsor}
        onChange={(event, newValue) => {
          setState({ ...state, sponsor: newValue });
        }}
        renderInput={params => (
          <TextField {...params} label="Patrocinador" fullWidth />
        )}
      />

      <Box display="flex" mt={2} justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSave}
          startIcon={<SaveIcon />}>Salvar</Button>
      </Box>


    </Paper>
  );
}

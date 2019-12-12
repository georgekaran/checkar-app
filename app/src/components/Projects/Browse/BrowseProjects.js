import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import { useSnackbar } from 'notistack';

import renderLink from '../../common/RouterLink';
import ProjectBox from './ProjectBox';
import { projects as projectsApi } from '../../../main/api'
import { projectStatus } from '../../../consts';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paperSearch: {
    padding: theme.spacing(2),
  },
  searchGrid: {
    justifyContent: 'center',
    marginBottom: theme.spacing(4)
  },
  gridAdd: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: 'auto'
  }
}));

export default function BrowseProjects() {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = React.useState([]);
  const [filteredProjects, setFilteredProjects] = React.useState([]);

  const [search, setSearch] = React.useState(null);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    projectsApi.list().then((res) => {
      setProjects(res.data);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter projetos', { variant: 'error' });
    })
  }, [enqueueSnackbar]);

  React.useEffect(() => {
    if ((search === null || search === '') && status == null) {
      setFilteredProjects(projects);
      return;
    }

    setFilteredProjects(projects.filter((project) => {
      let cdnName = search ? (project.name.toLowerCase()).indexOf(search.toLowerCase()) >= 0 : true;
      let cdnStatus = status ? project.status == status.value : true;
      return cdnName && cdnStatus;
    }));

  }, [search, projects, status]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Container maxWidth="xl" className={classes.container}>

      <Grid container spacing={2} className={classes.searchGrid}>
        <Grid item xs={7}>
          <Paper className={classes.paperSearch}>
            <TextField
              className={classes.margin}
              label="Buscar Projeto"
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paperSearch}>
            <Autocomplete
              options={projectStatus}
              getOptionLabel={option => option.label}
              value={status}
              onChange={(e, newValue) => setStatus(newValue)}
              renderInput={params => (<TextField {...params} label="Status" fullWidth />)}
            />
          </Paper>
        </Grid>
        <Grid item xs={1} className={classes.gridAdd}>
          <Fab color="primary" aria-label="Adicionar projeto" title="Adicionar projeto" component={renderLink} to={'/projects/create'}>
            <AddIcon fontSize="large" />
          </Fab>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredProjects.map(project => (
          <ProjectBox key={project.id} {...project} />
        ))}
      </Grid>

      {filteredProjects.length === 0 ? <Typography variant="h5" display="block" align="center">Nenhum projeto encontrado!</Typography> : null}

    </Container>
  );
}
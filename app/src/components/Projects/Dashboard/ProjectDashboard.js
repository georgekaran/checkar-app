import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useSnackbar } from 'notistack';

import { useStateValue } from './ProjectProvider';

import TabPanel from '../../common/TabPanel';
import ProjectTasks from './ProjectTasks';
import ProjectOverview from './ProjectOverview';
import ProjectStakeholders from './ProjectStakeholders';
import { projects as projectsApi } from '../../../main/api';
import routerLink from '../../common/RouterLink';

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[0],
    marginBottom: theme.spacing(2)
  }
}));

export default function ProjectDashboard(props) {

  const [{ id }, dispatch] = useStateValue();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [project, setProject] = React.useState([]);

  React.useEffect(() => {
    projectsApi.get(id).then((res) => {
      setProject(res.data);
    }).catch(() => {
      enqueueSnackbar('Falha ao obter projeto', { variant: 'error' });
    })
  }, [id, enqueueSnackbar]);

  return (

    <Container maxWidth="xl" className={classes.container}>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <div>
          <Typography variant="h4" component="h1" display="inline">
            {project.name}
          </Typography>

          <Typography variant="subtitle1" display="inline" style={{ marginLeft: 8 }}>
            Cliente: {project.client ? project.client.tradingName : null}
          </Typography>
        </div>

        <Fab color="primary" aria-label="add" size="small" component={routerLink} to={'/projects'}>
          <ArrowBackIcon />
        </Fab>
      </Box>

      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Informações" {...a11yProps(0)} />
          <Tab label="Envolvidos"  {...a11yProps(1)} />
          <Tab label="Atividades"  {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <ProjectOverview project={project} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ProjectStakeholders project={project} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ProjectTasks projectId={id} />
      </TabPanel>

    </Container>

  );
}
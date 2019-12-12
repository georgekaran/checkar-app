import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from "@material-ui/icons/Send";
import { Divider } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import { projects as projectsApi } from '../../../main/api';
import { useStateValue } from './ProjectProvider';
import { projectStatus } from '../../../consts';
import ProjectForm from '../ProjectForm';
import Title from '../../common/Title';
import Loading from '../../common/Loading';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  paperNumber: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100%'
  },
  small: {
    fontSize: '1.5rem',
    color: theme.palette.grey['400']
  },
  divider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
}));

export default function ProjectOverview(props) {
  const classes = useStyles();
  const project = props.project;

  const { enqueueSnackbar } = useSnackbar();
  const [{ counters }, dispatch] = useStateValue();
  const [status, setStatus] = React.useState(props.project.status);
  const [welcomeEmailSendDate, setWelcomeEmailSendDate] = React.useState(props.project.welcomeEmailSendDate);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setStatus(props.project.status);
    setWelcomeEmailSendDate(props.project.welcomeEmailSendDate);
  }, [props.project]);

  const projectStatusDescription = () => {
    let s = projectStatus.find(ts => ts.value == status);
    return s ? s.label : '-';
  }

  const sendEmail = () => {
    setLoading(true);
    projectsApi.sendWellcomeEmail(props.project.id).then(() => {
      setWelcomeEmailSendDate(new Date());
      enqueueSnackbar('O e-mail foi enviado para a sua caixa postal', { variant: 'success' });
    }).catch(() => {
      enqueueSnackbar('Falha ao enviar e-mail de boas vindas', { variant: 'error' });
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paperNumber}>
            <Typography variant="caption" display="block" gutterBottom>
              Status
              </Typography>
            <Typography variant="h4" gutterBottom>{projectStatusDescription()}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Paper className={classes.paperNumber}>
            <Typography variant="h3" gutterBottom>{ counters.people }</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Pessoas Envolvidas
              </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Paper className={classes.paperNumber}>
            <Typography variant="h3" gutterBottom>{ counters.done }<span className={classes.small}>/{ counters.total }</span></Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Atividades Concluídas
              </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <Paper className={classes.paperNumber}>
            <Typography variant="h3" gutterBottom>{ counters.late }</Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Atividade em Atraso
              </Typography>
          </Paper>
        </Grid>
      </Grid>

      <ProjectForm project={project} onSave={(p) => setStatus(p.status)} />

      <Divider className={classes.divider} />

      <Title>E-mail Inicial</Title>

      <Paper className={classes.paper}>

        <Loading show={loading} type="linear" />

        <Box display="flex" justifyContent="space-between">

          <Typography variant="body1" gutterBottom>{welcomeEmailSendDate ? `E-mail enviado às ${welcomeEmailSendDate}` : 'E-mail não enviado' }</Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            onClick={sendEmail}
            className={classes.button}
            startIcon={<SendIcon />}>{welcomeEmailSendDate ? 'Enviar Novamente' : 'Enviar Agora' }</Button>
        </Box>
      </Paper>


    </React.Fragment>
  );
}
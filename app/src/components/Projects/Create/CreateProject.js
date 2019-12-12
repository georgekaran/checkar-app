import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ProjectForm from '../ProjectForm';
import routerLink from '../../common/RouterLink';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function CreateProject(props) {

  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.container}>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" component="h1" display="inline">
          Novo Projeto
        </Typography>

        <Fab color="primary" aria-label="add" size="small" component={routerLink} to={'/projects'}>
          <ArrowBackIcon />
        </Fab>

      </Box>

      <ProjectForm title="Novo Projeto" />

    </Container>
  );
}
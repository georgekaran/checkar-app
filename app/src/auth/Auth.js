import React from 'react';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import LoginForm from './LoginForm'
import SignInForm from './SignInForm'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  imageWrapper: {
    display: 'flex'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Auth() {

  const [signIn, setSignIn] = React.useState(false)
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} lg={9} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} lg={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
        <img alt="App Icon" src="./images/logo_transparent.png" width="300" height="150" />
          <Typography component="h1" variant="h5">{signIn ? 'Criar conta' : 'Acessar'}</Typography>

          {signIn ? <SignInForm /> : <LoginForm />}

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={() => { setSignIn(!signIn) }}>
                {signIn ? 'Já possuo conta' : 'Não possui conta? Criar agora'}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Typography variant="body2" color="textSecondary" align="center">
              {'Versão: 1.0'}
            </Typography>
          </Box>


        </div>
      </Grid>
    </Grid>
  )


}

export default Auth;
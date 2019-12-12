import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  div: {
    display: 'flex',
    justifyContent: 'center'
  },
  margin: {
    marginBottom: theme.spacing(2),
  }
}));

export default function Loading(props) {

  const classes = useStyles();

  if (!props.show) {
    return null;
  }

  if (props.type && props.type === 'linear') {
    return (
      <div className={classes.margin}>
        <LinearProgress />
      </div>
    );
  } else {
    return (
      <div className={classes.div}>
        <CircularProgress />
      </div>
    );
  }

}

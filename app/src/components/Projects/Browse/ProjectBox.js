import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import { useHistory } from "react-router-dom";

import { projectStatus } from '../../../consts';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    justifyContent: 'space-between'
  },
  media: {
    height: 120,
    backgroundColor: theme.palette.grey['800'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: theme.typography.h2.fontSize
  }
}));


export default function ProjectBox(props) {

  const classes = useStyles();
  const history = useHistory();

  const projectStatusDescription = () => {
    let status = projectStatus.find(ts => ts.value == props.status);
    return status ? status.label : '-'
  }

  const goToProject = () => {
    history.push(`/projects/${props.id}`);
  }

  return (
    <Grid item key={props.card} xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardActionArea onClick={goToProject}>
          <div className={classes.media}>
            <Icon className={classes.icon}>business</Icon>
          </div>
        </CardActionArea>

        <CardContent className={classes.cardContent}>

          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Cliente: {props.client}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Gerente: {props.manager}
          </Typography>

        </CardContent>

        <CardActions className={classes.cardActions}>

          <Chip
            label={projectStatusDescription()}
            clickable
            // color="primary"
            variant="outlined"
          />

          <Button size="small" color="primary" onClick={goToProject}>Acessar</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
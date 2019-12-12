import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Title from './Title';

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function BasicPage(props) {

    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {props.title ? <Title>{props.title}</Title> : null}
                    {props.children}
                </Paper>
            </Grid>
        </Container>
    );
}
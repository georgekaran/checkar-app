import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DoneIcon from '@material-ui/icons/Done';

import CardBox from "./common/CardBox";
import Title from './common/Title';
import {profile, projects, tasks} from "../main/api";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    paper: {
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
    infoBox: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    image: {
        backgroundImage: 'url(empty.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: '100px'
    },
    colorGreen: {
        color: '#2ecf2b'
    },
    colorBlue: {
        color: '#006fff'
    }
}));

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [cardsInfo, setCardsInfo] = useState({
        delayed: 0,
        notDelayed: 0,
        newProjectsThisWeek: 0,
        tasksDoneThisWeek: 0
    });
    const [lastActivities, setLastActivities] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetchHomeInfo();
    }, []);

    function fetchHomeInfo() {
        // profile.get().then(resp => {
        //     setCurrentUser(resp.data)
        // });
        // tasks.listFinished().then(resp => {
        //     setLastActivities(resp.data)
        // });
        // projects.countNotDelayed().then(resp => {
        //     console.log(resp);
        //     setCardsInfo({ ...cardsInfo, notDelayed: resp.data })
        // });
        // projects.countDelayed().then(resp => {
        //     console.log(resp);
        //     setCardsInfo({ ...cardsInfo, delayed: resp.data })
        // });
    }

    return (
        <div className="Home">
            <Title>Olá {currentUser && currentUser.name}</Title>
            <Typography component="h4" variant="subtitle1" color="textSecondary" gutterBottom>
                Aqui está um breve resumo do que está acontencendo com seus projetos
            </Typography>
            <Grid className={classes.infoBox} container spacing={3}>
                <CardBox subtitle="Projetos em andamento"
                         title={cardsInfo.notDelayed}
                         icon={<SentimentSatisfiedAltIcon fontSize="large" color="primary" />}/>

                <CardBox subtitle="Projetos em atraso"
                         title={cardsInfo.delayed}
                         icon={<SentimentVeryDissatisfiedIcon fontSize="large" color="error" />}/>

                <CardBox subtitle="Novos projetos na semana"
                         title={cardsInfo.newProjectsThisWeek}
                         icon={<TrendingUpIcon fontSize="large"
                                               className={classes.colorGreen} />}/>

                <CardBox subtitle="Atividades concluídas na semana"
                         title={cardsInfo.tasksDoneThisWeek}
                         icon={<DoneIcon fontSize="large"
                                               className={classes.colorBlue} />}/>

            </Grid>

            <Title>Últimas atividades finalizadas</Title>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Projeto</TableCell>
                                <TableCell>Responsável</TableCell>
                                <TableCell>Finalizado em</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lastActivities.length !== 0 ? lastActivities.map(task => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.project.name}</TableCell>
                                        <TableCell>
                                            {task.responsable.name}
                                        </TableCell>
                                        <TableCell>{moment(task.endDate).format("DD/MM/YYYY")}</TableCell>
                                    </TableRow>
                                )) :
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Grid container spacing={1} justify="center">
                                            <Grid item sm={2} className={classes.image} />
                                            <Typography component="h4" variant="subtitle1" color="textPrimary" style={{ margin: 'auto 0' }}>
                                                Sem dados por aqui.
                                            </Typography>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    );
}

export default Home;

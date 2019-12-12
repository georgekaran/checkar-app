import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

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
    }
}));

export default function CardBox({   title = '',
                                    subtitle = '',
                                    gridXs = 12,
                                    gridSm = 4,
                                    gridMd = 3,
                                    titleProps = {},
                                    subtitleProps = {},
                                    icon = undefined
                                }) {
    const classes = useStyles();

    return (
        <Grid item xs={gridXs} sm={gridSm} md={gridMd}>
            <Paper className={classes.paper}>
                <Typography variant="h3" gutterBottom {...titleProps}>
                    {title} {icon}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom {...subtitleProps}>
                    {subtitle}
                </Typography>
            </Paper>
        </Grid>
    )
}

CardBox.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    gridXs: PropTypes.number,
    gridSm: PropTypes.number,
    gridMd: PropTypes.number,
    titleProps: PropTypes.object,
    subtitleProps: PropTypes.object,
};
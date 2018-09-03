import React from "react";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const CustomPaper = ({ children, title, classes, ...props }) => (
    <div>
        <Paper className={classes.root} elevation={1}>
            <Paper className={classes.header}> 
                <Typography variant="title" className={classes.title}>
                    { title }
                </Typography>
            </Paper>
            { children }
        </Paper>
    </div>
)


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 30,
        padding: '0 20px 20px 20px'
    },

    header: {
        background: '#5cb860',
        margin: '-20px 0 20px 0'
    },

    title: {
        padding: 15,
        color: '#fff'
    }
}

export default withStyles(styles)(CustomPaper);
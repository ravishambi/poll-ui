import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button';
import { Route } from 'react-router-dom'
import CreatePoll from '../Poll/CreatePoll'
import history from '../History'
import Polls from '../Poll/Polls'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        height : "100%"
    },
    button: {
        width: '10%',
        height : "40px",
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: theme.spacing(5)
    }
}));

const createPollHandler = () => {
    history.push("/createPoll");
}

const Home = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.container}>
                
                <Polls></Polls>

                <Button className={classes.button} 
                variant="contained"
                color="primary"
                onClick={()=>createPollHandler()}
                >Create Poll
                </Button>

            </Paper>

            <Route path="/createPoll" exact component={ CreatePoll }/>

            
            
        </div>
    )
}

export default Home

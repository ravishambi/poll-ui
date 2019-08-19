import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(25),
        marginRight: theme.spacing(25),
        width: '100%',
        textAlgin: 'center'
    },
    paper: {
        width: '50%',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '10px'
    },
    login: {
        width: '100%',
        textAlign: 'center',
        color: '#3f51b5',
        padding: '15px'

    },
    button: {
        width: '20%',
        position: 'relative',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
        marginLeft: theme.spacing(35)

    }
}));

function Login(props) {

    const classes = useStyles();

    let username = (<TextField
    required
    id="usernameOrEmail"
    label="Username or Email"
    value={props.username}
    className={classes.textField}
    margin="normal"
    style={{ width: '400px' }}
    onChange={(e)=>props.usernameChanged(e)}
/>);
    if (props.username === '' && props.visited) {
        username = (<TextField
            required
            error
            id="usernameOrEmail"
            label="Username or Email"
            value={props.username}
            className={classes.textField}
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e) => props.usernameChanged(e)}
        />);
    } 

    let password = (<TextField
        required
        id="password"
        label="Password"
        value={props.password}
        className={classes.textField}
        type="password"
        autoComplete=""
        margin="normal"
        style={{ width: '400px' }}
        onChange={(e) => props.passwordChanged(e)}
    />);

    if(props.password === '' && props.visited){
        password = (<TextField
            required
            error
            id="password"
            label="Password"
            value={props.password}
            className={classes.textField}
            type="password"
            autoComplete=""
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e) => props.passwordChanged(e)}
        />);
    }
        
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <form className={classes.container} >
                    <Typography variant="h4" className={classes.login}>
                        Login
                    </Typography>
                    { username }
                    { password }
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => props.clicked()}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Fragment>
    )

}

export default Login

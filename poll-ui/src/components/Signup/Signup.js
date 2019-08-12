import React, { Component, Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
//import SignupModal from './SignupModal'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: '25%',
        marginRight: '25%',
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
        marginTop: '5%',
        marginBottom: '10%',
        marginLeft: '15%',
        marginRight: '15%'

    }
});

class Signup extends Component {
    state = {
        name : {
            visited : false,
            value : '',
            error : ''
        },
        username : {
            visited : false,
            value : '',
            error : ''
        },
        email : {
            visited : false,
            value : '',
            error : ''
        },
        password : {
            visited : false,
            value : '',
            error : ''
        }
    }

    submitHandler = () => {
        let data = {};
        data.name = this.state.name.value;
        data.username = this.state.username.value;
        data.email = this.state.email.value;
        data.password = this.state.password.value;

        Axios.post('http://localhost:6541/api/auth/signup', data)
            .then(result => {
                alert(result.data);
            })
            .catch(err => {
                console.log(err);
                if(err.response !== null && err.response !== 'undefined'){
                    const errors = err.response.data.errors;
                    let updatedState = this.state;
                    for(let error in errors){
                        let tempError = errors[error];
                        let fieldValues = updatedState[tempError.field];
                        fieldValues.error = tempError.defaultMessage;
                    }
                    this.setState(updatedState);
                }
            });

    }

    cancelHandler = () => {

    }

    nameChanged = (e) => {
        this.setState({
            name : {
                value : e.target.value,
                visited : true
            }
        });
    }

    usernameChanged = (e) => {
        this.setState({
            username : {
                value : e.target.value,
                visited : true
            }
        });
    }

    passwordChanged = (e) => {
        this.setState({
            password : {
                value : e.target.value,
                visited : true
            }
        });
    }

    emailChanged = (e) => {
        this.setState({
            email : {
                value : e.target.value,
                visited : true
            }
        });
    }

    render() {
        const { classes } = this.props;

        let name = (<TextField
            required
            id="name"
            label="Name"
            value={this.state.name.value}
            className={classes.textField}
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e)=>this.nameChanged(e)}
        />);

        if(this.state.name.error !== ''){
            name = (<TextField
                required
                error
                id="name"
                label="Name"
                value={this.state.name.value}
                className={classes.textField}
                helperText={this.state.name.error}
                margin="normal"
                style={{ width: '400px' }}
                onChange={(e)=>this.nameChanged(e)}
            />);
        }

        let username = (<TextField
            required
            id="username"
            label="Username"
            value={this.state.username.value}
            className={classes.textField}
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e)=>this.usernameChanged(e)}
        />);

        if(this.state.username.error !== ''){
            username = (<TextField
                required
                error
                id="username"
                label="Username"
                value={this.state.username.value}
                className={classes.textField}
                helperText={this.state.username.error}
                margin="normal"
                style={{ width: '400px' }}
                onChange={(e)=>this.usernameChanged(e)}
            />);
        }

        let email = (<TextField
            required
            id="email"
            label="Email"
            value={this.state.email.value}
            className={classes.textField}
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e)=>this.emailChanged(e)}
        />);

        if(this.state.email.error !== ''){
            email = (<TextField
                required
                error
                id="email"
                label="Email"
                value={this.state.email.value}
                className={classes.textField}
                helperText={this.state.email.error}
                margin="normal"
                style={{ width: '400px' }}
                onChange={(e)=>this.emailChanged(e)}
            />);
        }

        let password = (<TextField
            required
            id="password"
            label="Password"
            value={this.state.password.value}
            className={classes.textField}
            margin="normal"
            style={{ width: '400px' }}
            onChange={(e)=>this.passwordChanged(e)}
        />);

        if(this.state.password.error !== ''){
            password = (<TextField
                required
                error
                id="password"
                label="Password"
                value={this.state.password.value}
                className={classes.textField}
                helperText={this.state.password.error}
                margin="normal"
                style={{ width: '400px' }}
                onChange={(e)=>this.passwordChanged(e)}
            />);
        }
        
        return (
            
            <Fragment>
                <Paper className={classes.paper}>
                <form className={classes.container} autoComplete={false}>
                    <Typography variant="h4" className={classes.login}>
                        Register
                    </Typography>
                    { name }
                    { username }
                    { email }
                    { password }
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.submitHandler()}>
                        Submit
                    </Button>
                    <Button variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => this.cancelHandler()}>
                        Cancel
                    </Button>
                </form>
                </Paper>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Signup);

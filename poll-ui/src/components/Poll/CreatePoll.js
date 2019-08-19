import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import PollChoice from './PollChoice'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography'
import Axios from 'axios';

const initialState = {
    "question": "",
    "choices": [{
        "choice": ""
    },
    {
        "choice": ""
    }
    ],
    "pollLength": {
        "days": 1,
        "hours": 0
    }
}

const styles = theme => ({
    conatiner: {
        display: "flex",
        flexWrap: "wrap"
    },
    title: {
        width: '100%',
        textAlgin: 'center',
        marginLeft: "40%",
        marginRight: "50%"
    },
    textField: {
        marginLeft: "25%",
        marginRight: "25%",
        width: '100%',
        textAlgin: 'center'
    },
    choice: {
        width: "40%",
        marginLeft: "25%",
        marginBottom: "10px"
    }
    ,
    choiceButton: {
        width: "15%",
        marginLeft: "25%",
        marginBottom: "10px"
    },
    formControl: {
        marginLeft: "25%",
        minWidth: 120,
        marginBottom: "10px"
    },
    formControlSecond: {
        marginLeft: "10%",
        minWidth: 120,
        marginBottom: "10px"
    },
    submitButton: {
        width: "40%",
        marginLeft: "25%",
        marginBottom: "25px"
    }
});


class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    questionChangedHandler = (e) => {
        this.setState({
            "question": e.target.value
        });
    }

    addChoiceHandler = () => {
        const choices = this.state.choices.slice();
        this.setState({
            choices: choices.concat([{
                choice: ""
            }])
        });


    }

    removeChoice = (index) => {
        const choices = this.state.choices.slice();
        this.setState({
            choices: [...choices.slice(0, index), ...choices.slice(index + 1)]
        });

    }

    choiceChangeHandler = (e, index) => {
        const choices = this.state.choices.slice();
        const newObject = Object.assign({},{"choice" : e.target.value})
        this.setState({
            choices : [...choices.slice(0,index), newObject , ...choices.slice(index+1)]
        });

    }

    handleDaysChange = (e) => {
        const pollLength = Object.assign(this.state.pollLength, { days : e.target.value });
        this.setState({
            pollLength : pollLength
        })
    }

    handleHoursChange = (e) => {
        const pollLength = Object.assign(this.state.pollLength, { hours : e.target.value });
        this.setState({
            pollLength : pollLength
        })
    }

    validatePoll = () => {
        /**todo */

    }

    validateQuestion = () => {
        /**todo */
    }

    submitHandler = () => {
        Axios({url : 'http://localhost:6541/poll',
               method : 'post',
               data : this.state,
               headers : {'Content-Type': 'application/json','Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTY2MTQ1NDA4LCJleHAiOjE1NjYyMDU0MDh9.qIWuwMUxzXDiMlQ1VmwY7dmHKRo5Q79JzDUYatobBByfAbntCj2xidNcgHGuWpxMhT-MWQhF92Ks-cxl5zMbTQ'}
            })
            .then(response => {
                if(response.status === 201){
                    this.setState(initialState);
                    alert("success");
                }
            })
            .catch(err => {
                alert("Error occured during creating Poll")
            });

        
    }

    render() {
        const { classes } = this.props;
        const choices = [];
        this.state.choices.forEach((choice, index) => {
            choices.push(<PollChoice key={index} index={index} choice={choice} removeChoice={this.removeChoice} className={classes.choice} onChange={this.choiceChangeHandler}></PollChoice>);
        });
        return (
            <div>
                <Paper className={classes.conatiner}>
                    <form>
                        <Typography variant="h4" color="primary" className={classes.title}>
                            Add Poll
                        </Typography>
                        <TextField required
                            id="question"
                            label="Question"
                            value={this.state.question}
                            className={classes.textField}
                            margin="normal"
                            style={{ width: '400px' }}
                            onChange={(e) => this.questionChangedHandler(e)} >
                        </TextField>

                        <Button className={classes.choiceButton}
                            variant="contained"
                            color="primary"
                            onClick={() => this.addChoiceHandler()}>
                            + Choice
                        </Button>
                        <div style={{ display: "block" }}>
                            {choices}
                        </div>

                        <div style={{display : "block"}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="days">Days</InputLabel>
                            <Select
                                value = {this.state.pollLength.days}
                                onChange={this.handleDaysChange}
                                inputProps={{
                                    name: 'days',
                                    id: 'days',
                                }}
                            >
                            { 
                                Array.from(Array(8).keys()).map(key => {
                                    return <MenuItem key={key} value={key}>{key}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControlSecond}>
                            <InputLabel htmlFor="hours">Hours</InputLabel>
                            <Select
                                value = {this.state.pollLength.hours}
                                onChange={this.handleHoursChange}
                                inputProps={{
                                    name: 'hours',
                                    id: 'hours',
                                }}
                            >
                            { 
                                Array.from(Array(24).keys()).map(key => {
                                    return <MenuItem key={key} value={key}>{key}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>
                        </div>

                        <Button className={classes.submitButton}
                            variant="contained"
                            color="primary"
                            onClick={() => this.submitHandler()}>
                            Submit
                        </Button>

                    </form>
                </Paper>

            </div>
        )
    }
}

export default withStyles(styles)(CreatePoll)

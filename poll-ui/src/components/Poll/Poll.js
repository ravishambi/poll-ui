import React from 'react'
import './Polls.css'
import { makeStyles } from '@material-ui/core/Styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        width : '40%',
        minHeight : '200px',
        maxHeight : '500px',
        position : "relative",
        textAlign : "center",
        borderLeft : '6px solid blue',
        backgroundColor : '#eeeeee',
        margin : theme.spacing(3),
        marginLeft : '25%',
        marginRight : '25%',
        borderRadius : '5px'
    },
    formControl: {
        margin: theme.spacing(2)
    },
    group: {
        margin: theme.spacing(1, 0),
    },
}));

export default function Poll(props) {
    const classes = useStyles();

    const choices = props.poll.choices.map(choice => {
        return <FormControlLabel key={choice.choice} value={choice.choice} control={<Radio />} label={choice.choice} />
    });

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">{ props.poll.question }</FormLabel>
                <RadioGroup
                    aria-label="choice"
                    name="choices"
                    onChange={(e) => props.onVoteChangeHandler(e,props.poll.id)}
                    className={classes.group}
                >
                    { choices }
                </RadioGroup>
                <Button variant="contained"
                color="primary"
                onClick={() => props.onSubmitHandler(props.poll.id,)}
                >Vote
                </Button>
            </FormControl>
            
        </div>
    )
}

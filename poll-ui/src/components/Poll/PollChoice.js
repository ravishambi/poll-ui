import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { display } from '@material-ui/system';

function PollChoice(props) {
    return (
        <div style={{display:"inline", marginTop : "15px"}}>
            <TextField className={props.className}
            id={props.index}
            value={props.choice.choice}
            style={{ width: '400px' }}
            onChange={(e) => props.onChange(e,props.index)}
            >
            </TextField>
            <Button color="secondary"
            variant="text"
            onClick={() => props.removeChoice(props.index)}>X</Button>
        </div>
    )
}

export default PollChoice

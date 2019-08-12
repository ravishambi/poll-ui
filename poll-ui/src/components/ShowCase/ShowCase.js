import React from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import Poll from './../../assets/images/poll.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
      width: '30px',
      height: '30px',
      padding: '5px'
    },
    media: {
      height: '100%',
      textAlign: 'center'
    }
  }));

function ShowCase() {
    const classes = useStyles();
    return (
        <div className={classes.card}>
            <CardMedia
                className={classes.media}
                image={Poll}
                title="Poll"
            />
        </div>
    )
}

export default ShowCase


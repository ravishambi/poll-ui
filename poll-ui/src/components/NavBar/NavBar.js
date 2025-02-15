import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShowCase from '../ShowCase/ShowCase';
import { Link } from 'react-router-dom';
import './NavBar.css';
import ProfileMenu from './../ProfileMenu/ProfileMenu';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function NavBar(props) {
    const classes = useStyles();
    let navLink = <ProfileMenu></ProfileMenu>;
    if (!props.authenticated) {
        navLink = (<Fragment>
            <Link to="/signup" className="link">
                <Button color="inherit" onClick={(e) => props.signupClicked(e)}>Sign Up</Button>
            </Link>

            <Link to="/" className="link">
                <Button color="inherit">Login</Button>
            </Link>
        </Fragment>
        );

    }
    else {

    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <ShowCase />

                    <Typography variant="h6" className={classes.title}>
                        My Poll
                    </Typography>

                    {navLink}

                </Toolbar>
            </AppBar>
        </div>
    )
}

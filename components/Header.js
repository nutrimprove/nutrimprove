import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from '@material-ui/core';
import Auth from '../lib/Auth';

const auth = new Auth();

const styles = {
  root: {
    flexGrow: 1,
  },
  logo: {
    marginRight: 15,
    textDecoration: 'none',
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    width: 50,
    padding: 10,
  },
};

const Header = props => {
  const { classes } = props;

  function handleLogin() {
    auth.login();
  }

  function handleLogout() {
    auth.logout();
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Link href='/'>
            <img
              className={classes.logo}
              src='/static/apple_50.png'
              alt='Go to main page'
            />
          </Link>
          <Typography variant='button' color='inherit'>
            <Link href='/about'>About</Link>
          </Typography>
          <Typography variant='button' color='inherit'>
            <Link href='#' onClick={() => handleLogin()}>
              Login
            </Link>
          </Typography>
          <Typography variant='button' color='inherit'>
            <Link href='#' onClick={() => handleLogout()}>
              Logout
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

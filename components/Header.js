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

const Header = ({ classes }) => {
  function handleLogin() {
    auth.login();
  }

  function handleLogout() {
    auth.logout();
  }

  function username() {
    const info = auth.getUserInfo();
    return info && info.name ? info.name : 'Not logged in';
  }

  return (
    <div className={classes.header}>
      <AppBar position='static' color='default'>
        <Toolbar className={classes.toolbar}>
          <Link href='/'>
            <img
              className={classes.logo}
              src='/static/apple_50.png'
              alt='Go to main page'
            />
          </Link>
          <div id='links'>
            <Typography variant='button' color='inherit'>
              <Link href='/about'>About</Link>
            </Typography>
            {auth.isAuthenticated() ? (
              <Typography variant='button' color='inherit'>
                <Link href='#' onClick={() => handleLogout()}>
                  Logout
                </Link>
              </Typography>
            ) : (
              <Typography variant='button' color='inherit'>
                <Link href='#' onClick={() => handleLogin()}>
                  Login
                </Link>
              </Typography>
            )}
          </div>
          <div id='user' className={classes.userinfo}>
            {username()}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  header: {
    flexGrow: 1,
  },
  logo: {
    width: 50,
    marginRight: 10,
  },
  toolbar: {
    height: 60,
    '& a': {
      marginLeft: '20px',
    },
  },
  userinfo: {
    position: 'absolute',
    right: 30,
    '& img': {
      maxWidth: 45,
      maxHeight: 45,
    },
  },
};

export default withStyles(styles)(Header);

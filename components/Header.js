import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Link, Toolbar, Typography, withStyles } from '@material-ui/core';
import Auth from '../interfaces/auth/Auth';
import { setFoodNamesAction, setUserDetailsAction } from '../store/global/actions';
import { connect } from 'react-redux';
import HeaderLink from './HeaderLink';
import { setUserDetailsWithRole } from '../helpers/userUtils';
import { EDAMAM_DB, MIN_WIDTH } from '../helpers/constants';
import { getAllFoodNames } from '../interfaces/api/foods';

const auth = new Auth();

const Header = ({ classes, userDetails, setUserDetails, setFoodNames }) => {
  useEffect(() => {
    (async () => {
      const userInfo = auth.extractUserFromToken();
      setUserDetailsWithRole(setUserDetails, userInfo);

      if (!EDAMAM_DB) {
        const foodNames = await getAllFoodNames();
        setFoodNames(foodNames);
      }
    })();
  }, []);

  function handleLogin() {
    auth.login();
  }

  function handleLogout() {
    auth.logout();
  }

  function username() {
    if (userDetails && userDetails.email) {
      return userDetails.email;
    }
  }

  return (
    <div className={classes.header}>
      <AppBar position='static' color='default'>
        <Toolbar className={classes.toolbar}>
          <Link href='/'>
            <img
              className={classes.logo}
              src='/apple_50.png'
              alt='Go to main page'
            />
          </Link>
          <div id='links'>
            <Typography variant='button' color='inherit'>
              <Link href='/about'>About</Link>
              {username() && <Link href='/help'>Help</Link>}
            </Typography>
            {username() ? (
              <HeaderLink action={handleLogout}>Logout</HeaderLink>
            ) : (
              <HeaderLink action={handleLogin}>Login</HeaderLink>
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
  userDetails: PropTypes.object.isRequired,
  setUserDetails: PropTypes.func.isRequired,
  setFoodNames: PropTypes.func.isRequired,
};

const styles = {
  header: {
    flexGrow: 1,
    minWidth: MIN_WIDTH,
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

const mapStateToProps = states => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: details => dispatch(setUserDetailsAction(details)),
    setFoodNames: foodNames => dispatch(setFoodNamesAction(foodNames)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));

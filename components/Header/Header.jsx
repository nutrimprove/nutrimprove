import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { EDAMAM_DB } from 'helpers/constants';
import { setUserState } from 'helpers/userUtils';
import { getAllFoodNames } from 'interfaces/api/foods';
import Auth from 'interfaces/auth/Auth';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFoodNamesAction, setUserDetailsAction, setUserPreferencesAction } from 'store/global/actions';
import HeaderLink from './HeaderLink';

const auth = new Auth();

const Header = ({ classes }) => {
  const { userDetails } = useSelector(state => state.globalState);
  const dispatch = useDispatch();
  const setUserPreferences = useCallback(preferences => dispatch(setUserPreferencesAction(preferences)), []);
  const setUserDetails = useCallback(details => dispatch(setUserDetailsAction(details)), []);
  const setFoodNames = useCallback(foodNames => dispatch(setFoodNamesAction(foodNames)), []);

  useEffect(() => {
    (async () => {
      const userInfo = auth.extractUserFromToken();
      setUserState({ setUserDetails, setUserPreferences, userInfo });
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
              src='/apple_64.png'
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
};

export default Header;

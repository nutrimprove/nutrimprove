import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import { EDAMAM_DB } from 'helpers/constants';
import { getAllFoodNames } from 'interfaces/api/foods';
import { getUser } from 'interfaces/api/users';
import Auth from 'interfaces/auth/Auth';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { getStore } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { setFoodNamesAction, setUserDetailsAction, setUserPreferencesAction } from 'store/global/actions';
import HeaderLink from './HeaderLink';

const auth = new Auth();
const dispatch = (action) => getStore().dispatch(action);

const processAuth = () => {
  try {
    const userDetails = auth.extractInfoFromHash();
    const { user_details: userInfo } = userDetails;
    auth.handleAuthentication().then(async res => {
      if (res) {
        if (userInfo && userInfo.email) {
          const user = await getUser(userInfo.email);
          if (user) {
            const { role, approved, points, preferences } = user;
            dispatch(setUserDetailsAction({ ...userInfo, role, approved, points }));
            dispatch(setUserPreferencesAction(preferences));
          } else {
            console.error('User not found!', userInfo.email);
          }
        } else {
          console.error('UserInfo object not valid!', userInfo);
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'token',
            JSON.stringify(userDetails.token),
          );
        }
      }
    });
  } catch (e) {
    console.warn(`No authentication found!`);
  }
};

const Header = ({ classes }) => {
  const { userDetails } = useSelector(state => state.globalState);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await processAuth();
      if (!EDAMAM_DB) {
        const foodNames = await getAllFoodNames();
        dispatch(setFoodNamesAction(foodNames));
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

import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import MainNav from 'components/Header/MainNav';
import { EDAMAM_DB } from 'helpers/constants';
import { getAllFoodNames } from 'interfaces/api/foods';
import { getUser } from 'interfaces/api/users';
import Auth from 'interfaces/auth/Auth';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFoodNamesAction, setUserDetailsAction, setUserPreferencesAction } from 'store/global/actions';
import HeaderLink from './HeaderLink';

const auth = new Auth();

const userAuthentication = async () => {
  const userInfoFromStorage = auth.extractUserFromToken();
  if (userInfoFromStorage) {
    return userInfoFromStorage;
  }

  try {
    const userInfo = auth.extractInfoFromHash();
    await auth.handleAuthentication().then(res => {
      if (res) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'token',
            JSON.stringify(userInfo.token),
          );
          history.replaceState({}, '', '/');
        }
      }
    });
    return userInfo.user_details;
  } catch (e) {
    console.warn(`Not Logged In!`);
  }
};

const Header = ({ classes }) => {
  const { userDetails } = useSelector(state => state.globalState);
  const dispatch = useDispatch();
  const setFoodNames = useCallback(foodNames => dispatch(setFoodNamesAction(foodNames)), []);

  useEffect(() => {
    (async () => {
      const userInfo = await userAuthentication();
      if (!userInfo) return;

      const user = await getUser(userInfo.email);
      if (user) {
        const { role, approved, points, preferences } = user;
        dispatch(setUserDetailsAction({ ...userInfo, role, approved, points }));
        dispatch(setUserPreferencesAction(preferences));
      } else {
        console.error('User not found!', userInfo.email);
      }

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
              {/* {username() && <Link href='/help'>Help</Link>} */}
              {username() && <Link href='https://github.com/eat-well/nutrimprove/releases' target='_blank'>Release Notes</Link>}
            </Typography>

          </div>
          <div id='user' className={classes.right}>
            {username()}
            {username() ? (
              <HeaderLink action={handleLogout}>Logout</HeaderLink>
            ) : (
              <HeaderLink action={handleLogin}>Login</HeaderLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <MainNav/>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Header;

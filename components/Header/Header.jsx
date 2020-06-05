import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import MainNav from 'components/Header/MainNav';
import { EDAMAM_DB } from 'helpers/constants';
import { getAllFoodNames } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFoodNamesAction } from 'store/global/actions';
import HeaderLink from './HeaderLink';

const Header = ({ classes }) => {
  const dispatch = useDispatch();
  const setFoodNames = useCallback(foodNames => dispatch(setFoodNamesAction(foodNames)), []);

  useEffect(() => {
    (async () => {
      if (!EDAMAM_DB) {
        const foodNames = await getAllFoodNames();
        setFoodNames(foodNames);
      }
    })();
  }, []);

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
              <Link href='https://github.com/eat-well/nutrimprove/releases' target='_blank'>Release Notes</Link>
            </Typography>

          </div>
          <div id='user' className={classes.right}>
            <HeaderLink action={() => true}>Logout</HeaderLink>
            <HeaderLink action={() => true}>Login</HeaderLink>
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

import { AppBar, Link, Toolbar, Typography } from '@material-ui/core';
import MainNav from 'components/Header/MainNav';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from 'react-use-auth';
import HeaderLink from './HeaderLink';

const Header = ({ classes }) => {
  const { login, logout, isAuthenticated } = useAuth();

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
          <Typography className={classes.link} variant='button' color='inherit'>
            <Link href='/about'>About</Link>
            {/* {username() && <Link href='/help'>Help</Link>} */}
            <Link href='https://github.com/nutrimprove/nutrimprove/releases' target='_blank'>Release Notes</Link>
          </Typography>
          <div id='user' className={classes.right}>
            {isAuthenticated()
              ? <HeaderLink action={logout}>Logout</HeaderLink>
              : <HeaderLink action={login}>Login</HeaderLink>
            }
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

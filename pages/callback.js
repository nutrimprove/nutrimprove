import React, { useEffect } from 'react';
import Auth from '../lib/Auth';
import Router from 'next/router';
import Header from '../components/Header';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const auth = new Auth();

const styles = {
  message: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
};

const Callback = ({ classes }) => {
  useEffect(() => {
    const userDetails = auth.extractInfoFromHash();
    auth.handleAuthentication().then(res => {
      if (!res) {
        console.error('Not able to authenticate user!', userDetails);
      }
      Router.push('/');
    });
  }, []);

  return (
    <>
      <Header />
      <div className={classes.message}>Processing login information!!</div>
    </>
  );
};

Callback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Callback);

import React, { useEffect } from 'react';
import Auth from '../lib/Auth';
import Router from 'next/router';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SectionHeader from '../components/SectionHeader';

const auth = new Auth();

const styles = {
  message: {
    color: 'blue',
    fontWeight: 'bold',
    justifyContent: 'center',
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
    <div className={classes.message}>
      <SectionHeader
        title='Processing login information!!'
        subtitle='Please wait!!'
      />
    </div>
  );
};

Callback.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Callback);

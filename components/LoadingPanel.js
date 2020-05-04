import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const LoadingPanel = ({ classes }) => (
  <div className={classes.panel}>
    <LoadingSpinner force={true} />
    <div className={classes.text}>Loading, please wait . . .</div>
  </div>
);

LoadingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  panel: {
    textAlign: 'center',
    margin: '20px auto',
  },
  text: {
    fontWeight: 400,
    fontFamily: 'tahoma, arial, sans-serif',
    marginTop: 10,
  },
};

export default withStyles(styles)(LoadingPanel);

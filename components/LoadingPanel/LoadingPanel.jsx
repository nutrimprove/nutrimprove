import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const LoadingPanel = ({ classes }) => (
  <div className={classes.panel}>
    <LoadingSpinner force={true}/>
    <div className={classes.text}>Loading, please wait . . .</div>
  </div>
);

LoadingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default LoadingPanel;

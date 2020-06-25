import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const LoadingPanel = ({ classes, delay = 0 }) => (
  <div className={classes.panel}>
    <LoadingSpinner force={true} delay={delay} />
    <div className={classes.text}>Loading, please wait . . .</div>
  </div>
);

LoadingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  delay: PropTypes.number,
};

export default LoadingPanel;

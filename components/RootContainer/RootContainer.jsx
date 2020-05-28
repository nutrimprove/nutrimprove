import React from 'react';
import PropTypes from 'prop-types';

const RootContainer = ({ classes, children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  );
};

RootContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
};

export default RootContainer;

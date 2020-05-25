import PropTypes from 'prop-types';
import React from 'react';

const ActionsContainer = ({ classes, children }) => (
  <div className={classes.container}>
    {children}
  </div>
);

ActionsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
};

export default ActionsContainer;

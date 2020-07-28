import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';

const TabContainer = ({ value, index, container = true, classes, children }) => {
  return value === index && (
    <>
      {container
        ? <Paper elevation={2} className={classes.content}>{children}</Paper>
        : <>{children}</>
      }
    </>
  );
};

TabContainer.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number.isRequired,
  container: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default TabContainer;

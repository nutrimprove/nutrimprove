import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const defaultPadding = { padding: '0 50px' };

const Spacer = ({ classes, padding = defaultPadding }) => {
  return <div className={classes.block} style={padding} />;
};

Spacer.propTypes = {
  classes: PropTypes.object.isRequired,
  padding: PropTypes.object,
};

const styles = {
  block: {
    display: 'inline-flex',
  },
};

export default withStyles(styles)(Spacer);

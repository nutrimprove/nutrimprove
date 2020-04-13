import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles/index';

const DeleteUserButton = ({ classes, children }) =>
  <Paper className={classes.content}>{children}</Paper>;

DeleteUserButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = {
  content: {
    padding: '24px 24px 48px 24px',
  },
};

export default withStyles(styles)(DeleteUserButton);

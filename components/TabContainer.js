import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles/index';

const TabContainer = ({ value, index, classes, children }) => (
  <>
    {value === index && <Paper elevation={2} className={classes.content}>{children}</Paper>}
  </>
);

TabContainer.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = {
  content: {
    padding: '18px 18px 40px 18px',
  },
};

export default withStyles(styles)(TabContainer);

import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';

const PageContent = ({ children, classes }) => (
  <Paper className={classes.content}>
    {children}
  </Paper>
);

PageContent.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PageContent;

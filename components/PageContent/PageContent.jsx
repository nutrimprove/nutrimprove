import Paper from '@material-ui/core/Paper';
import LoadingPanel from 'components/LoadingPanel';
import PropTypes from 'prop-types';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const PageContent = ({ children, classes }) => {
  const { promiseInProgress: authenticating } = usePromiseTracker({ area: 'authentication' });

  return (
  <Paper className={classes.content}>
    {authenticating ? <LoadingPanel /> : children}
  </Paper>
)};

PageContent.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PageContent;

import Paper from '@material-ui/core/Paper';
import LoadingPanel from 'components/LoadingPanel';
import NoAccess from 'components/NoAccess';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useSelector } from 'react-redux';

const noAuthPages = ['/', '/auth0_callback', '/about'];

const PageContent = ({ children, classes }) => {
  const { promiseInProgress } = usePromiseTracker();
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const router = useRouter();
  const enablePage = userDetails.isLoggedIn || noAuthPages.includes(router.route);

  const Content = () => enablePage ? children : <NoAccess/>;

  return (
    <Paper className={classes.content}>
      {promiseInProgress ? <LoadingPanel/> : <Content/>}
    </Paper>
  );
};

PageContent.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PageContent;

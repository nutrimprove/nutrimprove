import Paper from '@material-ui/core/Paper';
import LoadingPanel from 'components/LoadingPanel';
import WelcomePage from 'components/WelcomePage';
import { isApproved, isLoggedIn } from 'helpers/userUtils';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const noAuthPages = ['/', '/auth0_callback', '/about'];

const PageContent = ({ children, classes }) => {
  const { promiseInProgress } = usePromiseTracker();
  const router = useRouter();
  const enablePage = (isLoggedIn() && isApproved()) || noAuthPages.includes(router.route);

  const Content = () => enablePage ? children : <WelcomePage/>;

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

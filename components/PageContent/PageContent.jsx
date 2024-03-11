import Paper from '@material-ui/core/Paper';
import Footer from 'components/Footer';
import LoadingPanel from 'components/LoadingPanel';
// import { isAdmin, isApproved, isLoggedIn } from 'helpers/userUtils';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
// import { useAuth } from 'react-use-auth';

// const noAuthPages = ['/', '/auth0_callback', '/about', '/info'];


const PageContent = ({ children, classes }) => {
  // const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const { promiseInProgress } = usePromiseTracker();
  const router = useRouter();
  // const { isAuthenticated } = useAuth();
  // const accessDenied = router.route.includes('/admin/') && !isAdmin(userDetails);
  // const enablePage = ((isLoggedIn() && isApproved() && isAuthenticated) || noAuthPages.includes(router.route)) && !accessDenied;
  const enablePage = true;

  if (typeof window !== 'undefined') {
    if (enablePage) {
      return (
        <Paper className={classes.content}>
          {promiseInProgress ? <LoadingPanel /> : children}
          <Footer />
        </Paper>
      );
    }
    router.push('/');
  }
  return null;
};

PageContent.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PageContent;

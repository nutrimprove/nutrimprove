import Paper from '@material-ui/core/Paper';
import LoadingPanel from 'components/LoadingPanel';
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

  if (typeof window !== 'undefined') {
    if (enablePage) {
      return (
        <Paper className={classes.content}>
          {promiseInProgress ? <LoadingPanel/> : children}
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

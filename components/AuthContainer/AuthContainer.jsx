import NoAccess from 'components/NoAccess';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const publicPaths = [
  '/about',
];

const AuthContainer = ({ children, router }) => {
  const { userDetails } = useSelector(({ globalState }) => globalState);
  const { email_verified: verified, approved } = userDetails;

  if (!publicPaths.includes(router.pathname) && (!userDetails || !verified || !approved)) {
    return <NoAccess userDetails={userDetails}/>;
  }

  return (
    <>
      {children}
    </>
  );
};

AuthContainer.propTypes = {
  children: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default AuthContainer;

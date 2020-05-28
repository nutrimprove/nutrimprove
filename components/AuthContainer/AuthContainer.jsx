import NoAccess from 'components/NoAccess';
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const AuthContainer = ({ children }) => {
  const { userDetails } = useSelector(({ globalState }) => globalState);

  if (!userDetails || !userDetails.email_verified || !userDetails.approved) {
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
};

export default AuthContainer;

import LoadingPanel from 'components/LoadingPanel';
import MainNav from 'components/MainNav';
import NoAccess from 'components/NoAccess';
import PropTypes from 'prop-types';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { connect } from 'react-redux';

const renderContent = userDetails =>
  userDetails && userDetails.email_verified && userDetails.approved ? (
    <MainNav/>
  ) : (
    <NoAccess user={userDetails}/>
  );

const Index = ({ userDetails }) => {
  const { promiseInProgress } = usePromiseTracker({ area: 'getUser' });

  return (
    <>
      {promiseInProgress ? <LoadingPanel/> : renderContent(userDetails)}
    </>
  );
};

Index.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(mapStateToProps, null)(Index);

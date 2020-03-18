import React from 'react';
import NoAccess from '../components/NoAccess';
import Content from '../components/Content';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { usePromiseTracker } from 'react-promise-tracker';
import LoadingPanel from '../components/LoadingPanel';

const renderContent = userDetails =>
  userDetails && userDetails.email_verified && userDetails.approved ? (
    <Content />
  ) : (
    <NoAccess user={userDetails} />
  );

const Index = ({ userDetails }) => {
  const { promiseInProgress } = usePromiseTracker({ area: 'getUser' });

  return (
    <>
      {promiseInProgress ? <LoadingPanel /> : renderContent(userDetails)}
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

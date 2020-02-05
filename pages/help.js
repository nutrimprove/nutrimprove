import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NoAccess from '../components/NoAccess';
import HelpPage from '../components/HelpPage';

const Help = ({ userDetails }) => {
  return userDetails &&
    userDetails.email_verified &&
    userDetails.approved ? (
    <HelpPage />
  ) : (
    <NoAccess user={userDetails} />
  );
};

Help.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(Help);

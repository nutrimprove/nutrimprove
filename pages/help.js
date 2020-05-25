import HelpPage from 'components/HelpPage';
import NoAccess from 'components/NoAccess';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const Help = ({ userDetails }) => {
  return userDetails &&
  userDetails.email_verified &&
  userDetails.approved ? (
    <HelpPage/>
  ) : (
    <NoAccess user={userDetails}/>
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
  null,
)(Help);

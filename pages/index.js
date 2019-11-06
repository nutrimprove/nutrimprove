import React from 'react';
import NoAccess from '../components/NoAccess';
import Content from '../components/Content';
import withStyles from '@material-ui/core/styles/withStyles';
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

const Index = ({ classes, userDetails }) => {
  const { promiseInProgress } = usePromiseTracker({ area: 'getUser' });

  return (
    <div className={classes.content}>
      {promiseInProgress ? <LoadingPanel /> : renderContent(userDetails)}
    </div>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const styles = {
  content: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
};

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Index));

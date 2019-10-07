import React from 'react';
import NoAccess from '../components/NoAccess';
import Content from '../components/Content';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const SKIP_LOGIN = process.env.SKIP_LOGIN;

const styles = {
  content: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
};

const Index = ({ classes, userDetails }) => (
  <div className={classes.content}>
    {console.log(SKIP_LOGIN)}
    {SKIP_LOGIN ||
    (userDetails && userDetails.email_verified && userDetails.approved) ? (
      <Content />
    ) : (
      <NoAccess user={userDetails} />
    )}
  </div>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired,
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
)(withStyles(styles)(Index));

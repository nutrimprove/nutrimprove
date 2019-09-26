import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const UserInfo = ({ classes, user }) => {
  return <div className={classes.userinfo}>{user}</div>;
};

UserInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.string,
};

const styles = {
  userinfo: {
    right: 30,
    '& img': {
      maxWidth: 45,
      maxHeight: 45,
    },
  },
};

export default withStyles(styles)(UserInfo);

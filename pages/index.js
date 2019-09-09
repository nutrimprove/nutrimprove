import React from 'react';
import PleaseLoginMessage from '../components/PleaseLoginMessage';
import Content from '../components/Content';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = {
  content: {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD',
    minWidth: 800,
  },
};

const Index = ({ classes }) => {
  let userData;
  let isLoggedIn;

  if (typeof window !== 'undefined') {
    userData = localStorage.getItem('user_details');
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  return (
    <div className={classes.content}>
      {isLoggedIn && userData ? <Content /> : <PleaseLoginMessage />}
    </div>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const BackToMainPageLink = ({ classes }) => {
  return (
    <div className={classes.footer}>
      <Typography variant='button' color='inherit'>
        <Link href='/'>Back to main page</Link>
      </Typography>
    </div>
  );
};

BackToMainPageLink.propTypes = {
  content: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = {
  footer: {
    marginTop: 20,
    backgroundColor: 'lightyellow',
    padding: 10,
    border: 'solid 1px lightgrey',
    borderRadius: 9,
  },
};

export default withStyles(styles)(BackToMainPageLink);

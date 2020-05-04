import React from 'react';
import PropTypes from 'prop-types';
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
  classes: PropTypes.object.isRequired,
};

export default BackToMainPageLink;

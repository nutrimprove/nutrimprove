import { Link, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const HeaderLink = ({ action, children, classes }) => (
  <Typography variant='button' color='inherit' className={classes.link}>
    <Link href='#' onClick={action}>
      {children}
    </Link>
  </Typography>
);

HeaderLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default HeaderLink;

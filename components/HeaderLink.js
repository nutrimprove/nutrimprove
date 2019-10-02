import { Link, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const HeaderLink = ({ action, children }) => (
  <Typography variant='button' color='inherit'>
    <Link href='#' onClick={action}>
      {children}
    </Link>
  </Typography>
);

HeaderLink.propTypes = {
  action: PropTypes.func,
  children: PropTypes.object,
};

export default HeaderLink;

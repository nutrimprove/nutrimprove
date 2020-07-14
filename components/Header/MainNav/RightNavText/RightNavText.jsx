import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';

const RightNavText = ({ classes, children, important }) => {
  return (
    <Typography className={classes.rightNavContent}>
      <span className={clsx(important ? classes.notice : classes.rightNavText)}>{children}</span>
    </Typography>
  );
};

RightNavText.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.string.isRequired,
  important: PropTypes.bool,
};

export default RightNavText;

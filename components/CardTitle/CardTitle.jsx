import { Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = ({ classes, title }) => {
  return (
    <>
      <Typography className={classes.title} variant='subtitle1'>{title}</Typography>
    </>
  );
};

CardTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default CardTitle;

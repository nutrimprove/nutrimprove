import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core';

const RemoveIcon = ({ classes, foodItem, action }) => {
  if (foodItem != null) {
    return (
      <>
        <IconButton
          className={classes.icon}
          aria-label='remove-button'
          onClick={() => action(foodItem)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
  }
  return (
    <>
      <IconButton
        className={classes.icon}
        aria-label='disabled-remove-button'
        disabled
      >
        <DeleteIcon />
      </IconButton>
    </>
  );
};

RemoveIcon.propTypes = {
  classes: PropTypes.object,
  foodItem: PropTypes.object,
  action: PropTypes.func,
};

const styles = {
  icon: {
    padding: 8,
  },
};

export default withStyles(styles)(RemoveIcon);

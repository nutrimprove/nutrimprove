import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React from 'react';

const RemoveIcon = ({ classes, foodItem, action }) => {
  if (foodItem != null) {
    return (
      <>
        <IconButton
          className={classes.icon}
          aria-label='remove-button'
          onClick={() => action(foodItem)}
        >
          <DeleteIcon/>
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
        <DeleteIcon/>
      </IconButton>
    </>
  );
};

RemoveIcon.propTypes = {
  classes: PropTypes.object,
  foodItem: PropTypes.object,
  action: PropTypes.func,
};

export default RemoveIcon;

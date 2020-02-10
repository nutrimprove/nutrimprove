import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const RemoveIcon = ({ foodItem, action }) => {
  if (foodItem != null) {
    return (
      <>
        <IconButton
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
      <IconButton aria-label='disabled-remove-button' disabled>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

RemoveIcon.propTypes = {
  foodItem: PropTypes.object,
  action: PropTypes.func,
};

export default RemoveIcon;

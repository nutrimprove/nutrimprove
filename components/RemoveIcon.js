import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const RemoveIcon = props => {
  const { removeField, item } = props;

  if (removeField && item) {
    return (
      <div>
        <IconButton
          aria-label='remove-button'
          onClick={() => removeField(item)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    );
  } else {
    return (
      <div>
        <IconButton aria-label='disabled-remove-button' disabled>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  }
};

RemoveIcon.propTypes = {
  removeField: PropTypes.func,
  item: PropTypes.object,
};

export default RemoveIcon;

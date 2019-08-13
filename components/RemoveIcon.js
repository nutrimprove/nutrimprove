import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFoodOrRecommendedFood } from '../store/addRecommendation/actions'

const RemoveIcon = ({ foodItem, doRemove }) => {
  if (foodItem != null) {
    return (
      <>
        <IconButton aria-label='remove-button' onClick={() => doRemove()}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton aria-label='disabled-remove-button' disabled>
          <DeleteIcon />
        </IconButton>
      </>
    );
  }
};

RemoveIcon.propTypes = {
  foodItem: PropTypes.object,
  doRemove: PropTypes.function,
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  doRemove: () => {
    dispatch(removeFoodOrRecommendedFood(ownProps.foodItem))
  }
})

export default connect(null, mapDispatchToProps)(RemoveIcon);

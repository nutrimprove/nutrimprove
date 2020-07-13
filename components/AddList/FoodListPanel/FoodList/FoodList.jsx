import { List, ListItem, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

const FoodList = ({ classes, foods, onDelete }) => {
  const setHoverColor = ({ currentTarget }) => {
    currentTarget.style.color = 'darkred';
  };

  const setNormalColor = ({ currentTarget }) => {
    currentTarget.style.color = 'grey';
  };

  return (
    <>
      <List>
        {foods && foods.map(food => (
          <ListItem key={food.foodCode} className={classes.food}>
            <Typography variant='body2'>{food.foodName}</Typography>
            <DeleteIcon onClick={onDelete}
                        style={{ color: 'grey', cursor: 'pointer' }}
                        onMouseOver={setHoverColor}
                        onMouseLeave={setNormalColor}
                        titleAccess='Delete'
                        data-key={food.foodCode}
                        className={classes.deleteIcon}
            />
          </ListItem>
        ))}
        {!foods || foods.length === 0 && (
          <ListItem>
            <Typography variant='body2' className={classes.empty} title='Empty list'>Empty</Typography>
          </ListItem>
        )}
      </List>
      <Typography variant='caption' className={classes.foodsFooter}>Add foods to list from left side panel</Typography>
    </>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
  foods: PropTypes.array,
  onDelete: PropTypes.func,
};

export default FoodList;

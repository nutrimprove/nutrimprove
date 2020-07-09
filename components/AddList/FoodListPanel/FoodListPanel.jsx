import { List, ListItem, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CardTitle from 'components/CardTitle';
import PropTypes from 'prop-types';
import React from 'react';

const FoodListPanel = ({ classes, className, title, foods, onListNameChange, onDelete }) => {
  const handleFoodClick = () => {

  };

  const setHoverColor = ({ currentTarget }) => {
    currentTarget.style.color = 'darkred';
  };

  const setNormalColor = ({ currentTarget }) => {
    currentTarget.style.color = 'grey';
  };

  return (
    <div className={className}>
      <CardTitle title={title} editable={true} onTitleChange={onListNameChange}/>
      <div className={classes.container}>
        <List>
          {foods && foods.map(food => (
            <ListItem key={food.foodCode} className={classes.food} onClick={handleFoodClick}>
              <Typography variant='body1'>{food.foodName}</Typography>
              <DeleteIcon onClick={onDelete}
                          style={{ color: 'grey', cursor: 'pointer' }}
                          onMouseOver={setHoverColor}
                          onMouseLeave={setNormalColor}
                          titleAccess='Delete'
                          data-key={food.foodCode}
              />
            </ListItem>
          ))}
          {!foods || foods.length === 0 && (
            <ListItem>
              <Typography className={classes.empty} title='Empty list'>Empty</Typography>
            </ListItem>
          )}
        </List>
      </div>
    </div>
  );
};

FoodListPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  foods: PropTypes.array.isRequired,
  onListNameChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FoodListPanel;

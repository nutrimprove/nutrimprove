import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CardTitle from 'components/CardTitle';
import PropTypes from 'prop-types';
import React from 'react';

const FoodListCard = ({ classes, className, title, foods, onListNameChange }) => {
  const handleFoodClick = () => {

  };

  return (
    <div className={className}>
      <CardTitle title={title} editable={true} onTitleChange={onListNameChange}/>
      <div className={classes.container}>
        <List>
          {foods && foods.map(food => (
            <ListItem key={food.foodCode} className={classes.food} onClick={handleFoodClick}>
              <Typography variant='body1'>{food.foodName}</Typography>
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

FoodListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  foods: PropTypes.array.isRequired,
  onListNameChange: PropTypes.func,
};

export default FoodListCard;

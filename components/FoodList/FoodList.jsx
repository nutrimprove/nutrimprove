import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import CardTitle from 'components/CardTitle';
import PropTypes from 'prop-types';
import React from 'react';

const FoodList = ({ classes, className, foods }) => {
  return (
    <div className={className}>
      <CardTitle title='New List' editable={true}/>
      <div className={classes.container}>
        <List>
          {foods && foods.map(food => {
            return (
              <ListItem key={food.foodCode}>
                {food.foodName}
              </ListItem>
            );
          })}
          {!foods && (
            <>
              <ListItem><Typography className={classes.empty} title='Empty list'>Empty</Typography></ListItem>
            </>
          )}
        </List>
      </div>
    </div>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  foods: PropTypes.array.isRequired,
};

export default FoodList;

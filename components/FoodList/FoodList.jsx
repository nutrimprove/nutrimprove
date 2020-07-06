import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardTitle from 'components/CardTitle';
import PropTypes from 'prop-types';
import React from 'react';

const list = [{name: 'A'}, {name: 'B'}];

const FoodList = ({ classes, className }) => {
  return (
    <div className={className}>
      <CardTitle title='New List'/>
      <div className={classes.container}>
        <List>
          {list.map(food => {
            return (
              <ListItem>
                {food.name}
              </ListItem>
            )
          })}
        </List>
      </div>
    </div>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default FoodList;

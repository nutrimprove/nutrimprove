import { Button, Card, CardActions, CardContent, List, ListItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';
import ScrollIntoView from '../ScrollIntoView/ScrollIntoView';

const FoodCard = ({ food, onShowMoreClick, onMouseOver, highlightItem, classes }) => {
  const title = food ? food.foodName : '';

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary" title={title} noWrap={true}>
        {title}
      </Typography>
      <CardContent className={classes.content}>
        <List className={classes.list}>
          {food && food.nutrients && food.nutrients.map(({ label, quantity }) => (
            <ListItem
              button key={uniqueId()}
              data-label={label}
              className={clsx(classes.item, highlightItem === label ? classes.highlight : '')}
              onMouseOver={onMouseOver}
            >
              <span className={classes.nutrient}>{label}</span>
              <span className={classes.value}>{quantity}</span>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <ScrollIntoView/>
        <Button
          variant='outlined'
          color='primary'
          className={classes.button}
          onClick={onShowMoreClick}
        >
          Show More
        </Button>
      </CardActions>
    </Card>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func,
  highlightItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default FoodCard;

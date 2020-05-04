import { Button, Card, CardActions, CardContent, List, ListItem, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';

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
              onFocus
            >
              <span className={classes.nutrient}>{label}</span>
              <span className={classes.value}>{quantity}</span>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.button}
          onClick={onShowMoreClick}
        >
          Show more
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

const styles = {
  card: {
    width: 400,
    borderRadius: 7,
    marginRight: 50,
  },
  content: {
    minHeight: 288,
  },
  title: {
    fontWeight: 600,
    minHeight: 24,
    background: '#f5f5fa',
    padding: 20,
    borderBottom: '1px solid lightgrey',
    textAlign: 'center',
    margin: 0,
  },
  nutrient: {
    display: 'inline',
    fontWeight: 'bold',
    zIndex: 1,
  },
  value: {
    position: 'absolute',
    right: 0,
  },
  list: {
    fontFamily: 'sans-serif, arial',
    fontSize: '0.8em',
    padding: 0,
  },
  item: {
    padding: '8px 0',
    borderBottom: '1px dotted #ddd',
  },
  highlight: {
    background: '#f5f5fa',
  },
  actions: {
    padding: '0 14px',
    marginBottom: 16,
  },
  button: {
    fontSize: '0.7em',
    height: 30,
  },
};

export default withStyles(styles)(FoodCard);

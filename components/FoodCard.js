import { Button, Card, CardActions, CardContent, List, ListItem, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { parseNutrients } from '../helpers/utils';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';

const essentialNutrients = [
  { name: 'energy', label: 'Energy' },
  { name: 'carbohydrate', label: 'Carbohydrate' },
  { name: 'fat', label: 'Fat' },
  { name: 'protein', label: 'Protein' },
  { name: 'totalSugars', label: 'Total Sugar' },
  { name: 'fibre', label: 'Fibre' },
  { name: 'SFA', label: 'Saturated Fat' },
  { name: 'omega3', label: 'Omega 3' },
  { name: 'Cholesterol', label: 'Cholesterol' },
];

const FoodCard = ({ food, onShowMoreClick, onMouseOver, highlightItem, classes }) => {
  const title = food ? food.foodName : '';
  const essentialNutrientsInfo = (foodObj) => {
    if (!foodObj) return;
    const { proximates } = foodObj;

    // Get only essential nutrients to display in the card
    const nutrients = {};
    Object.keys(proximates).map(key => {
      const exists = essentialNutrients.some(nutrient => nutrient.name === key);
      if (exists) {
        nutrients[key] = proximates[key];
      }
    });

    const parsedNutrients = parseNutrients({ nutrients, filterEmptyValues: false, addKey: true });
    return (
      <List className={classes.list}>
        {essentialNutrients.map(nutrient => {
          const parsedNutrient = parsedNutrients.find(parsedNutrient => parsedNutrient.key === nutrient.name);
          return (
            <ListItem
              button key={uniqueId()}
              data-label={nutrient.label}
              className={clsx(classes.item, highlightItem === nutrient.label ? classes.highlight : '')}
              onMouseOver={onMouseOver}
            >
              <span className={classes.nutrient}>{nutrient.label}</span>
              <span className={classes.value}>{parsedNutrient.quantity}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Card className={classes.card}>
      <Typography className={classes.title} color="textSecondary" title={title} noWrap={true}>
        {title}
      </Typography>
      <CardContent className={classes.content}>
        {essentialNutrientsInfo(food)}
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

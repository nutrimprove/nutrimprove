import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, List, ListItem, Typography, withStyles } from '@material-ui/core';
import { getFoodById } from '../interfaces/api/foods';
import ResultsModal from './ResultsModal';
import { parseNutrients } from '../helpers/utils';
import clsx from 'clsx';

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

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendation, setRecommendation] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState();

  useEffect(() => {
    (async () => {
      const [foodResult, recommendationResult] = await Promise.all([
        getFoodById('14-897'),
        getFoodById('14-346'),
      ]);

      setFood(foodResult);
      setRecommendation(recommendationResult);
    })();
  }, []);

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

    const parsedNutrients = parseNutrients(nutrients, false);
    return (
      <List className={classes.list}>
        {parsedNutrients.map(nutrient => (
            <ListItem key={name} className={classes.item}>
              <span className={classes.nutrient}>{nutrient.nutrient}</span>
              <span className={classes.value}>{nutrient.quantity}</span>
            </ListItem>
          ))}
      </List>
    );
  };

  const loadFoodDetails = foodObj => {
    const { foodName, proximates, vitamins, inorganics } = foodObj;
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients(proximates, false),
        ...parseNutrients(vitamins),
        ...parseNutrients(inorganics),
      ],
    });
  };

  const showFoodDetails = () => {
    setDetailsOpen(true);
    loadFoodDetails(food);
  };

  const showRecommendationDetails = () => {
    setDetailsOpen(true);
    loadFoodDetails(recommendation);
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
  };

  return (
    <div className={classes.root}>
      {food && <Card className={clsx(classes.card, classes.food)}>
        <Typography className={classes.title} color="textSecondary" noWrap={true}>
          {food.foodName}
        </Typography>
        <CardContent className={classes.content}>
          {essentialNutrientsInfo(food)}
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={showFoodDetails}
          >
            Show more
          </Button>
        </CardActions>
      </Card>}
      {recommendation && <Card className={clsx(classes.card, classes.recommendation)}>
        <Typography className={classes.title} color="textSecondary" title={recommendation.foodName} noWrap={true}>
          {recommendation.foodName}
        </Typography>
        <CardContent className={classes.content}>
          {essentialNutrientsInfo(recommendation)}
        </CardContent>
        <CardActions className={classes.actions}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={showRecommendationDetails}
          >
            Show more
          </Button>
        </CardActions>
      </Card>}
      {detailsOpen && <ResultsModal
        data={foodDetails.nutrients}
        open={detailsOpen}
        onClose={handleCloseModal}
        title={foodDetails.foodName}
        subtitle='Nutritional information per 100g of food'
      />}
    </div>
  );
};

AddRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  root: {
    display: 'inline-flex',
  },
  card: {
    width: 400,
    borderRadius: 7,
  },
  food: {
    margin: 0,
  },
  recommendation: {
    marginLeft: 50,
  },
  title: {
    fontWeight: 600,
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
  actions: {
    padding: '0 14px',
    marginBottom: 16,
  },
  button: {
    fontSize: '0.7em',
    height: 30,
  },
};

export default withStyles(styles)(AddRecommendations);

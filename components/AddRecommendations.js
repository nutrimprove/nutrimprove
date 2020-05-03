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
  const [recommendationDetails, setRecommendationDetails] = useState();

  useEffect(() => {
    (async () => {
      const [foodResult, recommendationResult] = await Promise.all([
        getFoodById('14-897'),
        getFoodById('14-346')
      ]);

      setFood(foodResult);
      setRecommendation(recommendationResult);
    })();
  }, []);

  const essentialNutrientsInfo = (foodObj) => {
    if (!foodObj) return;
    const { proximates } = foodObj;

    return (
      <List className={classes.list}>
        {essentialNutrients.map(nutrient => {
          const { name, label } = nutrient;

          return (
            <ListItem key={name} className={classes.item}>
              <span className={classes.nutrient}>{label}</span>
              <span className={classes.value}>{proximates[name].quantity} {proximates[name].unit}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const loadFoodDetails = (foodObj, setDetailsFunction) => {
    const {proximates, vitamins, inorganics} = foodObj;
    setDetailsFunction(...[
      parseNutrients(proximates),
      parseNutrients(vitamins),
      parseNutrients(inorganics),
    ]);
  };

  const handleShowMoreClick = () => {
    setDetailsOpen(true);
    loadFoodDetails(food, setFoodDetails);
    loadFoodDetails(recommendation, setRecommendationDetails);
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
            onClick={handleShowMoreClick}
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
            onClick={handleShowMoreClick}
          >
            Show more
          </Button>
        </CardActions>
      </Card>}
      {detailsOpen && <ResultsModal
        data={recommendationDetails}
        open={detailsOpen}
        onClose={handleCloseModal}
        title={food.foodName}
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
    marginLeft: 40,
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

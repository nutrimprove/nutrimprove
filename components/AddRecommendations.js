import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Typography, withStyles } from '@material-ui/core';
import { getFoodById } from '../interfaces/api/foods';
import ResultsModal from './ResultsModal';
import { parseNutrients } from '../helpers/utils';
import clsx from 'clsx';
import FoodCard from './FoodCard';

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

  const loadFoodDetails = foodObj => {
    const { foodName, proximates, vitamins, inorganics } = foodObj;
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
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
      <FoodCard food={food} onShowMoreClick={showFoodDetails}/>
      <FoodCard food={recommendation} onShowMoreClick={showRecommendationDetails}/>
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
    minHeight: 430,
  },
};

export default withStyles(styles)(AddRecommendations);

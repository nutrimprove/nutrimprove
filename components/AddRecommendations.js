import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getFoodById } from '../interfaces/api/foods';
import ResultsModal from './ResultsModal';
import { parseNutrients } from '../helpers/utils';
import FoodCard from './FoodCard';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendation, setRecommendation] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState();
  const [hoveredItem, setHoveredItem] = useState();

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

  const loadFoodDetails = useCallback(foodObj => {
    const { foodName, proximates, vitamins, inorganics } = foodObj;
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    });
  }, [foodDetails]);

  const showFoodDetails = useCallback(() => {
    setDetailsOpen(true);
    loadFoodDetails(food);
  }, [detailsOpen]);

  const showRecommendationDetails = useCallback(() => {
    setDetailsOpen(true);
    loadFoodDetails(recommendation);
  }, [detailsOpen]);

  const handleCloseModal = useCallback(() => {
    setDetailsOpen(false);
  }, [detailsOpen]);

  const setHoveredNutrient = useCallback(event => {
    setHoveredItem(event.currentTarget.dataset.label);
  }, [hoveredItem]);

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        {food && <FoodCard food={food} onShowMoreClick={showFoodDetails} onMouseOver={setHoveredNutrient} highlightItem={hoveredItem}/>}
      </div>
      <div className={classes.right}>
        {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
        {recommendation && <FoodCard food={recommendation} onShowMoreClick={showRecommendationDetails} onMouseOver={setHoveredNutrient} highlightItem={hoveredItem}/>}
      </div>
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
    width: '100%',
  },
  left: {
    width: '50%',
    margin: 'auto',
  },
  right: {
    width: '50%',
    margin: 'auto',
  }
};

export default withStyles(styles)(AddRecommendations);

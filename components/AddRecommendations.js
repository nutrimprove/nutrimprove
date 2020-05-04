import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getFoodById } from '../interfaces/api/foods';
import ResultsModal from './ResultsModal';
import { getMainNutrients, parseNutrients } from '../helpers/utils';
import FoodCard from './FoodCard';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendation, setRecommendation] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [leftCardNutrients, setLeftCardNutrients] = useState();
  const [rightCardNutrients, setRightCardNutrients] = useState();

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
      setLeftCardNutrients(getMainNutrients(foodResult));
      setRightCardNutrients(getMainNutrients(recommendationResult));
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
        {food && <FoodCard food={leftCardNutrients}
                           onShowMoreClick={showFoodDetails}
                           onMouseOver={setHoveredNutrient}
                           highlightItem={hoveredItem}
                           onFocus
        />}
      </div>
      <div className={classes.right}>
        {recommendation && <FoodCard food={rightCardNutrients}
                                     onShowMoreClick={showRecommendationDetails}
                                     onMouseOver={setHoveredNutrient}
                                     highlightItem={hoveredItem}
                                     onFocus
        />}
      </div>
      {detailsOpen && <ResultsModal data={foodDetails.nutrients}
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
  },
};

export default withStyles(styles)(AddRecommendations);

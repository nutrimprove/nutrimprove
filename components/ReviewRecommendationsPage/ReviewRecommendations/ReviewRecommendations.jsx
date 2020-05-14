import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CompareModal from '../../CompareModal';
import FoodCard from '../../FoodCard';
import { parseNutrients } from '../../../helpers/utils';
import { getAllRecommendations } from '../../../interfaces/api/recommendations';
import { getFoodById } from '../../../interfaces/api/foods';
import { Typography } from '@material-ui/core';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import ActionsContainer from '../../ActionsContainer';
import FoodCardWithSearch from '../../FoodCardWithSearch/FoodCardWithSearch';
import clsx from 'clsx';

const ReviewRecommendations = ({ classes }) => {
  const [recommendations, setRecommendations] = useState();
  const [recommendation, setRecommendation] = useState();
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [status, setStatus] = useState({});

  useEffect(() => {
    (async () => {
      const results = await getAllRecommendations();
      if (results && results.length > 0) {
        setRecommendations(results);
        getRecommendations(results[37]);
        console.log('=== AddRecommendations.jsx #32 === ( results[0] ) =======>', results[37]);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('=== ReviewRecommendations.jsx #27 === ( recommendations ) =======>', recommendations);
    setRecommendation();
  }, [recommendations]);

  const getRecommendations = async (recommendation) => {
    let foodResult;
    let recommendedFoodResult;

    await Promise.all([
      (async () => {
        foodResult = await getFoodById(recommendation.food.id);
      })(),
      (async () => {
        recommendedFoodResult = await getFoodById(recommendation.recommendation.id);
      })(),
    ]);

    if (foodResult && recommendedFoodResult) {
      setFood(foodResult);
      setRecommendedFood(recommendedFoodResult);
    }
  };

  const getFoodDetails = (food) => {
    const { foodName, proximates, vitamins, inorganics } = food;
    return {
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    };
  };

  const compareFoods = () => {
    setCompareOpen(true);
    const foodDetails = getFoodDetails(food);
    const recommendedFoodDetails = getFoodDetails(recommendedFood);
    setComparisonData([foodDetails, recommendedFoodDetails]);
  };

  const setHoveredNutrient = event => {
    setHoveredItem(event.currentTarget.dataset.name);
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

  return (
    <>
      {food && recommendedFood && (
        <>
          <div className={classes.cards}>
            <div className={classes.card}>
              <Typography className={classes.title} variant='subtitle1'>Food</Typography>
              <FoodCard food={food} onMouseOver={setHoveredNutrient} highlightItem={hoveredItem}/>
            </div>
            <div className={classes.card}>
              <Typography className={classes.title} variant='subtitle1'>Recommendation</Typography>
              <FoodCard food={recommendedFood} onMouseOver={setHoveredNutrient} highlightItem={hoveredItem}/>
            </div>
          </div>
          <ActionsContainer>
            <ButtonWithSpinner className={classes.button} colour='secondary' action={null}>Reject</ButtonWithSpinner>
            <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
            <ButtonWithSpinner className={clsx(classes.button, classes.greenButton)} action={null}>Approve</ButtonWithSpinner>
          </ActionsContainer>
          {compareOpen && <CompareModal dataSet={comparisonData} open={compareOpen} onClose={handleCloseModal}/>}
        </>
      )}
    </>
  );
};

ReviewRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ReviewRecommendations;

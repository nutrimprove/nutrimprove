import { Link, Typography } from '@material-ui/core';
import clsx from 'clsx';
import ActionsContainer from 'components/ActionsContainer';
import ButtonWithSpinner from 'components/ButtonWithSpinner';
import CompareModal from 'components/CompareModal';
import FoodCard from 'components/FoodCard';
import LoadingPanel from 'components/LoadingPanel';
import LoadingSpinner from 'components/LoadingSpinner';
import { parseNutrients } from 'helpers/utils';
import { getFoodById } from 'interfaces/api/foods';
import { applyRecommendationRating, getAllRecommendations } from 'interfaces/api/recommendations';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const getRandom = items => {
  return items[Math.floor(Math.random() * items.length)];
};

const ReviewRecommendations = ({ classes }) => {
  const [recommendations, setRecommendations] = useState();
  const [recommendation, setRecommendation] = useState();
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [comparisonData, setComparisonData] = useState();
  const { promiseInProgress: loadingRecommendations } = usePromiseTracker({ area: 'getAllRecommendations' });

  useEffect(() => {
    (async () => {
      const results = await getAllRecommendations();
      if (results) {
        setRecommendations(results);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (recommendations) {
        await getRecommendation();
      }
    })();
  }, [recommendations]);

  const getRecommendation = async () => {
    let foodResult;
    let recommendedFoodResult;
    const randomRecommendation = getRandom(recommendations);
    setRecommendation(randomRecommendation);
    if (randomRecommendation) {
      await Promise.all([
        (async () => {
          foodResult = await getFoodById(randomRecommendation.food.id);
        })(),
        (async () => {
          recommendedFoodResult = await getFoodById(randomRecommendation.recommendation.id);
        })(),
      ]);

      if (foodResult && recommendedFoodResult) {
        setFood(foodResult);
        setRecommendedFood(recommendedFoodResult);
      }
    } else {
      setFood(null);
      setRecommendedFood(null);
    }
  };

  const skipRecommendation = () => {
    const recs = recommendations.filter(rec => rec._id !== recommendation._id);
    setRecommendations(recs);
  };

  const rejectRecommendation = async () => {
    const rejectResult = await applyRecommendationRating(recommendation._id, -10, 'rejectRecommendation');
    if (rejectResult) {
      skipRecommendation();
    } else {
      console.log('Error rejecting recommendation with ID: ', recommendation._id);
    }
  };

  const approveRecommendation = async () => {
    const approveResult = await applyRecommendationRating(recommendation._id, 5, 'approveRecommendation');
    if (approveResult) {
      skipRecommendation();
    } else {
      console.log('Error approving recommendation with ID: ', recommendation._id);
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
      {loadingRecommendations && <LoadingPanel/>}
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
            <div>
              <ButtonWithSpinner
                className={classes.button}
                colour='secondary'
                action={rejectRecommendation}
                context='rejectRecommendation'
              >
                Reject
              </ButtonWithSpinner>
              <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
              <ButtonWithSpinner
                className={clsx(classes.button, classes.greenButton)}
                action={approveRecommendation}
                context='approveRecommendation'
              >
                Approve
              </ButtonWithSpinner>
            </div>
            <Link component='button' className={classes.skip} onClick={skipRecommendation}>
              <Typography>Skip this recommendation</Typography>
              <span className={classes.spinner}><LoadingSpinner context='getFoodData'/></span>

            </Link>
          </ActionsContainer>
          {compareOpen && <CompareModal dataSet={comparisonData} open={compareOpen} onClose={handleCloseModal}/>}
        </>
      )}
      {!recommendation && !loadingRecommendations &&
      <Typography className={classes.title}>No more recommendations!!</Typography>}
    </>
  );
};

ReviewRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ReviewRecommendations;

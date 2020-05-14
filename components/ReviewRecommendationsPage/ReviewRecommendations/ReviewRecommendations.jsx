import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CompareModal from '../../CompareModal';
import FoodCard from '../../FoodCard';
import { parseNutrients } from '../../../helpers/utils';
import { getAllRecommendations } from '../../../interfaces/api/recommendations';
import { getFoodById } from '../../../interfaces/api/foods';
import { Link, Typography } from '@material-ui/core';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import ActionsContainer from '../../ActionsContainer';
import clsx from 'clsx';
import { usePromiseTracker } from 'react-promise-tracker';
import LoadingPanel from '../../LoadingPanel';

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
  const { promiseInProgress: loading } = usePromiseTracker({ area: 'getAllRecommendations' });

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
            <div>
              <ButtonWithSpinner className={classes.button} colour='secondary' action={null}>Reject</ButtonWithSpinner>
              <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
              <ButtonWithSpinner className={clsx(classes.button, classes.greenButton)} action={null}>
                Approve
              </ButtonWithSpinner>
            </div>
            <Link component={'button'} className={classes.skip} onClick={skipRecommendation}><Typography>Skip this
              recommendation</Typography></Link>
          </ActionsContainer>
          {compareOpen && <CompareModal dataSet={comparisonData} open={compareOpen} onClose={handleCloseModal}/>}
        </>
      )}
      {!recommendation && !loading && <Typography className={classes.title}>No more recommendations!!</Typography>}
      {loading && <LoadingPanel />}
    </>
  );
};

ReviewRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ReviewRecommendations;

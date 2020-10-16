import ButtonWithSpinner from 'components/ButtonWithSpinner';
import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import LoadingPanel from 'components/LoadingPanel';
import LoadingSpinner from 'components/LoadingSpinner';
import { getFoodById, getHealthyUnflaggedFoods, setHealthyFlag } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const HealthySelection = ({ classes }) => {
  const [unflaggedFoods, setUnflaggedFoods] = useState();
  const [food, setFood] = useState();
  const [noMoreFoods, setNoMoreFoods] = useState(false);
  const { promiseInProgress: loadingUnflaggedFoods } = usePromiseTracker({ area: 'getFlaggedFoods' });
  const { promiseInProgress: loadingFoodData } = usePromiseTracker({ area: 'getFoodData' });
  const foodIndex = useRef(0);
  const loading = loadingUnflaggedFoods || !food;

  useEffect(() => {
    (async () => {
      const results = await getHealthyUnflaggedFoods();
      setUnflaggedFoods(results);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (unflaggedFoods) {
        await loadFood();
      }
    })();
  }, [unflaggedFoods]);

  const loadFood = async () => {
    if (foodIndex.current < unflaggedFoods.length) {
      const currentFood = await getFoodById(unflaggedFoods[foodIndex.current].foodCode);
      setFood(currentFood);
      foodIndex.current = foodIndex.current + 1;
    } else {
      setNoMoreFoods(true);
    }
  };

  const setHealthy = async () => {
    setHealthyFlag(food.foodCode, true);
    loadFood();
  };

  const setNonHealthy = async () => {
    setHealthyFlag(food.foodCode, false);
    loadFood();
  };

  const unflag = () => {
    setHealthyFlag(food.foodCode, null);
    loadFood();
  };

  return (
    <>
      {loading && !noMoreFoods && <LoadingPanel/>}
      {food && unflaggedFoods && !noMoreFoods && <div className={classes.container}>
        <div className={classes.card}>
          <CardTitle title='Food'>
            <span className={classes.foodLoading}>
              <LoadingSpinner context='getFoodData' size={18}/>
            </span>
          </CardTitle>
          <FoodCard food={food}/>
        </div>
        <div className={classes.options}>
          <ButtonWithSpinner className={classes.button} context='' action={setHealthy} colour='green' disabled={loadingFoodData}>
            Healthy
          </ButtonWithSpinner>
          <ButtonWithSpinner className={classes.button} context='' action={setNonHealthy} disabled={loadingFoodData} colour='secondary'>
            Not healthy
          </ButtonWithSpinner>
          <ButtonWithSpinner className={classes.button} context='' action={unflag} disabled={loadingFoodData}>
            Clear healthy flag
          </ButtonWithSpinner>
          <ButtonWithSpinner
            className={classes.button}
            action={loadFood}
            disabled={foodIndex.current >= unflaggedFoods.length - 1 || loadingFoodData}
            disabledText={!loadingFoodData && 'No more foods'}
          >
            Skip
          </ButtonWithSpinner>
        </div>
      </div>}
      {noMoreFoods && <div>No more foods!!</div>}
    </>
  );
};

HealthySelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HealthySelection;

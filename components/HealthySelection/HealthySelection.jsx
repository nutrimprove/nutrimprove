import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import LoadingPanel from 'components/LoadingPanel';
import LoadingSpinner from 'components/LoadingSpinner';
import MainButton from 'components/MainButton';
import RadioOptions from 'components/RadioOptions';
import {
  getFoodById,
  getHealthyFoods,
  getHealthyUnflaggedFoods,
  getNonHealthyFoods,
  setHealthyFlag,
} from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const flags = {
  UNFLAGGED: 'Unflagged',
  HEALTHY: 'Healthy',
  NONHEALTHY: 'Non Healthy',
};

const HealthySelection = ({ classes }) => {
  const [foods, setFoods] = useState();
  const [food, setFood] = useState();
  const [noMoreFoods, setNoMoreFoods] = useState(false);
  const [flagQuery, setFlagQuery] = useState(flags.UNFLAGGED);
  const { promiseInProgress: loadingUnflaggedFoods } = usePromiseTracker({ area: 'getFlaggedFoods' });
  const { promiseInProgress: loadingFoodData } = usePromiseTracker({ area: 'getFoodData' });
  const foodIndex = useRef(0);
  const loading = loadingUnflaggedFoods || !food;

  useEffect(() => {
    (async () => {
      let results;
      switch (flagQuery) {
        case flags.UNFLAGGED:
          results = await getHealthyUnflaggedFoods();
          break;
        case flags.HEALTHY:
          results = await getHealthyFoods();
          break;
        case flags.NONHEALTHY:
          results = await getNonHealthyFoods();
      }
      setFoods(results);
    })();
  }, [flagQuery]);

  useEffect(() => {
    (async () => {
      if (foods) {
        await loadFood();
      }
    })();
  }, [foods]);

  const HealthyFlagStatus = () => {
    if (food.healthy === null || typeof food.healthy === 'undefined') {
      return <span className={classes.unFlagged}>Not set</span>;
    }
    if (food.healthy) {
      return <span className={classes.healthy}>Healthy</span>;
    }
    if (food.healthy === false) {
      return <span className={classes.nonHealthy}>Non healthy</span>;
    }
  };

  const loadFood = async () => {
    if (foodIndex.current < foods.length) {
      const currentFood = await getFoodById(foods[foodIndex.current].foodCode);
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

  const handleFlagQueryChange = e => {
    setFood(null);
    setFlagQuery(e.target.value);
  };

  return (
    <div className={classes.container}>
      <RadioOptions options={Object.values(flags)} initialValue={flagQuery} onChange={handleFlagQueryChange}/>
      {loading && !noMoreFoods && <LoadingPanel/>}
      {food && foods && !noMoreFoods && <div className={classes.content}>
        <div className={classes.card}>
          <CardTitle title='Food'>
            <span className={classes.foodLoading}>
              <LoadingSpinner context='getFoodData' size={18}/>
            </span>
          </CardTitle>
          <FoodCard food={food}/>
        </div>
        <div className={classes.options}>
          <div className={classes.status}>Current flag: <HealthyFlagStatus/></div>
          <MainButton className={classes.button} action={setHealthy} colour='green'
                             disabled={loadingFoodData}>
            Healthy
          </MainButton>
          <MainButton className={classes.button} action={setNonHealthy} disabled={loadingFoodData}
                             colour='secondary'>
            Not healthy
          </MainButton>
          <MainButton className={classes.button} action={unflag} disabled={loadingFoodData}>
            Clear healthy flag
          </MainButton>
          <MainButton
            className={classes.button}
            action={loadFood}
            disabled={foodIndex.current >= foods.length - 1 || loadingFoodData}
            disabledText={!loadingFoodData && 'No more foods'}
          >
            Skip
          </MainButton>
        </div>
      </div>}
      {noMoreFoods && <div>No more foods!!</div>}
    </div>
  );
};

HealthySelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HealthySelection;

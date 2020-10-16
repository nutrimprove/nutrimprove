import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import LoadingPanel from 'components/LoadingPanel';
import { getFoodById, getHealthyUnflaggedFoods } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const HealthySelection = ({ classes }) => {
  const [unflaggedFoods, setUnflaggedFoods] = useState();
  const [index, setIndex] = useState();
  const [food, setFood] = useState();
  const { promiseInProgress: loadingUnflaggedFoods } = usePromiseTracker({ area: 'getFlaggedFoods' });
  const { promiseInProgress: loadingFoodData } = usePromiseTracker({ area: 'getFoodData' });

  const loading = loadingFoodData || loadingUnflaggedFoods || !food;

  useEffect(() => {
    (async () => {
      const results = await getHealthyUnflaggedFoods();
      if (results) {
        setUnflaggedFoods(results);
        setIndex(0);
        // Fetch first unflagged food
        const currentFood = await getFoodById(results[0].foodCode);
        setFood(currentFood);
      }
    })();
  }, []);

  return (
    <>
      {loading && <LoadingPanel/>}
      {food && <div className={classes.card}>
        <CardTitle title='Food'/>
        <FoodCard food={food}/>
      </div>}
    </>
  );
};

HealthySelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HealthySelection;

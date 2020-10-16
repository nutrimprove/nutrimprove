import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import { getFoodById, getHealthyUnflaggedFoods } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const HealthySelection = ({ classes }) => {
  const [unflaggedFoods, setUnflaggedFoods] = useState();
  const [index, setIndex] = useState();
  const [food, setFood] = useState();

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
      <div className={classes.card}>
        <CardTitle title='Food'/>
        <FoodCard food={food}/>
      </div>
    </>
  );
};

HealthySelection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default HealthySelection;

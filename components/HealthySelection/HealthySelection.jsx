import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import { getHealthyUnflaggedFoods } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const HealthySelection = ({ classes }) => {
  const [food, setFood] = useState();

  useEffect(() => {
    (async () => {
      const results = await getHealthyUnflaggedFoods();
      if (results) {
        console.log(`=== HealthySelection.jsx #14 === ( results ) =======>`, results);
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

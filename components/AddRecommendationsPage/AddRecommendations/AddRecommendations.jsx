import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodCardWithSearch from '../../FoodCardWithSearch';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import Typography from '@material-ui/core/Typography';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();

  const setHoveredNutrient = event => {
    setHoveredItem(event.currentTarget.dataset.label);
  };

  const compareFoods = () => {
    console.log('=== AddRecommendations.jsx #17 === ( food ) =======>', food);
    console.log('=== AddRecommendations.jsx #17 === ( recfood ) =======>', recommendedFood);
  };

  return (
    <div>
      <div className={classes.cards}>
        <FoodCardWithSearch title='Food'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='food'
                            foodInfo={setFood}
        />
        <FoodCardWithSearch title='Recommendation'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='recommendation'
                            foodInfo={setRecommendedFood}
        />
      </div>
      {food && recommendedFood && (
        <div className={classes.actions}>
          <Typography className={classes.recommendation}>
            You consider &apos;<span className={classes.recommendedFood}>{recommendedFood.foodName}</span>&apos;
            a healthier alternative to &apos;<span className={classes.food}>{food.foodName}</span>&apos;
          </Typography>
          <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
          <ButtonWithSpinner className={classes.button}>Add Recommendation</ButtonWithSpinner>
        </div>
      )}
    </div>
  );
};

AddRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddRecommendations;

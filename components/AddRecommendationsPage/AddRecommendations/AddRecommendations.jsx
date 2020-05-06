import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodCardWithSearch from '../../FoodCardWithSearch';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import Typography from '@material-ui/core/Typography';
import ScrollIntoView from '../../ScrollIntoView/ScrollIntoView';
import { parseNutrients } from '../../../helpers/utils';
import CompareModal from '../../CompareModal';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [comparisonData, setComparisonData] = useState();
  const title = `Comparison`;

  const setHoveredNutrient = event => {
    setHoveredItem(event.currentTarget.dataset.name);
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

  const handleCloseModal = () => {
    setCompareOpen(false);
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
        <ScrollIntoView className={classes.actions}>
          <Typography className={classes.recommendation}>
            You consider &apos;<span className={classes.recommendedFood}>{recommendedFood.foodName}</span>&apos;
            a healthier alternative to &apos;<span className={classes.food}>{food.foodName}</span>&apos;
          </Typography>
          <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
          <ButtonWithSpinner className={classes.button}>Add Recommendation</ButtonWithSpinner>
        </ScrollIntoView>
      )}
      {compareOpen && (
        <CompareModal dataSet={comparisonData}
                      open={compareOpen}
                      onClose={handleCloseModal}
                      title={title}
                      subtitle='Nutritional information per 100g of food'
        />)}
    </div>
  );
};

AddRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddRecommendations;
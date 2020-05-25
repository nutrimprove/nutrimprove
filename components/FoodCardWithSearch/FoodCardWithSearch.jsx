import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodById } from '../../interfaces/api/foods';
import { filterFoodNames } from '../../helpers/utils';
import FoodCard from '../FoodCard';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import SearchField from '../SearchField';

const FoodCardWithSearch = ({ classes, title, highlightItem, onHover, foodInfo, context }) => {
  const { foodNames, categories } = useSelector(state => state.globalState);
  const [selectedFood, setSelectedFood] = useState();
  const [food, setFood] = useState();
  const loading = foodNames.length === 0;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  const loadCardDetails = async () => {
    const foodResult = await getFoodById(selectedFood.foodCode, context);
    setFood(foodResult);
    foodInfo(foodResult);
  };

  const handleFoodSelection = async (event, value) => {
    setSelectedFood(value);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant='subtitle1'>{title}</Typography>
      <SearchField loading={loading}
                   onSelection={handleFoodSelection}
                   onButtonClick={loadCardDetails}
                   buttonContext={context}
                   values={filteredFoodNames}
                   width={260}
                   buttonDisabled={!selectedFood}
      />
      {food && (
        <FoodCard food={food} onMouseOver={onHover} highlightItem={highlightItem}/>
      )}
    </div>
  );
};

FoodCardWithSearch.propTypes = {
  title: PropTypes.string,
  onHover: PropTypes.func,
  highlightItem: PropTypes.string,
  foodInfo: PropTypes.func,
  context: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default FoodCardWithSearch;

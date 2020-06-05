import { Typography } from '@material-ui/core';
import { filterFoodNames } from 'helpers/utils';
import { getFoodById } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from '../FoodCard';
import SearchField from '../SearchField';

const FoodCardWithSearch = ({ classes, title, highlightItem, onHover, foodInfo, context }) => {
  const categories = useSelector(({ globalState }) => globalState.categories);
  const foodNames = useSelector(({ globalState }) => globalState.foodNames);
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

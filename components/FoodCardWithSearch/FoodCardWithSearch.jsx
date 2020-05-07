import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodById } from '../../interfaces/api/foods';
import { filterFoodNames } from '../../helpers/utils';
import FoodCard from '../FoodCard';
import AutoComplete from '../AutoComplete';
import ButtonWithSpinner from '../ButtonWithSpinner';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const FoodCardWithSearch = ({ classes, foodNames, categories, title, highlightItem, onHover, foodInfo, context }) => {
  const [selectedFood, setSelectedFood] = useState();
  const [food, setFood] = useState();
  const loading = foodNames.length === 0;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  // TEST CODE
  useEffect(() => {
    setSelectedFood({ foodCode: '13-146', foodName: 'Agar, dried', group: 'DG' });
  }, []);

  useEffect(() => {
    if (selectedFood) loadCardDetails();
  }, [selectedFood]);
// End of test code

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
      <div className={classes.search}>
        <AutoComplete
          width={260}
          values={filteredFoodNames}
          label='Type food'
          noMatchText='No food matched!!'
          labelProp='foodName'
          context='getNutrients'
          loading={loading}
          onChange={handleFoodSelection}
          strict={true}
        />
        <ButtonWithSpinner
          className={classes.button}
          context={context}
          action={loadCardDetails}
          disabled={!selectedFood}
        >
          Search
        </ButtonWithSpinner>
      </div>
      {food && (
        <div className={classes.card}>
          <FoodCard food={food} onMouseOver={onHover} highlightItem={highlightItem}/>
        </div>
      )}
    </div>
  );
};

FoodCardWithSearch.propTypes = {
  foodNames: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,
  title: PropTypes.string,
  onHover: PropTypes.func,
  highlightItem: PropTypes.string,
  foodInfo: PropTypes.func,
  context: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
    foodNames: states.globalState.foodNames,
  };
};

export default connect(mapStateToProps)(FoodCardWithSearch);

import CardTitle from 'components/CardTitle';
import { filterFoodNames } from 'helpers/utils';
import { getFoodById } from 'interfaces/api/foods';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FoodCard from '../FoodCard';
import SearchField from '../SearchField';

const FoodCardWithSearch = ({ title, highlightItem, onHover, onFoodLoad, context, buttonText, searchLabel, className, classes }) => {
  const categories = useSelector(({ globalState }) => globalState.categories);
  const foodNames = useSelector(({ globalState }) => globalState.foodNames);
  const [selectedFood, setSelectedFood] = useState();
  const [food, setFood] = useState();
  const loading = foodNames.length === 0;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  const loadCardDetails = async () => {
    const foodResult = await getFoodById(selectedFood.foodCode, context);
    setFood(foodResult);
    if (onFoodLoad) {
      onFoodLoad(foodResult);
    }
  };

  const handleFoodSelection = async (event, value) => {
    setSelectedFood(value);
  };

  return (
    <div className={className}>
      <CardTitle title={title}/>
      <div className={classes.searchAndCard}>
        <SearchField loading={loading}
                     onSelection={handleFoodSelection}
                     onButtonClick={loadCardDetails}
                     buttonContext={context}
                     values={filteredFoodNames}
                     width={260}
                     buttonDisabled={!selectedFood}
                     buttonText={buttonText}
                     label={searchLabel}
        />
        {food && (
          <FoodCard food={food} onMouseOver={onHover} highlightItem={highlightItem} scrollIntoView={true}/>
        )}
      </div>
    </div>
  );
};

FoodCardWithSearch.propTypes = {
  title: PropTypes.string,
  searchLabel: PropTypes.string,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onHover: PropTypes.func,
  highlightItem: PropTypes.string,
  onFoodLoad: PropTypes.func,
  context: PropTypes.string,
  buttonText: PropTypes.string,
};

export default FoodCardWithSearch;

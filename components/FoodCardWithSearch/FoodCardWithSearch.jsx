import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodById } from '../../interfaces/api/foods';
import ResultsModal from '../ResultsModal';
import { filterFoodNames, getMainNutrients, parseNutrients } from '../../helpers/utils';
import FoodCard from '../FoodCard';
import AutoComplete from '../AutoComplete';
import ButtonWithSpinner from '../ButtonWithSpinner';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const FoodCardWithSearch = ({ classes, foodNames, categories, title, highlightItem, onHover, foodInfo, context }) => {
  const [food, setFood] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [nutrients, setNutrients] = useState();
  const [foodDetails, setFoodDetails] = useState();
  const loading = foodNames.length === 0;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  const loadCardDetails = async () => {
    const foodResult = await getFoodById(selectedFood.foodCode, context);
    setFood(foodResult);
    setNutrients(getMainNutrients(foodResult));
    foodInfo(foodResult);
  };

  const showFoodDetails = () => {
    const { foodName, proximates, vitamins, inorganics } = food;
    setDetailsOpen(true);
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    });
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
  };

  const handleFoodSelection = (event, value) => {
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
      {nutrients && (
        <div className={classes.card}>
          <FoodCard food={nutrients}
                    onShowMoreClick={showFoodDetails}
                    onMouseOver={onHover}
                    highlightItem={highlightItem}/>
        </div>)}
      {detailsOpen && (
        <ResultsModal data={foodDetails.nutrients}
                      open={detailsOpen}
                      onClose={handleCloseModal}
                      title={foodDetails.foodName}
                      subtitle='Nutritional information per 100g of food'/>)}
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

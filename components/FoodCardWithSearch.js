import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getFoodById } from '../interfaces/api/foods';
import ResultsModal from './ResultsModal';
import { getMainNutrients, parseNutrients } from '../helpers/utils';
import FoodCard from './FoodCard';
import AutoComplete from './AutoComplete';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

const FoodCardWithSearch = ({ classes, foodNames, categories, title, highlightItem, onMouseOver }) => {
  const [food, setFood] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [nutrients, setNutrients] = useState();
  const [foodDetails, setFoodDetails] = useState();
  const loading = foodNames.length === 0;

  const loadCardDetails = async () => {
    const foodResult = await getFoodById(selectedFood.foodCode);
    setFood(foodResult);
    setNutrients(getMainNutrients(foodResult));
  };

  const loadFoodDetails = foodObj => {
    const { foodName, proximates, vitamins, inorganics } = foodObj;
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    });
  };

  const showFoodDetails = () => {
    setDetailsOpen(true);
    loadFoodDetails(food);
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
  };

  const getFilteredFoodNames = () => {
    if (foodNames) {
      const selectedFilters = categories.selectedGroups;
      return foodNames.filter(({ group }) => selectedFilters.find(filter => group.match(`^(${filter})(.*)`)));
    }
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{title}</Typography>
      <div className={classes.search}>
        <AutoComplete
          width={260}
          values={getFilteredFoodNames()}
          label='Type food'
          noMatchText='No food matched!!'
          labelProp='foodName'
          context='getNutrients'
          loading={loading}
          onChange={setSelectedFood}
          strict={true}
        />
        <ButtonWithSpinner
          className={classes.button}
          context='getFoodData'
          action={loadCardDetails}
          disabled={!setSelectedFood}
        >
          Search
        </ButtonWithSpinner>
      </div>
      {food && (
        <div className={classes.card}>
          <FoodCard food={nutrients} onShowMoreClick={showFoodDetails} onMouseOver={onMouseOver}
                    highlightItem={highlightItem} onFocus
          />
        </div>)}
      {detailsOpen && <ResultsModal data={foodDetails.nutrients} open={detailsOpen} onClose={handleCloseModal}
                                    title={foodDetails.foodName} subtitle='Nutritional information per 100g of food'/>}
    </div>
  );
};

FoodCardWithSearch.propTypes = {
  foodNames: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,
  title: PropTypes.string,
  onMouseOver: PropTypes.func,
  highlightItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
    foodNames: states.globalState.foodNames,
  };
};

const styles = {
  root: {
    display: 'inline-block',
    maxWidth: 1400,
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    padding: 10,
  },
  search: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
    margin: 'auto',
  },
  button: {
    margin: 10,
  },
  card: {
    margin: 'auto',
    marginTop: 20,
    width: 430,
  },
};

export default connect(mapStateToProps)(withStyles(styles)(FoodCardWithSearch));

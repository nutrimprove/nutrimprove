import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import { getNutritionalData, getSearchedTerms } from '../connect/api';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import ButtonWithSpinner from './ButtonWithSpinner';
import SearchFoodField from './SearchFoodField';
import { trackPromise } from 'react-promise-tracker';
import { INPUT_TRIGGER_TIME } from '../helpers/constants';

let timeout = null;

const sectionHeader = {
  title: 'Search food by name',
  subtitle: 'Search for a food in the general food database',
};

const styles = {
  textField: {
    width: 200,
    margin: '-10px 10px 10px 0',
  },
};

const parseNutrients = nutrients => {
  const nutrientsObj = [];
  const keys = Object.keys(nutrients);
  keys.map(key => {
    const nutrient = nutrients[key];
    nutrientsObj.push({
      nutrient: nutrient.label,
      quantity: `${Number.parseFloat(nutrient.quantity).toFixed(2)} (${
        nutrient.unit
      })`,
    });
  });
  return nutrientsObj;
};

const FoodByName = ({ classes }) => {
  const [food, setFood] = useState({
    name: null,
    id: null,
    suggestions: [],
  });
  const [foodData, setFoodData] = useState();

  const updateState = async (selectedFood, value) => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const search = await trackPromise(
        getSearchedTerms(value),
        `getSearchTerms-${selectedFood.id}`
      );

      if (search && search.matches) {
        const suggestions = search.matches.map(match => ({
          food_name: match.food_name,
          food_id: match.food_id,
        }));
        const selected = suggestions.find(
          suggestion => suggestion.food_name === value
        );
        setFood({
          name: selected.food_name,
          id: selected.food_id,
          suggestions,
        });
      }
    }, INPUT_TRIGGER_TIME);
  };

  const updateResults = async () => {
    const data = await getNutritionalData(food.id);
    const nutrients = parseNutrients(data.totalNutrients);
    setFoodData(nutrients);
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <SearchFoodField
        food={food}
        loadingContext={`getSearchTerms-${food.id}`}
        action={updateState}
      />
      <ButtonWithSpinner
        action={updateResults}
        context='getNutritionalData'
        disabled={!food.id}
      >
        Search
      </ButtonWithSpinner>
      {foodData && <ResultsTable values={foodData} />}
    </>
  );
};

FoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodByName);

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
  subtitle:
    'Searches and displays the available nutritional data for that food item',
};

const emptyFood = {
  name: null,
  id: null,
  suggestions: [],
};

const parseNutrients = nutrients => {
  const nutrientsObj = [];
  const keys = Object.keys(nutrients);
  keys.map(key => {
    const nutrient = nutrients[key];
    nutrientsObj.push({
      nutrient: nutrient.label,
      'quantity (unit)': `${Number.parseFloat(nutrient.quantity).toFixed(
        2
      )} (${nutrient.unit})`,
    });
  });
  return nutrientsObj;
};

const SearchFood = ({ classes }) => {
  const [food, setFood] = useState(emptyFood);
  const [searchTerm, setSearchTerm] = useState();
  const [foodData, setFoodData] = useState();

  const updateState = async (selectedFood, value) => {
    clearTimeout(timeout);
    setFood(emptyFood);
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
        const selected =
          suggestions.find(suggestion => suggestion.food_name === value) ||
          search.matches[0].food_name;
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
    setSearchTerm(food.name);
    setFoodData(nutrients);
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <div className={classes.search}>
        <SearchFoodField
          food={food}
          loadingContext={`getSearchTerms-${food.id}`}
          action={updateState}
        />
        <div className={classes.button}>
          <ButtonWithSpinner
            className={classes.button}
            action={updateResults}
            context='getNutritionalData'
            disabled={!food.id}
          >
            Search
          </ButtonWithSpinner>
        </div>
      </div>
      {foodData && (
        <ResultsTable
          values={foodData}
          title={`Nutritional values per 100g of ${searchTerm}`}
        />
      )}
    </>
  );
};

SearchFood.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  search: {
    display: 'inline-flex',
  },
  button: {
    marginLeft: 10,
  },
};

export default withStyles(styles)(SearchFood);

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
      quantity: `${Number.parseFloat(nutrient.quantity).toFixed(2)} ${
        nutrient.unit
      }`,
    });
  });
  return nutrientsObj;
};

const combineResults = (nutrients, dailyValues) => {
  const combined = [...nutrients];
  return combined.map(nutrient => {
    const dailyValue = dailyValues.find(
      value => value.nutrient === nutrient.nutrient
    );
    return {
      ...nutrient,
      rdi: dailyValue ? dailyValue.quantity : '',
    };
  });
};

const SearchFood = ({ classes }) => {
  const [food, setFood] = useState(emptyFood);
  const [searchTerm, setSearchTerm] = useState();
  const [foodData, setFoodData] = useState();
  const [secondColumnData, setSecondColumnData] = useState();

  const updateState = async (selectedFood, value) => {
    clearTimeout(timeout);
    setFood(emptyFood);
    timeout = setTimeout(async () => {
      const search = await trackPromise(
        getSearchedTerms(value),
        'getSearchTerms'
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
    const data = await trackPromise(
      getNutritionalData(food.id),
      'getNutritionalData'
    );

    if (data && data.totalNutrients) {
      const nutrients = parseNutrients(data.totalNutrients);
      const daily = parseNutrients(data.totalDaily);
      const combinedResults = combineResults(nutrients, daily);
      setSearchTerm(food.name);
      let secondNutrientList;
      if (combinedResults.length > 6) {
        const total = combinedResults.length;
        const slicePosition =
          (total % 2) % 2 === 0 ? total / 2 : total / 2 + 1;
        secondNutrientList = combinedResults.splice(
          slicePosition,
          combinedResults.length
        );
        setSecondColumnData(secondNutrientList);
      }
      setFoodData(combinedResults);
    }
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <div className={classes.search}>
        <SearchFoodField
          food={food}
          loadingContext='getSearchTerms'
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
      <div className={classes.tables}>
        {foodData && (
          <>
            <div className={classes.title}>
              Nutritional values per 100g of &apos;
              <span className={classes.term}>{searchTerm}&apos;</span>
            </div>
            <div className={classes.table}>
              <ResultsTable values={foodData} />
            </div>
          </>
        )}
        {secondColumnData && (
          <div className={classes.table}>
            <ResultsTable values={secondColumnData} />
          </div>
        )}
      </div>
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
  tablesContainer: {
    display: 'block',
  },
  table: {
    display: 'inline-flex',
    marginRight: 30,
  },
  title: {
    display: 'block',
    marginTop: 30,
    fontFamily: 'sans-serif, arial',
    fontSize: '1em',
  },
  term: {
    fontWeight: 'bold',
  },
};

export default withStyles(styles)(SearchFood);

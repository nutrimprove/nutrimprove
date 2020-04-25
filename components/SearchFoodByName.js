import React, { useState } from 'react';
import { getNutritionData } from '../interfaces/api/nutrition';
import withStyles from '@material-ui/core/styles/withStyles';
import { EDAMAM_DB } from '../helpers/constants';
import Results from './Results';
import AutoComplete from './AutoComplete';
import ButtonWithSpinner from './ButtonWithSpinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const parseNutrients = nutrients => {
  const nutrientsObj = [];
  const keys = Object.keys(nutrients);
  keys.map(key => {
    const nutrient = nutrients[key];
    if (!isNaN(nutrient.quantity) && nutrient.quantity > 0) {
      nutrientsObj.push({
        nutrient: nutrient.label,
        quantity: `${Number.parseFloat(nutrient.quantity).toFixed(2)} ${
          nutrient.unit
          }`,
      });
    }
  });
  return nutrientsObj;
};

const mergeEdamamResults = (nutrients, dailyValues) => {
  const combined = [...nutrients];
  return combined.map(nutrient => {
    const dailyValue = dailyValues.find(
      value => value.nutrient === nutrient.nutrient,
    );
    return {
      ...nutrient,
      rdi: dailyValue ? dailyValue.quantity : '',
    };
  });
};

const SearchFoodByName = ({ categories, foodNames, classes }) => {
  const [selectedFood, setSelectedFood] = useState();
  const [foods, setFoods] = useState();
  const loading = foodNames.length === 0;

  const updateResults = async () => {
    const data = await getNutritionData(selectedFood.foodCode);
    if (data) {
      let combinedResults;
      if (EDAMAM_DB && data.totalNutrients) {
        const nutrients = parseNutrients(data.totalNutrients);
        const daily = parseNutrients(data.totalDaily);
        combinedResults = mergeEdamamResults(nutrients, daily);
      } else {
        const proximates = parseNutrients(data.proximates);
        const vitamins = parseNutrients(data.vitamins);
        const minerals = parseNutrients(data.inorganics);
        combinedResults = [...proximates, ...vitamins, ...minerals];
      }
      setFoods(combinedResults);
    }
  };

  const getFilteredFoodNames = () => {
    if (foodNames) {
      const selectedFilters = categories.filter(category => category.selected).map(category => category.group);
      return foodNames.filter(({ group }) => selectedFilters.find(filter => group.match(`^(${filter})(.*)`)));
    }
  };

  return (
    <>
      <div className={classes.search}>
        <AutoComplete
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
          context='getFoodsByNutrient'
          action={updateResults}
          disabled={!selectedFood}
        >
          Search
        </ButtonWithSpinner>
      </div>
      {foods && <Results list={foods} title='Nutritional values per 100g of food'/>}
    </>
  );
};

SearchFoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
  foodNames: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
    foodNames: states.globalState.foodNames,
  };
};

const styles = {
  search: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
  },
  button: {
    margin: 10,
  },
};

export default connect(mapStateToProps)(withStyles(styles)(SearchFoodByName));

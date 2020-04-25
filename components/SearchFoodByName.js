import React, { useState } from 'react';
import { getNutritionData } from '../interfaces/api/nutrition';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SearchFoodSet from './SearchFoodSet';
import { EDAMAM_DB } from '../helpers/constants';
import { splitList } from '../helpers/utils';
import Results from './Results';

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

const SearchFoodByName = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [foodData, setFoodData] = useState();
  const [secondColumnData, setSecondColumnData] = useState();

  const updateResults = async food => {
    const data = await getNutritionData(food.id);
    if (data) {
      let combinedResults;
      if (EDAMAM_DB && data.totalNutrients) {
        const nutrients = parseNutrients(data.totalNutrients);
        const daily = parseNutrients(data.totalDaily);
        combinedResults = mergeEdamamResults(nutrients, daily);
        setSearchTerm(food.name);
      } else {
        const proximates = parseNutrients(data.proximates);
        const vitamins = parseNutrients(data.vitamins);
        const minerals = parseNutrients(data.inorganics);
        combinedResults = [...proximates, ...vitamins, ...minerals];
        setSearchTerm(food.name);
      }
      const results = splitList(combinedResults);
      setFoodData(results[0]);
      setSecondColumnData(results[1]);
    }
  };

  return (
    <>
      <SearchFoodSet action={updateResults} context='getFoodData'/>
      {foodData && <Results list={foodData} title={`Nutritional values per 100g of '${searchTerm}'`}/>}
      {secondColumnData && <Results list={secondColumnData}/>}
    </>
  );
};

SearchFoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
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

export default withStyles(styles)(SearchFoodByName);

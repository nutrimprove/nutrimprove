import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import { getNutritionData } from '../interfaces/api/nutrition';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SearchFood from './SearchFood';
import { EDAMAM_DB } from '../helpers/constants';
import SearchFilters from './SearchFilters';

const sectionHeader = {
  title: 'Search food by name',
  subtitle: 'Search for a food to display its nutritional data',
};

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

const SearchFoodPage = ({ classes }) => {
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
      let secondNutrientList;
      // Organises data in 2 columns if enough data exists
      if (combinedResults.length > 6) {
        const total = combinedResults.length;
        const slicePosition =
          (total % 2) % 2 === 0 ? total / 2 : total / 2 + 1;
        secondNutrientList = combinedResults.splice(
          slicePosition,
          combinedResults.length,
        );
        setFoodData(combinedResults);
        setSecondColumnData(secondNutrientList);
      }
    }
  };

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <SearchFood action={updateResults} context='getFoodData'/>
      <SearchFilters />
      <div className={classes.tables}>
        {foodData && (
          <>
            <div className={classes.title}>
              Nutritional values per 100g of &apos;
              <span className={classes.term}>{searchTerm}&apos;</span>
            </div>
            <div className={classes.table}>
              <ResultsTable values={foodData}/>
            </div>
          </>
        )}
        {secondColumnData && (
          <div className={classes.table}>
            <ResultsTable values={secondColumnData}/>
          </div>
        )}
      </div>
    </>
  );
};

SearchFoodPage.propTypes = {
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

export default withStyles(styles)(SearchFoodPage);

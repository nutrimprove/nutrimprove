import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import { getNutritionalData } from '../connect/api';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SearchFood from './SearchFood';

const sectionHeader = {
  title: 'Search food by name',
  subtitle: 'Search for a food to display its nutritional data',
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

const SearchFoodPage = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [foodData, setFoodData] = useState();
  const [secondColumnData, setSecondColumnData] = useState();

  const updateResults = async food => {
    const data = await getNutritionalData(food.id);

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
      <SearchFood action={updateResults} context='getNutritionalData' />
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

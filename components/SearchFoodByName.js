import React, { useState } from 'react';
import { getNutritionData } from '../interfaces/api/nutrition';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoComplete from './AutoComplete';
import ButtonWithSpinner from './ButtonWithSpinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseNutrients } from '../helpers/utils';
import ResultsTable from './ResultsTable';
import Typography from '@material-ui/core/Typography';

const SearchFoodByName = ({ categories, foodNames, classes }) => {
  const [selectedFood, setSelectedFood] = useState();
  const [data, setData] = useState();
  const loading = foodNames.length === 0;

  const updateResults = async () => {
    const data = await getNutritionData(selectedFood.foodCode);
    if (data) {
      const proximates = parseNutrients(data.proximates);
      const vitamins = parseNutrients(data.vitamins);
      const minerals = parseNutrients(data.inorganics);
      const combinedResults = [...proximates, ...vitamins, ...minerals];
      setData(combinedResults);
    }
  };

  const getFilteredFoodNames = () => {
    if (foodNames) {
      const selectedFilters = categories.selectedGroups;
      return foodNames.filter(({ group }) => selectedFilters.find(filter => group.match(`^(${filter})(.*)`)));
    }
  };

  return (
    <>
      <Typography variant='subtitle2' paragraph={true}>Search for a food to display its nutritional data</Typography>
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
          context='getFoodData'
          action={updateResults}
          disabled={!selectedFood}
        >
          Search
        </ButtonWithSpinner>
      </div>
      {data && <ResultsTable data={data} title='Nutritional values per 100g of food'/>}
    </>
  );
};

SearchFoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
  foodNames: PropTypes.array.isRequired,
  categories: PropTypes.object.isRequired,
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

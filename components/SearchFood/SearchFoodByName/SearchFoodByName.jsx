import React, { useState } from 'react';
import { getNutritionData } from '../../../interfaces/api/nutrition';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterFoodNames, parseNutrients } from '../../../helpers/utils';
import ResultsTable from '../../ResultsTable';
import Typography from '@material-ui/core/Typography';
import SearchField from '../../SearchField';
import SectionHeader from '../../SectionHeader';
import Filters from '../../Filters';

const sectionHeader = {
  title: 'Search Food by Name',
  subtitle: 'Search for a food to display its nutritional data (use the filters to refine your search)',
};

const SearchFoodByName = ({ categories, foodNames, classes }) => {
  const [selectedFood, setSelectedFood] = useState();
  const [data, setData] = useState();
  const loading = foodNames.length === 0;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  const updateResults = async () => {
    const data = await getNutritionData(selectedFood.foodCode);
    if (data) {
      const proximates = parseNutrients({ nutrients: data.proximates });
      const vitamins = parseNutrients({ nutrients: data.vitamins });
      const minerals = parseNutrients({ nutrients: data.inorganics });
      const combinedResults = [...proximates, ...vitamins, ...minerals];
      setData(combinedResults);
    }
  };

  const handleFoodSelection = (event, value) => {
    setSelectedFood(value);
  };

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <Filters/>
      <SearchField loading={loading}
                   onSelection={handleFoodSelection}
                   onButtonClick={updateResults}
                   buttonContext='getFoodData'
                   values={filteredFoodNames}
                   disabled={!selectedFood}
      />
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

export default connect(mapStateToProps)(SearchFoodByName);

import Filters from 'components/Filters';
import ResultsTable from 'components/ResultsTable';
import SearchField from 'components/SearchField';
import { filterFoodNames, parseNutrients } from 'helpers/utils';
import { getNutritionData } from 'interfaces/api/nutrition';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchFoodByName = () => {
  const categories = useSelector(({ globalState }) => globalState.categories);
  const foodNames = useSelector(({ globalState }) => globalState.foodNames);
  const [selectedFood, setSelectedFood] = useState();
  const [data, setData] = useState();
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
      <Filters/>
      <SearchField loading={!filteredFoodNames}
                   onSelection={handleFoodSelection}
                   onButtonClick={updateResults}
                   buttonContext='getFoodData'
                   values={filteredFoodNames}
                   buttonDisabled={!selectedFood}
      />
      {data && <ResultsTable data={data} title='Nutritional values per 100g of food' sortColumns={['nutrient']}/>}
    </>
  );
};

export default SearchFoodByName;

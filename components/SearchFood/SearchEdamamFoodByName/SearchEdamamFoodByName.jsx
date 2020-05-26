import ResultsTable from 'components/ResultsTable';
import SearchField from 'components/SearchField';
import { mapSearchResults, parseNutrients } from 'helpers/utils';
import { getSearchedTerms } from 'interfaces/api/edamamFoods';
import { getNutritionData } from 'interfaces/api/nutrition';
import React, { useEffect, useState } from 'react';

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

const SearchEdamamFoodByName = () => {
  const [selectedFood, setSelectedFood] = useState();
  const [searchTerms, setSearchTerms] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [foods, setFoods] = useState();

  useEffect(() => {
    (async () => {
      if (searchInput && searchInput.length > 2) {
        const search = await getSearchedTerms(searchInput, 'getSearchTerms');
        const mappedSearchResults = mapSearchResults(search);
        if (mappedSearchResults) {
          const terms = mappedSearchResults.map(food => ({
            foodName: food.food_name,
            foodCode: food.food_id,
          }));
          setSearchTerms(terms);
        }
      }
    })();
  }, [searchInput]);

  const updateResults = async () => {
    const data = await getNutritionData(selectedFood.foodCode);
    if (data) {
      const nutrients = parseNutrients(data.totalNutrients);
      const daily = parseNutrients(data.totalDaily);
      const combinedResults = mergeEdamamResults(nutrients, daily);
      setFoods(combinedResults);
    }
  };

  return (
    <>
      <SearchField loading={searchTerms.length === 0}
                   onSelection={setSelectedFood}
                   onButtonClick={updateResults}
                   optionsContext='getSearchTerms'
                   buttonContext='getFoodData'
                   values={searchTerms}
                   disabled={!selectedFood}
      />
      {foods && <ResultsTable data={foods} title='Nutritional values per 100g of food'/>}
    </>
  );
};

export default SearchEdamamFoodByName;

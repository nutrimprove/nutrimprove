import SearchFoodByNutrient from 'components/SearchFoodByNutrient';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Search Foods by Nutrient',
  subtitle: 'List the foods with the highest level of a specific nutrient (use the filters to refine your search)',
};

const SearchByNutrientPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <SearchFoodByNutrient/>
  </>
);

export default SearchByNutrientPage;
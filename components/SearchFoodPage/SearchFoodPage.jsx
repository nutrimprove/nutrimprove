import React from 'react';
import SectionHeader from '../SectionHeader';
import SearchFilters from '../SearchFilters';
import SearchFoodByNutrient from './SearchFoodByNutrient';
import SearchFoodByName from './SearchFoodByName';
import { EDAMAM_DB } from '../../helpers/constants';
import SearchEdamamFoodByName from './SearchEdamamFoodByName';
import TabbedPanel from '../TabbedPanel';

const sectionHeader = {
  title: 'Search food',
  subtitle: 'Search for a food to display its nutritional data (use the filters to refine your search)',
};

const SearchFoodPage = () => {
  const edamamTab = [{
    label: 'Search by name',
    content: <SearchEdamamFoodByName/>,
  }];

  const tabs = [
    {
      label: 'Search by name',
      content: <SearchFoodByName/>,
    },
    {
      label: 'Search by nutrient',
      content: <SearchFoodByNutrient/>,
    },
  ];

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <SearchFilters/>
      <TabbedPanel tabs={EDAMAM_DB ? edamamTab : tabs}/>
    </>
  );
};

export default SearchFoodPage;

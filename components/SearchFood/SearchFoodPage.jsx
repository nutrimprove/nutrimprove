import { EDAMAM_DB } from 'helpers/constants';
import React from 'react';
import Filters from '../Filters';
import SectionHeader from '../SectionHeader';
import TabbedPanel from '../TabbedPanel';
import SearchEdamamFoodByName from './SearchEdamamFoodByName';
import SearchFoodByName from './SearchFoodByName';
import SearchFoodByNutrient from './SearchFoodByNutrient';

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
      <Filters/>
      <TabbedPanel tabs={EDAMAM_DB ? edamamTab : tabs}/>
    </>
  );
};

export default SearchFoodPage;

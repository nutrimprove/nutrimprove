import SearchFoodByName from 'components/SearchFoodByName';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Search Food by Name',
  subtitle: 'Search for a food to display its nutritional data (use the filters to refine your search)',
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <SearchFoodByName/>
  </>
);

export default ReviewRecommendationsPage;
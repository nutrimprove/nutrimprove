import AddBulkRecommendations from 'components/AddBulkRecommendations';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Bulk Add Recommendations',
  subtitle: 'Choose the foods and the recommendations you would like to provide in an N to N relation',
};

const BulkAddRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AddBulkRecommendations/>
  </>
);

export default BulkAddRecommendationsPage;

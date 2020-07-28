import AddRecommendations from 'components/AddRecommendations';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Add Recommendations',
  subtitle: 'Choose the foods and the recommendations you would like to provide',
};

const AddRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AddRecommendations/>
  </>
);

export default AddRecommendationsPage;

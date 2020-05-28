import SectionHeader from 'components/SectionHeader';
import ViewAllRecommendations from 'components/ViewAllRecommendations';
import React from 'react';

const sectionHeader = {
  title: 'All Recommendations',
  subtitle: 'Search and view existing recommendations',
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <ViewAllRecommendations/>
  </>
);

export default ReviewRecommendationsPage;
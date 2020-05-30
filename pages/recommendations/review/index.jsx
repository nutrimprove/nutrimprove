import ReviewRecommendations from 'components/ReviewRecommendations';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Review Recommendations',
  subtitle: 'Review recommendations added by other contributors',
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <ReviewRecommendations/>
  </>
);

export default ReviewRecommendationsPage;
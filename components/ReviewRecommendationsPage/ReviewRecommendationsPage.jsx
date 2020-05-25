import React from 'react';
import SectionHeader from '../SectionHeader';
import ReviewRecommendations from './ReviewRecommendations';

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

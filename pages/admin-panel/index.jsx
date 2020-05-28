import AdminPanel from 'components/AdminPanel';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Administration panel',
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AdminPanel/>
  </>
);

export default ReviewRecommendationsPage;

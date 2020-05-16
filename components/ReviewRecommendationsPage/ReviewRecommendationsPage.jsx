import React from 'react';
import SectionHeader from '../SectionHeader';
import Link from '@material-ui/core/Link';
import Filters from '../Filters';
import ReviewRecommendations from './ReviewRecommendations';

const helpMessage = (
  <>
    Please refer to the <Link href={'/help#add_recs'}>Help page</Link>
    {' '}for instructions.
  </>
);

const sectionHeader = {
  title: 'Review Recommendations',
  subtitle: 'Review recommendations added by other contributors',
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <Filters/>
    <ReviewRecommendations />
  </>
);

export default ReviewRecommendationsPage;

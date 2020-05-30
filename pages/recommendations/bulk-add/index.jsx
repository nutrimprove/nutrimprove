import Link from '@material-ui/core/Link';
import AddBulkRecommendations from 'components/AddBulkRecommendations';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const helpMessage = (
  <>
    Please refer to the <Link href={'/help#add_recs'}>Help page</Link>
    {' '}for instructions.
  </>
);

const sectionHeader = {
  title: 'Bulk Add Recommendations',
  subtitle: 'Choose the foods and the recommendations you would like to provide in an N to N relation',
  messages: [helpMessage],
};

const ReviewRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AddBulkRecommendations/>
  </>
);

export default ReviewRecommendationsPage;

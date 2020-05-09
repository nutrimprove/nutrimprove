import React from 'react';
import SectionHeader from '../SectionHeader';
import Link from '@material-ui/core/Link';
import Filters from '../Filters';
import TabbedPanel from '../TabbedPanel';
import AddBulkRecommendations from './AddBulkRecommendations';
import AddRecommendations from './AddRecommendations';

const helpMessage = (
  <>
    Please refer to the <Link href={'/help#add_recs'}>Help page</Link>
    {' '}for instructions.
  </>
);

const sectionHeader = {
  title: 'Add Recommendations',
  subtitle: 'Choose the foods and the recommendations you would like to provide',
  messages: [helpMessage],
};

const tabs = [
  { label: 'By cards', content: <AddRecommendations/> },
  { label: 'Bulk add', content: <AddBulkRecommendations/> },
];

const AddRecommendationsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <Filters/>
    <TabbedPanel tabs={tabs}/>
  </>
);

export default AddRecommendationsPage;

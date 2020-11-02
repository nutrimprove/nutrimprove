import ContributorsStatus from 'components/ContributorsStatus';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Contributors Status',
  subtitle: 'Check contributors data',
};

const HealthySelectionPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <ContributorsStatus/>
  </>
);

export default HealthySelectionPage;

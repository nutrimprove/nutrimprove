import HealthySelection from 'components/HealthySelection';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Is it healthy?',
  subtitle: 'Mark the foods you consider healthy',
};

const HealthySelectionPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <HealthySelection/>
  </>
);

export default HealthySelectionPage;

import HealthySelection from 'components/HealthySelection';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Healthy Selection',
  subtitle: 'Mark the foods you consider healthy or non healthy',
};

const HealthySelectionPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <HealthySelection/>
  </>
);

export default HealthySelectionPage;

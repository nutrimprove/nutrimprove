import React from 'react';
import SectionHeader from './SectionHeader';

const title = 'Eatwell';
const subtitle = 'Please login to be able to use the website!';

const PleaseLoginMessage = () => {
  return (
    <>
      <SectionHeader title={title} subtitle={subtitle} />
    </>
  );
};

export default PleaseLoginMessage;

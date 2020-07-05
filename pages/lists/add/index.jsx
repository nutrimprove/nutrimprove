import AddList from 'components/AddList';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Add Lists',
  subtitle: 'Choose a group of foods and quantities and save them as a list',
};

const AddListPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AddList/>
  </>
);

export default AddListPage;

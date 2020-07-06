import AddList from 'components/AddList';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const sectionHeader = {
  title: 'Add List',
  subtitle: 'Choose foods and save them as a list',
};

const AddListPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <AddList/>
  </>
);

export default AddListPage;

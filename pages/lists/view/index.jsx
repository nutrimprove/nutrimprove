import SectionHeader from 'components/SectionHeader';
import ViewLists from 'components/ViewLists';
import React from 'react';

const sectionHeader = {
  title: 'View Lists',
  subtitle: 'List and View your saved lists',
};

const ViewListsPage = () => (
  <>
    <SectionHeader content={sectionHeader}/>
    <ViewLists/>
  </>
);

export default ViewListsPage;

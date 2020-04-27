import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SearchFilters from './SearchFilters';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './TabContainer';
import SearchFoodByNutrient from './SearchFoodByNutrient';
import SearchFoodByName from './SearchFoodByName';
import { EDAMAM_DB } from '../helpers/constants';
import SearchEdamamFoodByName from './SearchEdamamFoodByName';

const sectionHeader = {
  title: 'Search food',
  subtitle: 'Search for a food to display its nutritional data (use the filters to refine your search)',
};

const SearchFoodPage = ({ classes }) => {
  const [tab, setTab] = useState(0);

  const tabChange = (event, tab) => {
    setTab(tab);
  };

  const tabbedPanelEdamam = () => (
    <>
      <Tabs indicatorColor='primary' value={tab} onChange={tabChange}>
        <Tab className={classes.tab} label='Search by name'/>
      </Tabs>
      <TabContainer value={tab} index={0}>
        <SearchEdamamFoodByName/>
      </TabContainer>
    </>
  );

  const tabbedPanel = () => (
    <div className={classes.tabContent}>
      <Tabs indicatorColor='secondary' value={tab} onChange={tabChange}>
        <Tab className={classes.tab} label='Search by name'/>
        <Tab className={classes.tab} label='Search by Nutrient'/>
      </Tabs>
      <TabContainer value={tab} index={0}>
        <SearchFoodByName/>
      </TabContainer>
      <TabContainer value={tab} index={1}>
        <SearchFoodByNutrient/>
      </TabContainer>
    </div>
  );

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <SearchFilters/>
      {EDAMAM_DB ? tabbedPanelEdamam() : tabbedPanel()}
    </>
  );
};

SearchFoodPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  tab: {
    '&:not(.Mui-selected)': {
      backgroundColor: '#3F51B5',
      color: 'lightgrey',
    },
    '&.Mui-selected': {
      backgroundColor: '#3F51B5',
      color: 'white',
    },
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '9px 9px 0 0',
    fontSize: '0.7em',
  },
  tabContent: {
    marginTop: 15,
  },
  container: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '9px 9px 0 0',
  },
};

export default withStyles(styles)(SearchFoodPage);

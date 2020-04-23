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

const sectionHeader = {
  title: 'Search food',
  subtitle: 'Search for a food to display its nutritional data (use the filters to refine your search)',
};

const SearchFoodPage = ({ classes }) => {
  const [tab, setTab] = useState(0);

  const tabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <SearchFilters/>
      <Tabs indicatorColor='primary' value={tab} onChange={tabChange}>
        <Tab className={classes.tab} label='Search by name'/>
        <Tab className={classes.tab} label='Search by Nutrient'/>
      </Tabs>
      <TabContainer value={tab} index={0}>
        <SearchFoodByName/>
      </TabContainer>
      <TabContainer value={tab} index={1}>
        <SearchFoodByNutrient/>
      </TabContainer>

    </>
  );
};

SearchFoodPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = {
  tab: {
    backgroundColor: 'white',
    color: '#3f51b5',
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderWidth: '1px 1px 0 1px',
    borderRadius: '9px 9px 0 0',
    fontSize: 'small',
  },
  container: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '9px 9px 0 0',
  },
};

export default withStyles(styles)(SearchFoodPage);

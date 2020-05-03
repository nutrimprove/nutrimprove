import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import SearchFoodPage from './SearchFoodPage';
import ViewRecommendationsPage from './ViewRecommendationsPage';
import AddRecommendationsPage from './AddRecommendationsPage';
import AdminPanel from './AdminPanel';
import { connect } from 'react-redux';
import { isAdmin } from '../helpers/userUtils';
import { MIN_WIDTH } from '../helpers/constants';
import TabContainer from './TabContainer';

const MainNav = ({ classes, userDetails }) => {
  const [tab, setTab] = useState(2);

  const tabChange = (event, tab) => {
    setTab(tab);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.tabs}>
        <Tabs value={tab} onChange={tabChange}>
          <Tab label='Search Food'/>
          <Tab label='View Recommendations'/>
          <Tab label='Add Recommendations'/>
          {userDetails.approved && isAdmin(userDetails) && (
            <Tab label='Admin Panel'/>
          )}
        </Tabs>
      </AppBar>
      <TabContainer value={tab} index={0}>
        <SearchFoodPage/>
      </TabContainer>
      <TabContainer value={tab} index={1}>
        <ViewRecommendationsPage/>
      </TabContainer>
      <TabContainer value={tab} index={2}>
        <AddRecommendationsPage/>
      </TabContainer>
      <TabContainer value={tab} index={3}>
        <AdminPanel/>
      </TabContainer>
    </div>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    minWidth: MIN_WIDTH,
  },
  tabs: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});

const mapStateToProps = states => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(MainNav));

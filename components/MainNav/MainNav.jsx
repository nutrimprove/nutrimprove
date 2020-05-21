import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar/index';
import SearchFoodPage from '../SearchFoodPage';
import ViewRecommendationsPage from '../ViewRecommendationsPage';
import AddRecommendationsPage from '../AddRecommendationsPage';
import AdminPanel from '../AdminPanel';
import { connect } from 'react-redux';
import { isAdmin } from '../../helpers/userUtils';
import TabContainer from '../TabContainer';
import ReviewRecommendationsPage from '../ReviewRecommendationsPage';
import MenuDropdown from '../MenuDropdown';

const menuOptionsList = [
  [
    { label: 'By Food Name', link: '#', value: 0 },
    { label: 'By Nutrient', link: '#', value: 0 },
  ],
  [
    { label: 'Your Recommendations', link: '#', value: 1 },
    { label: 'All Recommendations', link: '#', value: 1 },
  ],
  [
    { label: 'By Cards', link: '#', value: 2 },
    { label: 'Bulk Add', link: '#', value: 2 },
  ],

];

const MainNav = ({ classes, userDetails }) => {
  const [page, setPage] = useState(0);

  const handleClick = item => {
    console.log('=== MainNav.jsx #42 === ( value ) =======>', item.value);
    setPage(item.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.tabs}>
        <MenuDropdown name={'Search Food'} items={menuOptionsList[0]} onClick={handleClick}/>
        <MenuDropdown name={'View Recommendations'} items={menuOptionsList[1]} onClick={handleClick}/>
        <MenuDropdown name={'Add Recommendations'} items={menuOptionsList[2]} onClick={handleClick}/>
        <MenuDropdown name={'Review Recommendations'} onClick={handleClick}/>
        {userDetails.approved && isAdmin(userDetails) && (
          <MenuDropdown name={'Admin Panel'} onClick={handleClick}/>
        )}
      </AppBar>
      <TabContainer value={page} index={0}>
        <SearchFoodPage/>
      </TabContainer>
      <TabContainer value={page} index={1}>
        <ViewRecommendationsPage/>
      </TabContainer>
      <TabContainer value={page} index={2}>
        <AddRecommendationsPage/>
      </TabContainer>
      <TabContainer value={page} index={3}>
        <ReviewRecommendationsPage/>
      </TabContainer>
      <TabContainer value={page} index={4}>
        <AdminPanel/>
      </TabContainer>
    </div>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(mapStateToProps, null)(MainNav);

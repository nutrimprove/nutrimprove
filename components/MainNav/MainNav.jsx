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
import Button from '@material-ui/core/Button';

const menus = [
  {
    name: 'Search Food',
    options: [
      { label: 'By Food Name', link: '#', value: 0 },
      { label: 'By Nutrient', link: '#', value: 0 },
    ],
  },
  {
    name: 'View Recommendations',
    options: [
      { label: 'Your Recommendations', link: '#', value: 1 },
      { label: 'All Recommendations', link: '#', value: 1 },
    ],
  },
  {
    name: 'Add Recommendations',
    options: [
      { label: 'By Cards', link: '#', value: 2 },
      { label: 'Bulk Add', link: '#', value: 2 },
    ],
  },

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
        {menus.map(menu => (
          <MenuDropdown key={menu.name} name={menu.name} items={menu.options} onClick={handleClick}/>
        ))}
        <Button className={classes.button} onClick={() => setPage(3)}>Review Recommendations</Button>
        {userDetails.approved && isAdmin(userDetails) && (
          <Button className={classes.button} onClick={() => setPage(4)}>Admin Panel</Button>
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

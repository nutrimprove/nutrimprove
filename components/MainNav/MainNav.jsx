import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar/index';
import { useSelector } from 'react-redux';
import { isAdmin } from '../../helpers/userUtils';
import MenuDropdown from '../MenuDropdown';
import Button from '@material-ui/core/Button';
import ReviewRecommendationsPage from '../ReviewRecommendationsPage';
import AdminPanel from '../AdminPanel';
import YourRecommendations from '../ViewRecommendations/YourRecommendations';
import AllRecommendations from '../ViewRecommendations/AllRecommendations';
import SearchFoodByName from '../SearchFood/SearchFoodByName';
import SearchFoodByNutrient from '../SearchFood/SearchFoodByNutrient';
import AddRecommendations from '../AddRecommendations/AddRecommendations';
import AddBulkRecommendations from '../AddRecommendations/AddBulkRecommendations';

const menus = [
  {
    name: 'Search Food',
    options: [
      { label: 'By Food Name', value: 0 },
      { label: 'By Nutrient', value: 1 },
    ],
  },
  {
    name: 'Recommendations',
    options: [
      { label: 'View Your Recommendations', value: 2 },
      { label: 'View All Recommendations', value: 3 },
      { divider: true },
      { label: 'Add Recomemndations', value: 4 },
      { label: 'Bulk Add Recommendations', value: 5 },
      { divider: true },
      { label: 'Review Recommendations', value: 6 },
    ],
  },
];

const renderComponent = index => {
  switch (index) {
    case 0:
      return <SearchFoodByName/>;
    case 1:
      return <SearchFoodByNutrient/>;
    case 2:
      return <YourRecommendations/>;
    case 3:
      return <AllRecommendations/>;
    case 4:
      return <AddRecommendations/>;
    case 5:
      return <AddBulkRecommendations/>;
    case 6:
      return <ReviewRecommendationsPage/>;
    case 7:
      return <AdminPanel/>;
    default:
      return null;
  }
};

const MainNav = ({ classes }) => {
  const userDetails = useSelector(({globalState}) => globalState.userDetails);
  const [page, setPage] = useState(0);

  const handleClick = item => {
    setPage(item.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.tabs}>
        {menus.map(menu => (
          <MenuDropdown key={menu.name} name={menu.name} items={menu.options} onClick={handleClick}/>
        ))}
        {userDetails.approved && isAdmin(userDetails) && (
          <Button className={classes.button} onClick={() => setPage(7)}>Admin Panel</Button>
        )}
      </AppBar>
      <div className={classes.content}>
        {renderComponent(page)}
      </div>
    </div>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainNav;

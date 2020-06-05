import { AppBar } from '@material-ui/core';
import MenuButton from 'components/Header/MainNav/MenuButton';
import PropTypes from 'prop-types';
import React from 'react';

const menus = [
  {
    name: 'Search Food',
    options: [
      { label: 'By Food Name', link: '/search/food' },
      { label: 'By Nutrient', link: '/search/nutrient' },
    ],
  },
  {
    name: 'Recommendations',
    options: [
      { label: 'View Your Recommendations', link: '/recommendations/view' },
      { label: 'View All Recommendations', link: '/recommendations/view-all' },
      { divider: true },
      { label: 'Add Recommendations', link: '/recommendations/add' },
      { label: 'Bulk Add Recommendations', link: '/recommendations/bulk-add' },
      { divider: true },
      { label: 'Review Recommendations', link: '/recommendations/review' },
    ],
  },
];

const adminOption = {
  name: 'Admin Panel',
  link: '/admin-panel',
};

const MainNav = ({ classes }) => {

  return (
    <AppBar position='static' classes={{ root: classes.menuBar }}>
      {/* <Typography className={classes.welcomeText}>Welcome to Nutrimprove</Typography> */}
      <div className={classes.container}>
        {menus.map(menu => (
          <MenuButton key={menu.name} menu={menu}/>
        ))}
        {/* {userDetails.approved && isAdmin(userDetails) && ( */}
        <MenuButton menu={adminOption}/>
        {/* )} */}
      </div>
    </AppBar>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainNav;

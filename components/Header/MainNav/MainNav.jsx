import { AppBar, Typography } from '@material-ui/core';
import MenuButton from 'components/Header/MainNav/MenuButton';
import { emailVerified, isAdmin, isApproved } from 'helpers/userUtils';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

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
      { label: 'View Yours', link: '/recommendations/view' },
      { label: 'View All', link: '/recommendations/view-all' },
      { divider: true },
      { label: 'Add', link: '/recommendations/add' },
      { label: 'Bulk Add', link: '/recommendations/bulk-add' },
      { divider: true },
      { label: 'Review', link: '/recommendations/review' },
    ],
  },
];

const adminOption = {
  name: 'Admin Panel',
  link: '/admin-panel',
};

const MainNav = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const disabled = !userDetails || !userDetails.email || !emailVerified() || !isApproved();

  return (
    <AppBar position='static' classes={{ root: classes.menuBar }}>
      <div className={classes.container}>
        {menus.map(menu => (
          <MenuButton key={menu.name} menu={menu} disabled={disabled}/>
        ))}
        {isAdmin(userDetails) && (
          <MenuButton menu={adminOption}/>
        )}
        {userDetails && userDetails.email && emailVerified() && !userDetails.approved && (
          <Typography className={classes.waitingForAdmin}>Waiting for an Admin Approval</Typography>
        )}
      </div>
    </AppBar>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainNav;

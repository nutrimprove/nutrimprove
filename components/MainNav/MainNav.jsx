import { AppBar, Button } from '@material-ui/core';
import { isAdmin } from 'helpers/userUtils';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import MenuDropdown from '../MenuDropdown';

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

const MainNav = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);

  return (
    <div className={classes.root}>
      <AppBar position='static' classes={{ root: classes.menuBar }}>
        {menus.map(menu => (
          <MenuDropdown key={menu.name} menu={menu}/>
        ))}
        {userDetails.approved && isAdmin(userDetails) && (
          <Link href="/admin-panel">
            <Button className={classes.button}>
              Admin Panel
            </Button>
          </Link>
        )}
      </AppBar>
    </div>
  );
};

MainNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainNav;

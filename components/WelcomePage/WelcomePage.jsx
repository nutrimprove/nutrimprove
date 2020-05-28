import React from 'react';
import PropTypes from 'prop-types';

const WelcomePage = ({ classes }) => {
  return (
    <>
      Welcome to Nutrimprove
    </>
  );
};

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default WelcomePage;

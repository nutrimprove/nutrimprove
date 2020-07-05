import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const FoodList = ({ classes }) => {
  const preferences = useSelector(({ globalState }) => globalState.preferences);

  return (
    <>

    </>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FoodList;

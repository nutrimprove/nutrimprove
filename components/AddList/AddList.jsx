import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();

  return (
    <>
      <Filters/>
      <FoodCardWithSearch title='Food' foodInfo={setFood}/>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

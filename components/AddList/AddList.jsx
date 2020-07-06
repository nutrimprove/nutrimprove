import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import FoodList from 'components/FoodList';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();

  return (
    <>
      <Filters/>
      <div className={classes.container}>
        <FoodCardWithSearch title='Food' foodInfo={setFood}/>
        <FoodList/>
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

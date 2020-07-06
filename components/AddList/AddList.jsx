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
        <div className={classes.column}>
          <FoodCardWithSearch title='Food' foodInfo={setFood}/>
        </div>
        <div className={classes.column}>
          <FoodList/>
        </div>
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

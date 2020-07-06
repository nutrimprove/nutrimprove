import Typography from '@material-ui/core/Typography';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import FoodList from 'components/FoodList';
import MainButton from 'components/MainButton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();
  const [foodList, setFoodList] = useState();
  const [status, setStatus] = useState();

  const addToList = () => {
    if (foodList) {
      const inList = foodList.find(foodItem => foodItem.foodCode === food.foodCode);
      if (inList) {
        setStatus('Already present in list');
        return;
      }
      setFoodList([...foodList, food]);
    } else {
      setFoodList([food]);
    }
    setFood(null);
    setStatus(null);
  };

  return (
    <>
      <Filters/>
      <Typography color='secondary'>{status}</Typography>
      <div className={classes.container}>
        <div className={classes.foodColumn}>
          <FoodCardWithSearch title='Food' onFoodLoad={setFood} buttonText='Select' className={classes.foodCard}/>
          {!food
            ? <MainButton disabled={true} className={classes.addToListButton}>Select New Food</MainButton>
            : (
              <MainButton action={addToList} className={classes.addToListButton}>
                <span className={classes.addToListText}>Add Food to List</span>
                <ArrowForwardIosRoundedIcon fontSize='small'/>
              </MainButton>
            )
          }
        </div>
        <FoodList className={classes.foodList} foods={foodList}/>
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

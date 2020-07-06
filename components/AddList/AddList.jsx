import Typography from '@material-ui/core/Typography';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import MainButton from 'components/MainButton';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewFoodListAction } from 'store/global/actions';
import FoodListCard from './FoodListCard';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();
  const [foodList, setFoodList] = useState([]);
  const [status, setStatus] = useState();
  const [listName, setListName] = useState('New List');
  const dispatch = useDispatch();
  const saveNewList = useCallback((name, foods) => dispatch(saveNewFoodListAction(name, foods)), []);
  const lists = useSelector(({ globalState }) => globalState.lists);

  useEffect(() => {
    if (lists) {
      const newFoodList = lists.find(list => list.id === -1);
      if (newFoodList) {
        setFoodList(newFoodList.foods);
        setListName(newFoodList.name);
      }
    }
  }, []);

  const addToList = () => {
    let foods = [];
    if (foodList) {
      const inList = foodList.find(foodItem => foodItem.foodCode === food.foodCode);
      if (inList) {
        setStatus('Already present in list');
        return;
      }
      foods = [...foodList, food];
    } else {
      foods = [food];
    }
    setFoodList(foods);
    saveNewList(listName, foods);
    setFood(null);
    setStatus(null);
  };

  const saveListName = name => {
    setListName(name);
    saveNewList(name, foodList);
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
        <FoodListCard className={classes.foodList} title={listName} foods={foodList} onListNameChange={saveListName}/>
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

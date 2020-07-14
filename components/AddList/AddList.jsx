import { TextField, Typography } from '@material-ui/core';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import MainButton from 'components/MainButton';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewFoodListAction } from 'store/global/actions';
import FoodListPanel from './FoodListPanel';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [addButtonText, setAddButtonText] = useState('Select food');
  const [foodList, setFoodList] = useState([]);
  const [listName, setListName] = useState('New List');
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const saveNewList = useCallback((name, foods) => dispatch(saveNewFoodListAction(name, foods)), []);
  const lists = useSelector(({ globalState }) => globalState.lists);

  const ALREADY_IN_LIST_TEXT = 'Food already in list';

  useEffect(() => {
    if (lists) {
      const newFoodList = lists.find(list => list.id === -1);
      if (newFoodList) {
        setFoodList(newFoodList.foods);
        setListName(newFoodList.name);
      }
    }
  }, []);

  useEffect(() => {
    !foodList.find(food => food.foodCode === selectedFood.foodCode)
      ? setFood(selectedFood)
      : setAddButtonText(ALREADY_IN_LIST_TEXT);
  }, [selectedFood]);

  const addToList = () => {
    food.quantity = quantity || 100;
    const foods = foodList ? [...foodList, food] : [food];
    setFoodList(foods);
    saveNewList(listName, foods);
    setFood(null);
    setAddButtonText(ALREADY_IN_LIST_TEXT);
    setQuantity(null);
  };

  const saveListName = name => {
    setListName(name);
    saveNewList(name, foodList);
  };

  const removeFood = ({ currentTarget }) => {
    const foodKey = currentTarget.dataset.key;
    setFoodList(foodList.filter(food => food.foodCode !== currentTarget.dataset.key));
    if (foodKey === selectedFood.foodCode) {
      setFood(selectedFood);
    }
  };

  const handleQuantityChange = ({currentTarget}) => {
    setQuantity(currentTarget.value);
  };

  const editQuantity = target => {
    const foodIndex = foodList.findIndex(food => food.foodCode === target.dataset.key);
    const newList = cloneDeep(foodList);
    newList[foodIndex].quantity = target.value;
    setFoodList(newList);
  };

  return (
    <>
      <Filters/>
      <Typography color='secondary'>{status}</Typography>
      <div className={classes.container}>
        <div className={classes.foodColumn}>
          <FoodCardWithSearch title='Food'
                              onFoodLoad={setSelectedFood}
                              buttonText='Select'
          />
          <div className={classes.addToListButton}>
            {!food
              ? <MainButton disabled={true} className={classes.addToListButton}>{addButtonText}</MainButton>
              : (
                <>
                  <TextField className={classes.quantity}
                             size='small'
                             helperText='default: 100g'
                             type='number'
                             label='Type quantity'
                             placeholder='100'
                             onChange={handleQuantityChange}
                             InputProps={{ endAdornment: 'g' }}
                             title='Type quantity (in grams)'
                  />
                  <MainButton action={addToList} className={classes.addToListButton}>
                    <span className={classes.addToListText}>Add Food to List</span>
                    <ArrowForwardIosRoundedIcon fontSize='small'/>
                  </MainButton>
                </>
              )
            }
          </div>
        </div>
        <FoodListPanel className={classes.foodList}
                       title={listName}
                       foods={foodList}
                       onListNameChange={saveListName}
                       onDelete={removeFood}
                       onEditQuantity={editQuantity}
        />
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

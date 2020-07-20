import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import EditableText from 'components/EditableText';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import MainButton from 'components/MainButton';
import { addList, editList } from 'interfaces/api/users';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentListAction } from 'store/global/actions';
import FoodListPanel from './FoodListPanel';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [addButtonText, setAddButtonText] = useState('Select food');
  const [foodList, setFoodList] = useState();
  const [listName, setListName] = useState();
  const [quantity, setQuantity] = useState(100);
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const currentList = useSelector(({ globalState }) => globalState.currentList);
  const dispatch = useDispatch();
  const saveListToState = useCallback(list => dispatch(setCurrentListAction(list)), []);

  const ALREADY_IN_LIST_TEXT = 'Food already in list';
  const DEFAULT_LIST_OBJECT = { id: -1, name: 'New List', foods: [] };

  useEffect(() => {
    if (currentList) {
        setFoodList(currentList.foods);
        setListName(currentList.name);
    } else {
      addList(user, DEFAULT_LIST_OBJECT);
      saveListToState(DEFAULT_LIST_OBJECT);
    }
  }, [currentList]);

  useEffect(() => {
    if (selectedFood) {
      !foodList.find(food => food.foodCode === selectedFood.foodCode)
        ? setFood(selectedFood)
        : setAddButtonText(ALREADY_IN_LIST_TEXT);
    }
  }, [selectedFood]);

  const formattedList = list => ({
    ...list,
    foods: list.foods.map(food => ({
      quantity: food.quantity,
      foodCode: food.foodCode,
      foodName: food.foodName,
    })),
  });

  const saveListToStateAndDB = ({ foods = foodList, name = listName, id = -1 }) => {
    const list = { foods, name, id };
    if (id === -1) {
      editList(user, formattedList(list));
      saveListToState(list);
    } else {
      editList(user, DEFAULT_LIST_OBJECT);
      addList(user, formattedList(list));
      saveListToState(DEFAULT_LIST_OBJECT);
      setFood(selectedFood);
    }
  };

  const addToList = () => {
    food.quantity = quantity;
    const foods = foodList.length > 0 ? [...foodList, food] : [food];
    saveListToStateAndDB({ foods });

    setFood(null);
    setAddButtonText(ALREADY_IN_LIST_TEXT);
    setQuantity(100);
  };

  const saveListName = ({ value }) => {
    if (value !== '') {
      saveListToStateAndDB({ name: value });
    }
  };

  const removeFood = ({ currentTarget }) => {
    const foodKey = currentTarget.dataset.key;
    const newList = foodList.filter(food => food.foodCode !== foodKey);
    saveListToStateAndDB({ foods: newList });
    if (selectedFood && foodKey === selectedFood.foodCode) {
      setFood(selectedFood);
    }
  };

  const handleQuantityChange = target => {
    setQuantity(Number(target.value));
  };

  const editFoodInListQuantity = target => {
    const foodIndex = foodList.findIndex(food => food.foodCode === target.dataset.key);
    const foods = cloneDeep(foodList);
    foods[foodIndex].quantity = Number(target.value);
    saveListToStateAndDB({ foods });
  };

  const handleSaveButtonClick = () => {
    saveListToStateAndDB({ id: Date.now() });
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
          {food && <Paper className={classes.quantity}>
            <Typography>Amount:&nbsp;</Typography>
            <EditableText size='medium'
                          value={quantity}
                          min={0.1}
                          max={9999}
                          type='number'
                          datakey={selectedFood.foodCode}
                          onChange={handleQuantityChange}
                          className={classes.quantityField}
            >
              g
            </EditableText>
          </Paper>}
          <div className={classes.addToListButtonContainer}>
            {!food
              ? <MainButton disabled={true} className={classes.addToListButton}>{addButtonText}</MainButton>
              : (
                <MainButton action={addToList} className={classes.addToListButton}>
                  <span className={classes.addToListText}>Add Food to List</span>
                  <ArrowForwardIosRoundedIcon fontSize='small'/>
                </MainButton>
              )
            }
          </div>
        </div>
        <FoodListPanel className={classes.foodList}
                       title={listName}
                       foods={foodList}
                       onListNameChange={saveListName}
                       onDelete={removeFood}
                       onEditQuantity={editFoodInListQuantity}
                       onSaveButtonClick={handleSaveButtonClick}
        />
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

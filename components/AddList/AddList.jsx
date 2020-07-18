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
import { saveNewFoodListAction } from 'store/global/actions';
import FoodListPanel from './FoodListPanel';

const AddList = ({ classes }) => {
  const [food, setFood] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [addButtonText, setAddButtonText] = useState('Select food');
  const [foodList, setFoodList] = useState([]);
  const [listName, setListName] = useState('New List');
  const [quantity, setQuantity] = useState(100);
  const dispatch = useDispatch();
  const saveListToState = useCallback(list => dispatch(saveNewFoodListAction(list)), []);
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const lists = useSelector(({ globalState }) => globalState.lists);

  const ALREADY_IN_LIST_TEXT = 'Food already in list';

  useEffect(() => {
    if (lists.length > 0) {
      const newFoodList = lists.find(list => list.id === -1);
      if (newFoodList) {
        setFoodList(newFoodList.foods);
        setListName(newFoodList.name);
      }
    }
  }, [lists]);

  useEffect(() => {
    !foodList.find(food => food.foodCode === selectedFood.foodCode)
      ? setFood(selectedFood)
      : setAddButtonText(ALREADY_IN_LIST_TEXT);
  }, [selectedFood]);

  const addToList = () => {
    food.quantity = quantity;
    let foods, saveList;
    if (foodList.length > 0) {
      foods = [...foodList, food];
      saveList = editList;
    } else {
      foods = [food];
      saveList = addList;
    }
    const list = { foods, name: listName, id: -1 };
    saveList(user, list);
    setFoodList(foods);
    saveListToState(list);

    setFood(null);
    setAddButtonText(ALREADY_IN_LIST_TEXT);
    setQuantity(100);
  };

  const saveListName = ({ value }) => {
    setListName(value);
    saveListToState(value, foodList);
  };

  const removeFood = ({ currentTarget }) => {
    const foodKey = currentTarget.dataset.key;
    const newList = foodList.filter(food => food.foodCode !== foodKey);
    setFoodList(newList);
    saveListToState(listName, newList);
    if (foodKey === selectedFood.foodCode) {
      setFood(selectedFood);
    }
  };

  const handleQuantityChange = target => {
    setQuantity(target.value);
  };

  const editFoodInListQuantity = target => {
    const foodIndex = foodList.findIndex(food => food.foodCode === target.dataset.key);
    const newList = cloneDeep(foodList);
    newList[foodIndex].quantity = Number(target.value);
    setFoodList(newList);
    saveListToState(listName, newList);
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
        />
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

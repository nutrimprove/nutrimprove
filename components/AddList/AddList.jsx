import Typography from '@material-ui/core/Typography';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import MainButton from 'components/MainButton';
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

  useEffect(() => {
    !foodList.find(food => food.foodCode === selectedFood.foodCode)
      ? setFood(selectedFood)
      : setAddButtonText('Food already in list');
  }, [selectedFood]);

  const addToList = () => {
    const foods = foodList ? [...foodList, food] :  [food];
    setFoodList(foods);
    saveNewList(listName, foods);
    setFood(null);
  };

  const saveListName = name => {
    setListName(name);
    saveNewList(name, foodList);
  };

  const removeFood = ({currentTarget}) => {
    const foodKey = currentTarget.dataset.key;
    setFoodList(foodList.filter(food => food.foodCode !== currentTarget.dataset.key));
    if (foodKey === selectedFood.foodCode) {
      setFood(selectedFood);
    }
  };

  return (
    <>
      <Filters/>
      <Typography color='secondary'>{status}</Typography>
      <div className={classes.container}>
        <div className={classes.foodColumn}>
          <FoodCardWithSearch title='Food' onFoodLoad={setSelectedFood} buttonText='Select' className={classes.foodCard}/>
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
        <FoodListPanel className={classes.foodList} title={listName} foods={foodList} onListNameChange={saveListName} onDelete={removeFood}/>
      </div>
    </>
  );
};

AddList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddList;

import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SearchField from 'components/SearchField';
import { filterFoodNames } from 'helpers/utils';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainButton from 'components/MainButton';
import RemoveIcon from 'components/RemoveIcon';

const MAX_FIELDS = 5;

const getNewField = () => ({
  key: uniqueId(),
  foodCode: '',
  foodName: '',
});

const RepeatableFoodsPanel = ({ classes, title, foods, isValid }) => {
  const foodNames = useSelector(({ globalState }) => globalState.foodNames);
  const categories = useSelector(({ globalState }) => globalState.categories);
  const [selectedFoods, setSelectedFoods] = useState([getNewField()]);
  const addButtonDisabled = selectedFoods.length >= MAX_FIELDS;
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  useEffect(() => {
    foods(selectedFoods);
  }, [selectedFoods]);

  const addEmptyField = () => {
    setSelectedFoods([...selectedFoods, getNewField()]);
  };

  const setFood = (newFood, fieldKey) => {
    const foodIndex = selectedFoods.findIndex(({ key }) => key === fieldKey);
    const updatedFoods = [...selectedFoods];
    updatedFoods.splice(foodIndex, 1, { ...selectedFoods[foodIndex], ...newFood });
    setSelectedFoods(updatedFoods);
  };

  const removeField = ({ currentTarget }) => {
    setSelectedFoods(selectedFoods.filter(({ key }) => key !== currentTarget.dataset.key));
  };

  return (
    <Paper className={classes.fieldBox}>
      <Typography className={classes.title} component='h4'>
        {title}
      </Typography>
      <>
        {selectedFoods.map(food => (
          <div key={food.key} className={classes.searchfood}>
            {/*<SearchInputField*/}
            {/*  isValid={isValid(food)}*/}
            {/*  foodAction={setFood}*/}
            {/*  foodKey={food.key}*/}
            {/*/>*/}
            <SearchField showButton={false}
                         loading={!foodNames}
                         onSelection={(event, value) => setFood(value, food.key)}
                         buttonContext='getFoodData'
                         values={filteredFoodNames}
                         className={classes.searchField}
            />
            <RemoveIcon className={classes.removeIcon} dataKey={food.key} onClick={removeField} disabled={selectedFoods.length <= 1}/>
          </div>
        ))}
        <MainButton action={addEmptyField} disabled={addButtonDisabled}>Add</MainButton>
      </>
    </Paper>
  );
};

RepeatableFoodsPanel.propTypes = {
  foods: PropTypes.func,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  isValid: PropTypes.func,
};

export default RepeatableFoodsPanel;

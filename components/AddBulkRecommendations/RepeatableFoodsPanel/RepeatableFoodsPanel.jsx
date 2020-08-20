import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import MainButton from 'components/MainButton';
import RemoveIcon from 'components/RemoveIcon';
import SearchField from 'components/SearchField';
import { filterFoodNames } from 'helpers/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

const RepeatableFoodsPanel = ({ classes, title, foods, onSelection, onAdd, onRemove, validation, invalidFoods = [], maxFields }) => {
  const foodNames = useSelector(({ globalState }) => globalState.foodNames);
  const categories = useSelector(({ globalState }) => globalState.categories);
  const filteredFoodNames = filterFoodNames(foodNames, categories.selectedGroups);

  const isInvalid = food => invalidFoods.find(({ foodCode }) => foodCode === food.foodCode);

  return (
    <Paper className={classes.fieldBox}>
      <Typography className={classes.title} component='h4'>
        {title}
      </Typography>
      <>
        {foods.map(food => (
          <div key={food.key} className={classes.searchfood}>
            <SearchField showButton={false}
                         loading={!foodNames}
                         onSelection={(event, value) => onSelection(value, food.key)}
                         buttonContext='getFoodData'
                         values={filteredFoodNames}
                         className={validation && isInvalid(food) ? classes.invalidField : classes.searchField}
            />
            <RemoveIcon className={classes.removeIcon} dataKey={food.key} onClick={onRemove} disabled={foods.length <= 1}/>
          </div>
        ))}
        <MainButton action={onAdd} disabled={foods.length >= maxFields}>Add</MainButton>
      </>
    </Paper>
  );
};

RepeatableFoodsPanel.propTypes = {
  foods: PropTypes.func,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  validation: PropTypes.bool,
  onAdd: PropTypes.func,
  onSelection: PropTypes.func,
  onRemove: PropTypes.func,
  invalidFoods: PropTypes.array,
  maxFields: PropTypes.number,
};

export default RepeatableFoodsPanel;

import { Typography, withStyles } from '@material-ui/core';
import MainButton from './MainButton';
import React from 'react';
import PropTypes from 'prop-types';
import RemoveIcon from './RemoveIcon';
import SearchInputField from './SearchInputField';

const maxFields = 4;

const RepeatableFoodsPanel = ({ classes, title, addEmptyField, foods = [], setFood, removeField, isValid }) => {
  const addButtonDisabled = foods.length >= maxFields;

  if (foods.length === 0) {
    addEmptyField();
  }

  return (
    <div className={classes.fieldBox}>
      <Typography className={classes.title} component='h4'>
        {title}
      </Typography>
      <div>
        {foods.map(food => (
          <div key={food.key} className={classes.searchfood}>
            <SearchInputField
              isValid={isValid(food)}
              foodAction={setFood}
              foodKey={food.key}
            />
            {foods.length <= 1 ? <RemoveIcon/> : <RemoveIcon foodItem={food} action={removeField}/>}
          </div>
        ))}
        <MainButton action={addEmptyField} disabled={addButtonDisabled}>
          Add
        </MainButton>
      </div>
    </div>
  );
};

RepeatableFoodsPanel.propTypes = {
  foods: PropTypes.array,
  recommendations: PropTypes.array,
  addEmptyField: PropTypes.func,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  isValid: PropTypes.func,
  setFood: PropTypes.func,
  removeField: PropTypes.func,
};

const styles = {
  fieldBox: {
    float: 'left',
    marginRight: 80,
    marginBottom: 30,
    width: 300,
    border: '1px dashed #ddd',
    padding: '30px 40px',
    borderRadius: 9,
    backgroundColor: '#f5f5fa',
    borderStyle: 'outset',
    height: 'fit-content',
  },
  title: {
    marginBottom: 20,
  },
  searchfood: {
    display: '-webkit-box',
  },
};

export default withStyles(styles)(RepeatableFoodsPanel);

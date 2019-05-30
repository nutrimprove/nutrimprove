import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFood } from '../connect/api';

const textField = {
  width: 200,
  marginBottom: 0,
};

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const FoodById = () => {
  const [foodId, setFoodId] = useState('');
  const [food, setFood] = useState();

  const updateResults = () => {
    if (foodId !== '') {
      fetchFood(foodId).then(({ food }) => setFood(food));
    }
  };

  return (
    <form>
      <TextField
        id='foodId'
        label='Search food by Id'
        type='search'
        value={foodId}
        style={textField}
        margin='normal'
        onChange={e => setFoodId(e.target.value)}
      />
      <Button
        style={buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Search
      </Button>
      <ResultsTable values={food ? [food] : []} />
    </form>
  );
};

export default FoodById;

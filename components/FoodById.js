import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFoodById } from '../connect/api';

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
  const [foods, setFoods] = useState([]);

  const updateId = id => {
    setFoodId(id);
  };

  const updateResults = () => {
    if (foodId !== '') {
      fetchFoodById(foodId).then(values => setFoods(values));
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
        onChange={e => updateId(e.target.value)}
      />
      <Button
        style={buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Search
      </Button>
      <ResultsTable values={foods} />
    </form>
  );
};

export default FoodById;

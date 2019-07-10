import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';

const textField = {
  width: 200,
  marginBottom: 0,
};

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const FoodByName = () => {
  const [foodName, setFoodName] = useState('');
  const [foods, setFoods] = useState([]);

  const updateResults = async () => {
    setFoods([]);
    if (foodName !== '') {
      const foods = await fetchFoods(foodName);
      setFoods(foods);
    }
  };

  return (
    <form>
      <TextField
        id='foodName'
        label='Search food by name'
        type='search'
        value={foodName}
        style={textField}
        margin='normal'
        onChange={e => setFoodName(e.target.value)}
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

export default FoodByName;

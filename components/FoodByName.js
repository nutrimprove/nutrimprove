import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';
import SectionHeader from './SectionHeader';

const title = 'Search food by name';
const subtitle = 'Search for a food in the general food database';

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
  const [searched, setSearched] = useState(false);

  const updateResults = async () => {
    setFoods([]);
    if (foodName !== '') {
      const foods = await fetchFoods(foodName);
      setFoods(foods);
      setSearched(true);
    }
  };

  return (
    <form>
      <SectionHeader title={title} subtitle={subtitle} />
      <TextField
        id='foodName'
        label='Type food name'
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
      {searched && <ResultsTable values={foods} />}
    </form>
  );
};

export default FoodByName;

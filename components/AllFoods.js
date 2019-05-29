import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const AllFoods = () => {
  const [foods, setFoods] = useState([]);

  const updateResults = () => {
    fetchFoods().then(values => setFoods(values));
  };

  return (
    <form>
      <Button
        style={buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Fetch all foods
      </Button>
      <ResultsTable values={foods} />
    </form>
  );
};

export default AllFoods;

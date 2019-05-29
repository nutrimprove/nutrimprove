import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const AllFoods = () => {
  const [values, setValues] = useState([]);

  const updateResults = () => {
    fetchFoods().then(values => setValues(values));
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
      <ResultsTable values={values} />
    </form>
  );
};

export default AllFoods;

import React, { useState, useEffect } from 'react';
import ResultsTable from './FoodFullResults';
import { fetchFoods } from '../connect/api';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    (async function fetchAndSetData() {
      const { foods: fetchedFoods } = await fetchFoods();
      setFoods(fetchedFoods);
    })();
  }, []);

  return <ResultsTable values={foods} />;
};

export default AllFoods;

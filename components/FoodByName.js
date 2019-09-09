import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const title = 'Search food by name';
const subtitle = 'Search for a food in the general food database';

const styles = {
  textField: {
    width: 200,
    marginBottom: 0,
    marginTop: 0,
  },
  buttonStyles: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const FoodByName = ({ classes }) => {
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
    <>
      <SectionHeader title={title} subtitle={subtitle} />
      <TextField
        id='foodName'
        label='Type food name'
        type='search'
        value={foodName}
        className={classes.textField}
        margin='normal'
        onChange={e => setFoodName(e.target.value)}
      />
      <Button
        className={classes.buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Search
      </Button>
      {searched && <ResultsTable values={foods} />}
    </>
  );
};

FoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodByName);

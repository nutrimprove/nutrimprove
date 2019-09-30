import React, { useState } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import { fetchFoods } from '../connect/api';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import PrimaryButton from './PrimaryButton';

const sectionHeader = {
  title: 'Search food by name',
  subtitle: 'Search for a food in the general food database',
};

const styles = {
  textField: {
    width: 200,
    margin: '-10px 10px 10px 0',
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
      <SectionHeader content={sectionHeader} />
      <TextField
        id='foodName'
        label='Type food name'
        type='search'
        value={foodName}
        className={classes.textField}
        margin='normal'
        onChange={e => setFoodName(e.target.value)}
      />
      <PrimaryButton action={updateResults}>
        Search
        <LoadingSpinner context='fetchFoods' colour='white' />
      </PrimaryButton>
      {searched && <ResultsTable values={foods} />}
    </>
  );
};

FoodByName.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodByName);

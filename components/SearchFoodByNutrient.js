import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import ButtonWithSpinner from './ButtonWithSpinner';
import Autocomplete from '@material-ui/lab/Autocomplete';

const list = [
  { name: 'Vitamin C', value: 1 },
  { name: 'Phosphorus', value: 2 },
  { name: 'Vitamin K2', value: 3 },
  { name: 'Calcium', value: 4 },
  { name: 'Glucose', value: 5 },
];


const SearchFoodByNutrient = ({ classes }) => {
  const [nutrient, setNutrient] = useState();

  const getFoods = () => {
    console.log('=== SearchFoodByNutrient.js #21 === ( nutrient ) =======>', nutrient);
  };

  return (
    <>
      <div className={classes.search}>
        <Autocomplete
          id='select_nutrient'
          options={list}
          getOptionLabel={(option) => option.name}
          style={{ width: 300, height: 40 }}
          renderInput={(params) =>
            <TextField
              label='Choose nutrient'
              variant='standard'
              {...params}
            />
          }
          autoComplete={true}
          autoHighlight={true}
          autoSelect={true}
          noOptionsText='No nutrient matched!!'
          openOnFocus
          onChange={(event, value) => setNutrient(value)}
        />
        <ButtonWithSpinner
          className={classes.button}
          context='getTopNutrientFoods'
          action={getFoods}
          disabled={!nutrient}
        >
          Search
        </ButtonWithSpinner>
      </div>
    </>
  );
};

SearchFoodByNutrient.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
  };
};

const styles = {
  search: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
  },
  button: {
    margin: 10,
  },
};

export default connect(mapStateToProps)(withStyles(styles)(SearchFoodByNutrient));

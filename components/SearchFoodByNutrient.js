import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import ButtonWithSpinner from './ButtonWithSpinner';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getFoodsByNutrient, getNutrients } from '../interfaces/api/foods';
import LoadingSpinner from './LoadingSpinner';

const SearchFoodByNutrient = ({ classes }) => {
  const [nutrient, setNutrient] = useState();
  const [nutrients, setNutrients] = useState([]);
  const [foods, setFoods] = useState();
  const loading = nutrients.length === 0;

  useEffect(() => {
    (async () => {
      const nutrientList = await getNutrients(['vitamins', 'inorganics']);
      setNutrients(nutrientList);
    })()
  }, []);

  useEffect(() => {
    console.log('=== SearchFoodByNutrient.js #24 === ( foods ) =======>', foods);
  }, [foods]);

  const getFoods = async () => {
    const nutrientKey = `${nutrient.group}.${nutrient.name}`;
    const foods = await getFoodsByNutrient(nutrientKey);
    setFoods(foods);
  };

  return (
    <>
      <div className={classes.search}>
        <Autocomplete
          id='select_nutrient'
          loading={loading}
          options={nutrients}
          getOptionLabel={(option) => option.label}
          style={{ width: 300, height: 40 }}
          disabled={loading}
          renderInput={(params) =>
            <TextField
              label='Choose nutrient'
              variant='standard'
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <LoadingSpinner context='getNutrients'/> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
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
          context='getFoodsByNutrient'
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

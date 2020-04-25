import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ButtonWithSpinner from './ButtonWithSpinner';
import { getFoodsByNutrient, getNutrients } from '../interfaces/api/foods';
import AutoComplete from './AutoComplete';
import Results from './Results';

const SearchFoodByNutrient = ({ classes }) => {
  const [nutrient, setNutrient] = useState();
  const [nutrients, setNutrients] = useState([]);
  const [foods, setFoods] = useState();
  const loading = nutrients.length === 0;

  useEffect(() => {
    (async () => {
      const nutrientList = await getNutrients(['proximates', 'vitamins', 'inorganics']);
      setNutrients(nutrientList);
    })();
  }, []);

  const formatFoods = foods =>
    foods.map(food => {
      const foodObj = food[nutrient.group][nutrient.name];
      // In some rare cases and due to some rounding calculations (from the source data)
      // the quantity of a nutrient is higher than 100 for 100g of food (eg: Simple sugar and carbohydrates)
      // In these cases we are setting 100 as the value
      const quantity = nutrient.label === 'Carbohydrate' && foodObj.quantity > 100 ? 100 : foodObj.quantity;
      return {
        name: food.foodName,
        [nutrient.label]: `${quantity} ${foodObj.unit}`,
      };
    });

  const getFoods = async () => {
    const nutrientKey = `${nutrient.group}.${nutrient.name}`;
    const foods = await getFoodsByNutrient(nutrientKey);
    setFoods(formatFoods(foods));
  };

  return (
    <>
      <div className={classes.search}>
        <AutoComplete
          values={nutrients}
          groupBy={(option) => option.group}
          label='Choose nutrient'
          noMatchText='No nutrient matched!!'
          labelProp='label'
          context='getNutrients'
          loading={loading}
          onChange={setNutrient}
          openOnFocus={true}
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
      {foods && <Results list={foods} title='Nutritional values per 100g of food'/>}
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

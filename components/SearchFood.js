import SearchInputField from './SearchInputField';
import ButtonWithSpinner from './ButtonWithSpinner';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { trackPromise } from 'react-promise-tracker';
import { getSearchedTerms } from '../connect/api';
import { INPUT_TRIGGER_TIME } from '../helpers/constants';

const emptyFood = {
  name: null,
  id: null,
  suggestions: [],
};

let timeout = null;

const SearchFood = ({ classes, action, context, title }) => {
  const [food, setFood] = useState(emptyFood);

  const updateState = async (selectedFood, value) => {
    clearTimeout(timeout);
    setFood(emptyFood);
    timeout = setTimeout(async () => {
      const search = await trackPromise(
        getSearchedTerms(value),
        'getSearchTerms'
      );

      if (search && search.matches) {
        const suggestions = search.matches.map(match => ({
          food_name: match.food_name,
          food_id: match.food_id,
        }));
        if (suggestions.length > 0) {
          const selected =
            suggestions.find(
              suggestion =>
                suggestion.food_name.toLowerCase() === value.toLowerCase()
            ) || search.matches[0].food_name;
          if (selected) {
            setFood({
              name: selected.food_name,
              id: selected.food_id,
              suggestions,
            });
          }
        }
      }
    }, INPUT_TRIGGER_TIME);
  };

  return (
    <div className={classes.search}>
      <SearchInputField
        food={food}
        loadingContext='getSearchTerms'
        action={updateState}
      />
      <div className={classes.button}>
        <ButtonWithSpinner
          className={classes.button}
          action={() => action(food)}
          context={context}
          disabled={!food.id}
        >
          Search
        </ButtonWithSpinner>
      </div>
    </div>
  );
};

SearchFood.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func,
  context: PropTypes.string,
  title: PropTypes.string,
};

const styles = {
  search: {
    display: 'inline-flex',
  },
  button: {
    marginLeft: 10,
  },
};

export default withStyles(styles)(SearchFood);

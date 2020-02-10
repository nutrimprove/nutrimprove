import SearchInputField from './SearchInputField';
import ButtonWithSpinner from './ButtonWithSpinner';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const SearchFood = ({ classes, action, context }) => {
  const [food, setFood] = useState(null);

  return (
    <div className={classes.search}>
      <SearchInputField foodAction={setFood} />
      <div className={classes.button}>
        <ButtonWithSpinner
          className={classes.button}
          context={context}
          action={() => action(food)}
          disabled={!food || !food.id}
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

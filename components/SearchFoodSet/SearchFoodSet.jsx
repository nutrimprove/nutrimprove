import { FormControl, FormGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ButtonWithSpinner from '../ButtonWithSpinner';
import SearchInputField from '../AddBulkRecommendations/SearchInputField';

const SearchFoodSet = ({ classes, action, context, naked }) => {
  const [food, setFood] = useState(null);

  const formClasses = naked
    ? classes.group
    : [classes.group, classes.groupBorder].join(' ');

  return (
    <FormControl component="fieldset" margin='dense' className={formClasses}>
      <FormGroup row={true}>
        <SearchInputField foodAction={setFood}/>
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
      </FormGroup>
    </FormControl>
  );
};

SearchFoodSet.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func,
  context: PropTypes.string,
  naked: PropTypes.bool,
};

export default SearchFoodSet;

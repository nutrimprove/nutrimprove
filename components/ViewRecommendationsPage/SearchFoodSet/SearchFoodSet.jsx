import SearchInputField from '../../SearchInputField';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

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

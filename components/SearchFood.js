import SearchInputField from './SearchInputField';
import ButtonWithSpinner from './ButtonWithSpinner';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

const SearchFood = ({ classes, action, context, naked }) => {
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

SearchFood.propTypes = {
  classes: PropTypes.object.isRequired,
  action: PropTypes.func,
  context: PropTypes.string,
  naked: PropTypes.bool,
};

const styles = {
  search: {
    display: 'inline-flex',
  },
  button: {
    marginLeft: 10,
  },
  groupBorder: {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
  },
  group: {
    padding: '10px 10px 10px 20px',
    display: 'inline-flex',
  },
};

export default withStyles(styles)(SearchFood);

import { FormControlLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import PropTypes from 'prop-types';
import React from 'react';

const RadioOptions = ({ initialValue, options, onChange, classes }) => {
  return (
    <div className={classes.container}>
      <FormControl component='fieldset' className={classes.content}>
        <FormLabel>Query:</FormLabel>
        <RadioGroup
          className={classes.radioGroup}
          value={initialValue}
          onChange={onChange}
        >
          {options.map(option => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio color='primary' fontSize='small' size='small'/>}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

RadioOptions.propTypes = {
  initialValue: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

export default RadioOptions;

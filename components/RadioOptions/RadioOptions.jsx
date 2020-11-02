import { FormControlLabel } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const RadioOptions = ({ label, initialValue, options, onChange, inline = true, className, classes }) => {
  return (
    <div className={clsx(classes.container, className)}>
      <FormControl component='fieldset' className={inline ? classes.inline : null}>
        <FormLabel className={inline ? classes.inlineLabel : null}>{label}</FormLabel>
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
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  inline: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default RadioOptions;

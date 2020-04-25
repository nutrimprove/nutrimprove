import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import LoadingSpinner from './LoadingSpinner';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';

const AutoComplete = ({ options, onChange, groupBy, loading, context }) =>
    <Autocomplete
      id='select_nutrient'
      loading={loading}
      options={options}
      groupBy={groupBy}
      getOptionLabel={(option) => option.label}
      style={{ width: 300 }}
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
                {loading ? <LoadingSpinner context={context}/> : null}
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
      onChange={(event, value) => onChange(value)}
    />;



AutoComplete.propTypes = {
  loading: PropTypes.bool,
  context: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  groupBy: PropTypes.func,
};

export default AutoComplete;

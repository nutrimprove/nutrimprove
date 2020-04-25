import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';
import LoadingSpinner from './LoadingSpinner';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';

const AutoComplete = ({ values, label, labelProp, noMatchText, onChange, groupBy, loading, context, strict = false }) => {
  const filterOptions = createFilterOptions({
    limit: strict ? 30 : 200,
    startAfter: strict ? 2 : 0,
    trim: true,
  });

  return <Autocomplete
    id='select_nutrient'
    loading={loading}
    options={values}
    groupBy={groupBy}
    getOptionLabel={(option) => option[labelProp]}
    style={{ width: 300 }}
    disabled={loading}
    renderInput={(params) =>
      <TextField
        label={label}
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
    autoHighlight={false}
    autoSelect={true}
    noOptionsText={noMatchText}
    openOnFocus={!strict}
    onChange={(event, value) => onChange(value)}
    filterOptions={filterOptions}
  />;
};

AutoComplete.propTypes = {
  loading: PropTypes.bool,
  context: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  autoSelect: PropTypes.bool,
  noMatchText: PropTypes.string,
  labelProp: PropTypes.func,
  groupBy: PropTypes.func,
  strict: PropTypes.bool,
};

export default AutoComplete;

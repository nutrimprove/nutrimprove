import TextField from '@material-ui/core/TextField/TextField';
import { Autocomplete } from '@material-ui/lab';
import { lowerCaseIncludes } from 'helpers/utils';
import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

const fontSize = 14;

const AutoComplete = ({
                        values = [],
                        label,
                        labelProp,
                        noMatchText,
                        onChange,
                        getDisabledOptions,
                        onInputChange,
                        groupBy,
                        loading,
                        context,
                        strict,
                        width = 300,
                      }) => {
  const filterOptions = (options, { inputValue }) => {
    const startAfter = strict ? 2 : 0;
    if (inputValue.length <= startAfter) return strict ? 0 : options;

    const filtered = options.filter(option => {
      const words = inputValue.split(' ');
      return words.every(word => lowerCaseIncludes(option[labelProp], word));
    });
    return strict ? filtered.slice(0, 30) : filtered;
  };

  return <Autocomplete
    loading={loading || values.length === 0}
    options={values}
    groupBy={groupBy}
    getOptionLabel={(option) => option[labelProp]}
    style={{ width }}
    ListboxProps={{ style: { fontSize } }}
    disabled={loading}
    getOptionDisabled={getDisabledOptions}
    renderInput={(params) =>
      <TextField
        label={label}
        variant='standard'
        {...params}
        InputProps={{
          ...params.InputProps,
          style: { fontSize },
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
    onChange={onChange}
    onInputChange={onInputChange}
    filterOptions={filterOptions}
  />;
};

AutoComplete.propTypes = {
  loading: PropTypes.bool,
  context: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.array,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  getDisabledOptions: PropTypes.func,
  autoSelect: PropTypes.bool,
  noMatchText: PropTypes.string,
  labelProp: PropTypes.string,
  groupBy: PropTypes.func,
  strict: PropTypes.bool,
  width: PropTypes.number,
};

export default AutoComplete;

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
                        hideDropdownIcon = true,
                        width = 300,
                      }) => {
  const filterOptions = (options, { inputValue }) => {
    const startAfter = strict ? 2 : 0;
    if (inputValue.length <= startAfter) return strict ? 0 : options;

    const filtered = options.filter(option => {
      let optionText = option[labelProp];
      const words = inputValue.split(' ');
      return words.every(word => {
        if (lowerCaseIncludes(optionText, word)) {
          // Removes word from text so that it properly validates when same word is input more than once
          const regex = new RegExp(word, 'i');
          optionText = optionText.replace(regex, '');
          return true;
        }
      });
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
          title: params.inputProps.value,
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
    autoSelect={false}
    noOptionsText={noMatchText}
    openOnFocus={!strict}
    onChange={onChange}
    onInputChange={onInputChange}
    filterOptions={filterOptions}
    freeSolo={hideDropdownIcon}
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
  hideDropdownIcon: PropTypes.bool,
  width: PropTypes.number,
};

export default AutoComplete;

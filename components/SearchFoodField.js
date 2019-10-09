import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import LoadingSpinner from './LoadingSpinner';

const renderInput = inputProps => {
  const { InputProps, classes, ref, valid, ...other } = inputProps;
  const inputStyle = valid
    ? classes.inputInput
    : classes.invalidInputInput;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: inputStyle,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
};

const renderSuggestion = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    (selectedItem || '').indexOf(suggestion.food_name) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.food_name}
      selected={isHighlighted}
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.food_name}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.number,
  ]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.string.isRequired,
};

/**
 *
 * @param classes local prop from withStyles
 * @param food object containing food attributes {id: string, isRecommendation: bool, key: string, name: string, suggestions: []}
 * @param action function to execute when input changes
 * @param isValid boolean controls normal/red styling of the field (for validation purposes)
 * @param loadingContext string context to apply to LoadingSpinner
 */

const SearchFoodField = ({
  classes,
  food,
  action,
  isValid = true,
  loadingContext,
}) => {
  const { suggestions } = food;

  function onInputChange(item) {
    action(food, item);
  }

  function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions;
  }

  return (
    <div className={classes.root}>
      <Downshift id='downshift' onChange={onInputChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
        }) => {
          const {
            onBlur,
            onChange,
            onFocus,
            ...inputProps
          } = getInputProps({
            placeholder: 'Type food name',
          });
          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                label: '',
                valid: isValid,
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: {
                  onBlur,
                  onFocus,
                  onChange: event => {
                    onInputChange(event.target.value);
                    onChange(event);
                  },
                  endAdornment: (
                    <LoadingSpinner context={loadingContext} />
                  ),
                },
                inputProps,
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.dropdown}>
                    {getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({
                          item: suggestion.food_name,
                        }),
                        highlightedIndex,
                        selectedItem,
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
};

SearchFoodField.propTypes = {
  classes: PropTypes.object.isRequired,
  food: PropTypes.object,
  setSearchTerm: PropTypes.function,
  isValid: PropTypes.bool,
  action: PropTypes.function,
  loadingContext: PropTypes.string,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 280,
    alignSelf: 'flex-end',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    maxHeight: 230,
    width: 'fit-content',
    overflow: 'auto',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  invalidInputInput: {
    width: 'auto',
    flexGrow: 1,
    backgroundColor: '#ffdddd',
    color: '#770000',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(SearchFoodField);

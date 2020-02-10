import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deburr } from 'lodash';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import LoadingSpinner from './LoadingSpinner';
import IconButton from '@material-ui/core/IconButton';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { getSearchedTerms } from '../connect/api';
import { INPUT_TRIGGER_TIME } from '../helpers/constants';

const renderInput = inputProps => {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
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

let timeout = null;

const SearchInputField = ({ classes, foodKey, foodAction, isValid }) => {
  const [food, setFood] = useState();
  const [charCount, setCharCount] = useState(0);
  const context = foodKey ? `getSearchTerms-${foodKey}` : 'getSearchTerms';
  const { promiseInProgress } = usePromiseTracker({ area: context });

  useEffect(() => {
    foodAction(food);
  }, [food]);

  const updateState = async input => {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const search = await trackPromise(getSearchedTerms(input), context);

      if (search && search.matches) {
        const suggestions = search.matches.map(match => ({
          food_name: match.food_name,
          food_id: match.food_id,
        }));
        if (suggestions.length > 0) {
          const selected = suggestions.find(
            suggestion =>
              suggestion.food_name.toLowerCase() === input.toLowerCase()
          );
          if (selected) {
            setFood({
              suggestions,
              key: foodKey,
              name: selected.food_name,
              id: selected.food_id,
            });
          }
        }
      }
    }, INPUT_TRIGGER_TIME);
  };

  function onInputChange(input) {
    setCharCount(input && input.length ? input.length : 0);
    if (input && input.length > 2) {
      updateState(input);
    }
  }

  function resetField() {
    setFood({
      key: foodKey,
      id: null,
      name: '',
      suggestions: [],
    });
  }

  function getSuggestions(value) {
    if (food && food.suggestions) {
      const inputValue = deburr(value.trim()).toLowerCase();
      return inputValue.length === 0 ? [] : food.suggestions;
    }
    return [];
  }

  function validationIcon(isOpen) {
    if (!isOpen) {
      if (isValid != null) {
        return isValid ? (
          <CheckIcon className={classes.checkIcon} />
        ) : (
          <ErrorIcon className={classes.errorIcon} />
        );
      }
      if ((charCount < 3 && charCount > 0) || (food && !!food.id)) {
        return <CheckIcon className={classes.checkIcon} />;
      } else if (charCount > 0) {
        return <ErrorIcon className={classes.errorIcon} />;
      }
    }
  }

  return (
    <div className={classes.root}>
      <Downshift onChange={onInputChange}>
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
          clearSelection,
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
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: {
                  onBlur,
                  onFocus,
                  onChange: event => {
                    onInputChange(event.target.value);
                    onChange(event);
                  },
                  endAdornment: (
                    <>
                      {promiseInProgress ? (
                        <LoadingSpinner context={context} />
                      ) : (
                        validationIcon(isOpen)
                      )}
                      {inputValue && inputValue.length > 0 && (
                        <IconButton
                          onClick={() => {
                            clearSelection();
                            resetField();
                          }}
                          aria-label='clear'
                          size='small'
                        >
                          <ClearIcon fontSize='small' />
                        </IconButton>
                      )}
                    </>
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

SearchInputField.propTypes = {
  classes: PropTypes.object.isRequired,
  foodAction: PropTypes.func,
  foodKey: PropTypes.string,
  isValid: PropTypes.bool,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 280,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    backgroundColor: 'white',
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    maxHeight: 230,
    width: 'fit-content',
    overflow: 'auto',
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 10,
  },
  invalidInput: {
    width: 'auto',
    flexGrow: 1,
    color: 'firebrick',
  },
  checkIcon: {
    color: 'limegreen',
    fontSize: 'medium',
  },
  errorIcon: {
    color: 'firebrick',
    fontSize: 'medium',
  },
});

export default withStyles(styles)(SearchInputField);

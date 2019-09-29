import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { editFood } from '../store/addRecommendation/actions';
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

const SearchFoodField = ({ classes, food, setSearchTerm, isValid }) => {
  const { suggestions } = food;
  const type = food.isRecommendation ? 'rec' : 'food';

  function onInputChange(item) {
    setSearchTerm(item);
  }

  function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 && !showEmpty ? [] : suggestions;
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
                valid: isValid(food),
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: {
                  onBlur,
                  onFocus,
                  onChange: event => {
                    onInputChange(event.target.value);
                    onChange(event);
                  },
                  endAdornment: (
                    <LoadingSpinner context={`getSearchTerms-${type}`} />
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
  isValid: PropTypes.function,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: 250,
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSearchTerm: name => {
      dispatch(
        editFood(ownProps.food, name, ownProps.food.isRecommendation)
      );
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SearchFoodField));

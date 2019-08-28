import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { editFood } from '../store/addRecommendation/actions';

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
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
};

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.string.isRequired,
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
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    width: 'fit-content',
    height: '-webkit-fill-available',
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
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const SearchFoodField = ({ classes, food, setSearchTerm }) => {
  const { suggestions } = food;

  function onInputChange(item) {
    setSearchTerm(item);
  }

  return (
    <div className={classes.root}>
      <Downshift
        id='downshift'
        inputValue={food.name}
        onChange={onInputChange}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
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
            placeholder: 'Type food',
          });
          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputLabelProps: getLabelProps(),
                InputProps: {
                  onBlur,
                  onChange: event => {
                    onInputChange(event.target.value);
                    onChange(event);
                  },
                  onFocus,
                },
                inputProps,
              })}
              {isOpen && (
                <Paper className={classes.paper} square>
                  {suggestions
                    .map(suggestion => suggestion.food_name)
                    .map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem,
                      })
                    )}
                </Paper>
              )}
            </div>
          );
        }}
      </Downshift>
      <div className={classes.divider} />
    </div>
  );
};

SearchFoodField.propTypes = {
  classes: PropTypes.object.isRequired,
  food: PropTypes.object,
  setSearchTerm: PropTypes.function,
};

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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { getSearchedTerms } from '../connect/api';

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

const SearchFoodField = ({ classes }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      (async () => {
        const search = await getSearchedTerms(searchTerm);
        const listOfSuggestions = search.matches.map(
          match => match.food_name
        );
        if (listOfSuggestions) {
          setSuggestions(listOfSuggestions);
        }
      })();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !searchTerm.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function onInputChange(item) {
    let newSelectedItem = selectedItem;
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = item;
    }
    setSearchTerm(item);
    setSelectedItem(newSelectedItem);
  }

  return (
    <div className={classes.root}>
      <Downshift
        id='downshift'
        inputValue={searchTerm}
        onChange={onInputChange}
        selectedItem={selectedItem}
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
            onKeyDown: handleKeyDown,
            placeholder: 'Type food',
          });
          setSearchTerm(inputValue);

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputLabelProps: getLabelProps(),
                InputProps: {
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                },
                inputProps,
              })}

              {isOpen && (
                <Paper className={classes.paper} square>
                  {suggestions.map((suggestion, index) =>
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
};

export default withStyles(styles)(SearchFoodField);

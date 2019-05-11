import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {fetchFoods} from "../connect/api";

let foods = null;

const getFoods = async () => {
   if (!foods) {
      foods = await fetchFoods();
   }
};

const renderInput = (inputProps) => {
   const {InputProps, classes, ref, ...other} = inputProps;

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

const renderSuggestion = ({suggestion, index, itemProps, highlightedIndex, selectedItem}) => {
   const isHighlighted = highlightedIndex === index;
   const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

   return (
      <MenuItem
         {...itemProps}
         key={suggestion}
         selected={isHighlighted}
         component="div"
         style={{
            fontWeight: isSelected ? 500 : 400,
         }}
      >
         {suggestion}
      </MenuItem>
   );
}

renderSuggestion.propTypes = {
   highlightedIndex: PropTypes.number,
   index: PropTypes.number,
   itemProps: PropTypes.object,
   selectedItem: PropTypes.string,
   suggestion: PropTypes.string.isRequired,
};

const getSuggestions = (value) => {
   const inputValue = deburr(value.trim()).toLowerCase();
   const inputLength = inputValue.length;

   let count = 0;

   return inputLength < 3
      ? []
      : foods.map(food => food.foodname).filter(suggestion => {
         const keep =
            count < 20 && suggestion.toLowerCase().includes(inputValue);

         if (keep) {
            count += 1;
         }

         return keep;
      });
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

const SearchFoodField = (props) => {
   const {classes} = props;

   getFoods().then(() => console.log(foods));

   return (
      <div className={classes.root}>
         <Downshift id="downshift-simple">
            {({
                 getInputProps,
                 getItemProps,
                 getMenuProps,
                 highlightedIndex,
                 inputValue,
                 isOpen,
                 selectedItem,
              }) => (
               <div className={classes.container}>
                  {renderInput({
                     fullWidth: true,
                     classes,
                     InputProps: getInputProps({
                        placeholder: 'Search for a food',
                     }),
                  })}
                  <div {...getMenuProps()}>
                     {isOpen ? (
                        <Paper className={classes.paper} square>
                           {getSuggestions(inputValue).map((suggestion, index) =>
                              renderSuggestion({
                                 suggestion,
                                 index,
                                 itemProps: getItemProps({item: suggestion}),
                                 highlightedIndex,
                                 selectedItem,
                              }),
                           )}
                        </Paper>
                     ) : null}
                  </div>
               </div>
            )}
         </Downshift>
         <div className={classes.divider}/>
      </div>
   );
};

SearchFoodField.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchFoodField);
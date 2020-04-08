import React, { useState } from 'react';
import { uniqueId } from 'lodash/util';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

const filterList = [
  { code: 'A', name: 'Cereals and cereal products', selected: true },
  { code: 'B', name: 'Milk and milk products', selected: true },
  { code: 'C', name: 'Eggs', selected: true },
  { code: 'D', name: 'Vegetables', selected: true },
  { code: 'F', name: 'Fruit', selected: true },
  { code: 'G', name: 'Nuts and seeds', selected: true },
  { code: 'H', name: 'Herbs and spices', selected: true },
  { code: 'J', name: 'Fish and fish products', selected: true },
  { code: 'M', name: 'Meat and meat products', selected: true },
  { code: 'O', name: 'Fats and oils', selected: true },
  { code: 'P', name: 'Beverages', selected: true },
  { code: 'Q', name: 'Alcoholic beverages', selected: true },
  { code: 'S', name: 'Sugars, preserves and snacks', selected: true },
  { code: 'W', name: 'Soups, sauces and miscellaneous foods', selected: true },
];

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterList);

  const updateFilters = (event) => {
    setFilters(filters.map(filter =>
      filter.code === event.target.name
        ? { ...filter, selected: event.target.checked }
        : filter,
    ));
  };

  return (
    <FormControl component="fieldset" className={'classes.formControl'}>
      <FormLabel component="legend">Filter by category</FormLabel>
      <FormGroup>
        {filters && filters.map(filter => {
          console.log('=== SearchFilters.js #46 === ( filter ) =======>', filter);
          return (
            <FormControlLabel
              key={uniqueId()}
              control={<Checkbox checked={filter.selected} onChange={updateFilters} name={filter.code}/>}
              label={filter.name}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
  );
};

export default SearchFilters;
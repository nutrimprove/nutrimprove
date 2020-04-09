import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash/util';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import { setCategoriesAction } from '../store/global/actions';
import { connect } from 'react-redux';

const SearchFilters = ({ categories, setCategories }) => {
  const [filters, setFilters] = useState(categories);

  useEffect(() => {
    setCategories(filters);
  }, [filters]);

  const updateFilters = (event) => {
    setFilters(filters.map(filter =>
      filter.code === event.target.name
        ? { ...filter, selected: event.target.checked }
        : filter,
    ));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Search categories</FormLabel>
      <FormGroup>
        {filters && filters.map(filter => {
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

SearchFilters.propTypes = {
  categories: PropTypes.array,
  setCategories: PropTypes.func.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  setCategories: filters => dispatch(setCategoriesAction(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);

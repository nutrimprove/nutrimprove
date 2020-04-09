import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash/util';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { setCategoriesAction } from '../store/global/actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

const SearchFilters = ({ categories, setCategories, classes }) => {
  const [filters, setFilters] = useState(categories);

  useEffect(() => {
    setCategories(filters);
  }, [filters]);

  const updateFilters = (event) => {
    setFilters(filters.map(filter =>
      filter.group === event.target.name
        ? { ...filter, selected: event.target.checked }
        : filter,
    ));
  };

  return (
    <FormControl component="fieldset" margin='dense' classes={{ root: classes.group}}>
      <FormLabel component="legend">Filter categories</FormLabel>
      <FormGroup row={true}>
        {filters && filters.map(filter => {
          return (
            <FormControlLabel
              key={uniqueId()}
              control={
                <Checkbox
                  color='primary'
                  fontSize='small'
                  size='small'
                  checked={filter.selected}
                  onChange={updateFilters}
                  name={filter.group}
                />
              }
              label={filter.name}
              classes={{ label: classes.category }}
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

SearchFilters.propTypes = {
  categories: PropTypes.array,
  setCategories: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
  };
};

const mapDispatchToProps = dispatch => ({
  setCategories: filters => dispatch(setCategoriesAction(filters)),
});

const styles = {
  group: {
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
    marginBottom: 20,
  },
  category: {
    fontSize: '0.8em',
  },
  checkbox: {
    width: '0.6em',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchFilters));

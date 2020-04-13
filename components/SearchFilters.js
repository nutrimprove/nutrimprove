import React, { useEffect, useState } from 'react';
import { uniqueId } from 'lodash/util';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { setCategoriesAction } from '../store/global/actions';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import PopoverPanelWithButton from './PopoverPanelWithButton';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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

  const setAll = () => {
    setFilters(() => filters.map(filter => ({ ...filter, selected: true })));
  };

  const setNone = () => {
    setFilters(filters.map(filter => ({ ...filter, selected: false })));
  };

  return (
    <PopoverPanelWithButton title='Filter by category'>
      <FormControl component="fieldset" margin='dense'>
        <FormLabel
          component="label"
          classes={{ root: classes.label }}
        >
          Select which categories to include in search
        </FormLabel>
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
        {filters &&
        <div className={classes.filterButtons}>
          <Button variant='outlined' color='primary' className={classes.button} onClick={setAll}>All</Button>
          <Button variant='outlined' color='primary' className={classes.button} onClick={setNone}>None</Button>
        </div>
        }
      </FormControl>
    </PopoverPanelWithButton>
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
  category: {
    fontSize: '0.9em',
  },
  checkbox: {
    width: '0.6em',
  },
  title: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
  },
  filterButtons: {
    float: 'right',
  },
  button: {
    marginRight: 10,
    marginTop: 10,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchFilters));

import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Link } from '@material-ui/core';
import PopoverPanelWithButton from 'components/PopoverPanelWithButton';
import { EDAMAM_DB } from 'helpers/constants';
import { uniqueId } from 'lodash/util';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoriesAction } from 'store/global/actions';

const Filters = ({ classes }) => {
  if (EDAMAM_DB) return null;

  const categories = useSelector(({ globalState }) => globalState.categories);
  const dispatch = useDispatch();
  const setCategories = useCallback(filters => dispatch(setCategoriesAction(filters)), []);
  const [filters, setFilters] = useState(categories.all);

  useEffect(() => {
    const selectedFilters = filters.filter(filter => filter.selected).map(category => category.group);

    setCategories({
      all: filters,
      selectedGroups: selectedFilters,
    });
  }, [filters]);

  const updateFilters = (event) => {
    setFilters(filters.map(filter =>
      filter.group === event.target.name
        ? { ...filter, selected: event.target.checked }
        : filter,
    ));
  };

  const setAll = () => {
    setFilters(filters.map(filter => ({ ...filter, selected: true })));
  };

  const setNone = () => {
    setFilters(filters.map(filter => ({ ...filter, selected: false })));
  };

  const splitList = () => {
    const list = [...filters];
    const half = Math.ceil(list.length / 2);
    const firstHalf = list.splice(0, half);
    return [[...firstHalf], [...list]];
  };

  const renderFilters = list =>
    list.map(filter => (
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
    ));

  const hasFilters = () => {
    return categories.all.length !== categories.selectedGroups.length && categories.selectedGroups.length > 0;
  };

  return (
    <div className={classes.container}>
      <PopoverPanelWithButton buttonText={hasFilters() ? 'Filtered by category' : 'Filter by category'}
                              buttonEffect={hasFilters()}
                              title='Select which categories to include in search'>
        <FormControl classes={{ root: classes.control }} component="fieldset" margin='dense'>
          {splitList(filters).map(list =>
            <FormGroup key={uniqueId()} classes={{ root: classes.column }}>
              {renderFilters(list)}
            </FormGroup>,
          )}
          <div className={classes.filterButtons}>
            <Button variant='outlined' color='primary' className={classes.button} onClick={setAll}>All</Button>
            <Button variant='outlined' color='primary' className={classes.button} onClick={setNone}>None</Button>
          </div>
        </FormControl>
      </PopoverPanelWithButton>
      {hasFilters() && <Link component={'button'} className={classes.reset} onClick={setNone}>Reset Filters</Link>}
    </div>
  );
};

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default Filters;

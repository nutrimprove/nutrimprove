import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../AutoComplete';
import ButtonWithSpinner from '../ButtonWithSpinner';

const SearchField = ({
                       classes,
                       values,
                       loading,
                       onSelection,
                       optionsContext,
                       buttonContext,
                       onButtonClick,
                       buttonDisabled,
                       label = 'Type food',
                       labelProp = 'foodName',
                       noMatchText = 'No food matched!!',
                       groupBy,
                       strict,
                     }) => (
  <div className={classes.search}>
    <AutoComplete
      width={260}
      values={values}
      label={label}
      noMatchText={noMatchText}
      labelProp={labelProp}
      context={optionsContext}
      loading={loading}
      onChange={onSelection}
      strict={strict}
      groupBy={groupBy}
    />
    <ButtonWithSpinner
      className={classes.button}
      context={buttonContext}
      action={onButtonClick}
      disabled={buttonDisabled}
    >
      Search
    </ButtonWithSpinner>
  </div>
);

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onSelection: PropTypes.func.isRequired,
  optionsContext: PropTypes.string,
  buttonContext: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelProp: PropTypes.string.isRequired,
  noMatchText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  strict: PropTypes.bool.isRequired,
  groupBy: PropTypes.func,
};

export default SearchField;

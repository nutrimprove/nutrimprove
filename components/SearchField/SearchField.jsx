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
                       buttonText = 'Search',
                       onButtonClick,
                       buttonDisabled,
                       label = 'Type food',
                       labelProp = 'foodName',
                       noMatchText = 'No food matched!!',
                       groupBy,
                       strict = true,
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
      {buttonText}
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
  buttonText: PropTypes.string,
  label: PropTypes.string,
  labelProp: PropTypes.string,
  noMatchText: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool,
  strict: PropTypes.bool,
  groupBy: PropTypes.func,
};

export default SearchField;

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import AutoComplete from '../AutoComplete';
import ButtonWithSpinner from '../ButtonWithSpinner';

const SearchField = ({
                       classes,
                       className,
                       width = 360,
                       values,
                       loading,
                       onSelection,
                       optionsContext,
                       buttonContext,
                       buttonText = 'Search',
                       onButtonClick,
                       buttonDisabled,
                       showButton = true,
                       label = 'Type food',
                       labelProp = 'foodName',
                       noMatchText = 'No food matched!!',
                       groupBy,
                       strict = true,
                     }) => (
  <div className={clsx(classes.search, className)}>
    <AutoComplete
      width={width}
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
    {showButton && <ButtonWithSpinner
      className={classes.button}
      context={buttonContext}
      action={onButtonClick}
      disabled={buttonDisabled}
    >
      {buttonText}
    </ButtonWithSpinner>}
  </div>
);

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.number,
  values: PropTypes.array,
  loading: PropTypes.bool,
  onSelection: PropTypes.func.isRequired,
  className: PropTypes.string,
  optionsContext: PropTypes.string,
  buttonContext: PropTypes.string,
  buttonText: PropTypes.string,
  showButton: PropTypes.bool,
  label: PropTypes.string,
  labelProp: PropTypes.string,
  noMatchText: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  strict: PropTypes.bool,
  groupBy: PropTypes.func,
};

export default SearchField;

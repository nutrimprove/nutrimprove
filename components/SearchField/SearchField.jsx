import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from '../AutoComplete';
import ButtonWithSpinner from '../ButtonWithSpinner';

const SearchField = ({ classes, values, loading, onChange, context, onClick, disabled }) => (
  <div className={classes.search}>
    <AutoComplete
      width={260}
      values={values}
      label='Type food'
      noMatchText='No food matched!!'
      labelProp='foodName'
      context='getNutrients'
      loading={loading}
      onChange={onChange}
      strict={true}
    />
    <ButtonWithSpinner
      className={classes.button}
      context={context}
      action={onClick}
      disabled={disabled}
    >
      Search
    </ButtonWithSpinner>
  </div>
);

SearchField.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  context: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SearchField;

import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import PrimaryButton from './PrimaryButton';

const ButtonWithSpinner = ({ action, disabled, context, children }) => (
  <PrimaryButton action={action} disabled={disabled}>
    {children}
    <LoadingSpinner context={context} colour='white' />
  </PrimaryButton>
);

ButtonWithSpinner.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.object,
  context: PropTypes.string.isRequired,
};

export default ButtonWithSpinner;

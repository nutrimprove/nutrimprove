import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import MainButton from './MainButton';

const ButtonWithSpinner = ({
  action,
  disabled,
  context,
  colour,
  children,
}) => (
  <MainButton action={action} disabled={disabled} colour={colour}>
    {children}
    <LoadingSpinner context={context} colour='white' />
  </MainButton>
);

ButtonWithSpinner.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  context: PropTypes.string,
  colour: PropTypes.string,
};

export default ButtonWithSpinner;

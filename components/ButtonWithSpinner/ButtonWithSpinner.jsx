import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';
import MainButton from '../MainButton';

const ButtonWithSpinner = ({
                             action,
                             disabled,
                             context,
                             colour,
                             children,
                             className,
                           }) => (
  <MainButton action={action} disabled={disabled} colour={colour} className={className}>
    {children}
    <LoadingSpinner context={context} colour='white'/>
  </MainButton>
);

ButtonWithSpinner.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  context: PropTypes.string,
  colour: PropTypes.string,
  className: PropTypes.string,
};

export default ButtonWithSpinner;

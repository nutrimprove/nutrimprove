import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

const MainButton = ({
                      classes,
                      action,
                      disabled,
                      disabledText,
                      colour = 'primary',
                      children,
                      className,
                      datakey,
                    }) => {
  let buttonClasses = classes.button;
  if (colour.toLowerCase() === 'green') {
    buttonClasses = [classes.button, classes.greenButton].join(' ');
    colour = 'primary';
  }

  return (
    <>
      <Button
        className={className ? [buttonClasses, className].join(' ') : buttonClasses}
        variant='contained'
        color={colour}
        onClick={action}
        disabled={disabled}
        data-key={datakey}
      >
        {disabled && disabledText ? disabledText : children}
      </Button>
    </>
  );
};

MainButton.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  disabledText: PropTypes.string,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  datakey: PropTypes.string,
  colour: PropTypes.string,
};

export default MainButton;

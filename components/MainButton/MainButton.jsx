import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

const MainButton = ({
                      classes,
                      action,
                      disabled,
                      colour = 'primary',
                      children,
                      className,
                    }) => (
  <>
    <Button
      className={className ? [classes.button, className].join(' ') : classes.button}
      variant='contained'
      color={colour}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </Button>
  </>
);

MainButton.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  colour: PropTypes.string,
};

export default MainButton;

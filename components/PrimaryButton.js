import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const PrimaryButton = ({
  classes,
  action,
  disabled,
  colour = 'primary',
  children,
}) => (
  <>
    <Button
      className={classes.button}
      variant='contained'
      color={colour}
      onClick={action}
      disabled={disabled}
    >
      {children}
    </Button>
  </>
);

PrimaryButton.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.array,
  classes: PropTypes.object.isRequired,
  colour: PropTypes.string,
};

const styles = {
  button: {
    padding: '6px 16px',
    height: 40,
    lineHeight: 'normal',
    marginRight: 20,
  },
};

export default withStyles(styles)(PrimaryButton);

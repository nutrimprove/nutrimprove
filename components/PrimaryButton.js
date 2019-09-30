import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const PrimaryButton = ({ classes, action, disabled, children }) => (
  <>
    <Button
      className={classes.button}
      variant='contained'
      color='primary'
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
  children: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const styles = {
  button: {
    padding: '6px 16px',
    height: 40,
    lineHeight: 'normal',
  },
};

export default withStyles(styles)(PrimaryButton);

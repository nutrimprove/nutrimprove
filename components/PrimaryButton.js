import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { usePromiseTracker } from 'react-promise-tracker';
import withStyles from '@material-ui/core/styles/withStyles';

const PrimaryButton = ({ classes, action, text, children }) => {
  const { searchingTerms } = usePromiseTracker({ area: 'getSearchTerms' });

  return (
    <>
      {action && !searchingTerms ? (
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={action}
        >
          {text}
          {children}
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          disabled
        >
          {text}
          {children}
        </Button>
      )}
    </>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func,
  children: PropTypes.object,
  disableOn: PropTypes.string,
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

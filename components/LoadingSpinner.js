import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  spinner: {
    display: 'inline-flex',
    padding: '3px 0 0 12px',
  },
};

const LoadingSpinner = ({ classes, colour = 'black', context }) => {
  const { promiseInProgress } = usePromiseTracker({ area: context });

  return (
    promiseInProgress && (
      <div className={classes.spinner}>
        <Loader type='Oval' color={colour} height={22} width={22} />
      </div>
    )
  );
};

LoadingSpinner.propTypes = {
  colour: PropTypes.string,
  classes: PropTypes.object.required,
};

export default withStyles(styles)(LoadingSpinner);

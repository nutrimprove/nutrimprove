import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingSpinner = ({
                          classes,
                          colour = 'black',
                          context,
                          force = false,
                        }) => {
  const { promiseInProgress } = usePromiseTracker({ area: context });

  return (
    (promiseInProgress || force) && (
      <div className={classes.spinner}>
        <Loader type='Oval' color={colour} height={22} width={22}/>
      </div>
    )
  );
};

LoadingSpinner.propTypes = {
  colour: PropTypes.string,
  classes: PropTypes.object.isRequired,
  context: PropTypes.string,
  force: PropTypes.bool,
};

export default LoadingSpinner;

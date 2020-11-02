import PropTypes from 'prop-types';
import React from 'react';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from 'react-promise-tracker';

const LoadingSpinner = ({
                          classes,
                          colour = 'black',
                          context,
                          force = false,
                          delay = 0,
                          size = 22,
                        }) => {
  const { promiseInProgress } = usePromiseTracker({ area: context, delay });

  return (
    (promiseInProgress || force) && (
      <div className={classes.spinner}>
        <Loader type='Oval' color={colour} height={size} width={size}/>
      </div>
    )
  );
};

LoadingSpinner.propTypes = {
  colour: PropTypes.string,
  classes: PropTypes.object.isRequired,
  context: PropTypes.string,
  force: PropTypes.bool,
  delay: PropTypes.number,
  size: PropTypes.number,
};

export default LoadingSpinner;

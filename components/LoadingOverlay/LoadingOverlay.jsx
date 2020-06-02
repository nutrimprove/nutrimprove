import clsx from 'clsx';
import LoadingPanel from 'components/LoadingPanel';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const LoadingOverlay = ({ classes, delay = 0 }) => {
  const [display, setDisplay] = useState();

  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, delay);
  }, []);

  return (
    <div className={clsx(classes.overlay, display ? classes.display : classes.hidden)}>
      <div className={classes.panel}>
        <div className={classes.loading}>
          <LoadingPanel/>
        </div>
      </div>
    </div>
  );
};

LoadingOverlay.propTypes = {
  classes: PropTypes.object.isRequired,
  delay: PropTypes.number,
};

export default LoadingOverlay;

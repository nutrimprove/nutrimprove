import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const ScrollIntoView = ({ position = 'start', children, ...props }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: position,
    });
  }, []);

  return (
    <>
      {children
        ? <div {...props} ref={ref}>
          {children}
        </div>
        : <span {...props} ref={ref}/>}
    </>
  );
};

ScrollIntoView.propTypes = {
  position: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ScrollIntoView;

import PropTypes from 'prop-types';
import React from 'react';

const PageContent = ({ children, classes }) => (
  <div className={classes.content}>
    {children}
  </div>
);

PageContent.propTypes = {
  children: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default PageContent;

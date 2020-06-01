import PropTypes from 'prop-types';
import React from 'react';

const ContentSection = ({ classes, id, title, children }) => {
  const sectionStyle = title
    ? classes.section
    : `${classes.section} ${classes.allRadius}`;
  return (
    <>
      {title && (
        <h5 id={id} className={classes.title}>
          {title}
        </h5>
      )}
      <div className={sectionStyle}>{children}</div>
    </>
  );
};

ContentSection.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.array,
};

export default ContentSection;

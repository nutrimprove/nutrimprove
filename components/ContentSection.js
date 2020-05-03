import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

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
  content: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.object,
};

const styles = {
  section: {
    backgroundColor: '#f5f5f5',
    padding: '10px 10px 5px 10px',
    border: 'solid 1px lightgrey',
    borderRadius: '0 0 9px 9px',
  },
  allRadius: {
    borderRadius: 9,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#3f51b5',
    color: 'white',
    padding: 10,
    marginBottom: 0,
    borderRadius: '9px 9px 0 0',
  },
};

export default withStyles(styles)(ContentSection);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  header: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '0.9em',
  },
  title: {
    fontSize: '1.4em',
  },
  fetchButton: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const SectionHeader = ({ title, subtitle, classes }) => {
  return (
    <div id='header' className={classes.header}>
      <div id='title' className={classes.title}>
        {title}
      </div>
      <div id='subtitle' className={classes.subtitle}>
        {subtitle}
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionHeader);

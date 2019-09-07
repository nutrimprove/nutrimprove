import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  header: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '0.8em',
  },
  title: {
    fontSize: '1.4em',
  },
  fetchButton: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const SectionHeader = ({ title, subtitle }) => {
  return (
    <div id='header' style={styles.header}>
      <div id='title' style={styles.title}>
        {title}
      </div>
      <div id='subtitle' style={styles.subtitle}>
        {subtitle}
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionHeader;

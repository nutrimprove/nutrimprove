import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import uniqid from 'uniqid';

const styles = {
  header: {
    marginBottom: '30px',
    fontFamily: 'sans-serif, arial',
  },
  title: {
    fontSize: '1.4em',
    marginBottom: 10,
    fontFamily: 'sans-serif, arial',
  },
  subtitle: {
    fontSize: '1.1em',
    fontFamily: 'sans-serif, arial',
  },
  messages: {
    fontSize: '1em',
    marginTop: 10,
  },
  fetchButton: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const SectionHeader = ({ content, classes }) => {
  return (
    <div className={classes.header}>
      <div className={classes.title}>{content && content.title}</div>
      <div className={classes.subtitle}>{content && content.subtitle}</div>
      <div className={classes.messages}>
        {content &&
          content.messages &&
          content.messages.map(message => (
            <div key={uniqid()}>{message}</div>
          ))}
      </div>
    </div>
  );
};

SectionHeader.propTypes = {
  content: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionHeader);

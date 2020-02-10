import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { uniqueId } from 'lodash';

const styles = {
  header: {
    marginBottom: '30px',
    fontFamily: 'sans-serif, arial',
    backgroundColor: 'lightyellow',
    padding: '10px 0 5px 10px',
    border: 'solid 1px lightgrey',
    borderRadius: 9,
  },
  title: {
    fontSize: '1.5em',
    marginBottom: 10,
    fontFamily: 'tahome, sans-serif, arial',
    fontWeight: 300,
  },
  subtitle: {
    fontSize: '1em',
    fontFamily: 'sans-serif, arial',
    fontWeight: 200,
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
            <div key={uniqueId()}>{message}</div>
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

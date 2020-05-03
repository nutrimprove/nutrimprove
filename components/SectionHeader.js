import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { uniqueId } from 'lodash';

const styles = {
  header: {
    marginBottom: '30px',
    fontFamily: 'sans-serif, arial',
    backgroundColor: '#fafafd',
    padding: '10px',
    border: 'solid 1px lightgrey',
    borderRadius: 9,
    fontSize: '0.9em',
    fontWeight: 200,
    lineHeight: '1.5em',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.3em',
    marginBottom: 10,
    fontFamily: 'tahome, sans-serif, arial',
    fontWeight: 400,
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
      <div>{content && content.subtitle}</div>
      <div>
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

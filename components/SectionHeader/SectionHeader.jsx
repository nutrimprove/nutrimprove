import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

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

export default SectionHeader;

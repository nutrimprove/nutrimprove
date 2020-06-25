import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const SectionHeader = ({ content, classes }) => {
  return (
    <div className={classes.header}>
      {content && <>
        <div className={classes.title}>{content.title}</div>
        <div>{content.subtitle}</div>
        <div>
          {content.messages && content.messages.map(message => (
            <div key={uniqueId()}>{message}</div>
          ))}
        </div>
      </>}
    </div>
  );
};

SectionHeader.propTypes = {
  content: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default SectionHeader;

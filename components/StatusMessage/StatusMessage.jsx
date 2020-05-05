import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ classes, status }) => (
  <>
    <div className={classes.status}>
      {status.map((line, index) => {
        if (line === '') {
          line = <br/>;
        }
        return index === 0 ? (
          <ul key={index} className={classes.first}>
            * {line}
          </ul>
        ) : (
          <ul key={index} className={classes.line}>
            {line}
          </ul>
        );
      })}
    </div>
  </>
);

StatusMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.array,
};

export default StatusMessage;

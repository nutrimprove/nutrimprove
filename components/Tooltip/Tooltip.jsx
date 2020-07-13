import TooltipUI from '@material-ui/core/Tooltip';
import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ classes, children, title }) => {
  return (
    <>
      <TooltipUI title={title} className={classes.tooltip}><span>{children}</span></TooltipUI>
    </>
  );
};

Tooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default Tooltip;

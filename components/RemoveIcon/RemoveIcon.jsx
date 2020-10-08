import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const setHoverColor = ({ currentTarget }) => {
  currentTarget.style.color = 'darkred';
};

const setNormalColor = ({ currentTarget }) => {
  currentTarget.style.color = 'grey';
};

const RemoveIcon = ({ classes, className, dataKey, onClick, disabled }) => {
  return disabled
    ? <DeleteIcon className={clsx(classes.icon, className)} style={{ color: '#ddd'}}/>
    : <DeleteIcon onClick={onClick}
                  style={{ color: 'grey', cursor: 'pointer' }}
                  onMouseOver={setHoverColor}
                  onMouseLeave={setNormalColor}
                  titleAccess='Delete'
                  data-key={dataKey}
                  className={clsx(classes.icon, className)}
    />;
};

RemoveIcon.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  dataKey: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default RemoveIcon;

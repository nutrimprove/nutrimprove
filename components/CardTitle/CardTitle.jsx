import { Typography } from '@material-ui/core';
import EditableText from 'components/EditableText';
import PropTypes from 'prop-types';
import React from 'react';

const CardTitle = ({ classes, title = ' ', editable, onTitleChange, children }) => (
  <div className={classes.container}>
    {title && editable
      ? <EditableText maxLength={100} value={title} onChange={onTitleChange}/>
      : <Typography variant='subtitle1' noWrap={true}>
        {title} {children}
      </Typography>}
  </div>
);

CardTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  editable: PropTypes.bool,
  onTitleChange: PropTypes.func,
  children: PropTypes.object,
};

export default CardTitle;

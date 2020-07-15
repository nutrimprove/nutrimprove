import { Typography } from '@material-ui/core';
import EditableText from 'components/EditableText';
import PropTypes from 'prop-types';
import React from 'react';

const CardTitle = ({ classes, title, editable, onTitleChange }) => (
  <div className={classes.container}>
    {editable && title
      ? <EditableText value={title} onChange={onTitleChange}/>
      : <Typography variant='subtitle1' noWrap={true}>
        {title}
      </Typography>}
  </div>
);

CardTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onTitleChange: PropTypes.func,
};

export default CardTitle;

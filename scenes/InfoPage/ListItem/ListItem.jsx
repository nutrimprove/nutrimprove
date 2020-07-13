import { ListItem as Item, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const ListItem = ({ classes, icon, title, description }) => {
  return (
    <Item>
      <ListItemIcon className={classes.listItemIcon}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant='body2' className={classes.listItemTitle}>
            {title}
          </Typography>
        }
        secondary={
          <Typography variant='body2' className={classes.listItemText}>
            {description}
          </Typography>
        }
      />
    </Item>
  );
};

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default ListItem;

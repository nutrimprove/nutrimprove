import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

const FoodList = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Typography>New List</Typography>
    </div>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FoodList;

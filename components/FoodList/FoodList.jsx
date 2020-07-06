import Typography from '@material-ui/core/Typography';
import CardTitle from 'components/CardTitle';
import PropTypes from 'prop-types';
import React from 'react';

const FoodList = ({ classes }) => {
  return (
    <>
      <CardTitle title='New List'/>
    </>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default FoodList;

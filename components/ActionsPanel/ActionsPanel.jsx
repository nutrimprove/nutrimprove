import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';
import PropTypes from 'prop-types';
import React from 'react';
import ActionsContainer from '../ActionsContainer';
import ScrollIntoView from '../ScrollIntoView';

const ActionsPanel = ({ food, recommendedFood, status, classes, children }) => {
  if (!food || !recommendedFood) return null;
  const messages = status && Array.isArray(status.content) ? status.content : [status.content];

  if (food.foodCode === recommendedFood.foodCode) {
    return (
      <ActionsContainer>
        <Typography className={classes.recommendation}>
          You have selected the same food as a recommendation:
          &apos;<b>{recommendedFood.foodName}</b>&apos;
        </Typography>
      </ActionsContainer>
    );
  }

  return (
    <ScrollIntoView>
      <ActionsContainer>
        <Typography className={classes.recommendation}>
          You consider &apos;<span className={classes.recommendedFood}>{recommendedFood.foodName}</span>&apos;
          a healthier alternative to &apos;<span className={classes.food}>{food.foodName}</span>&apos;
        </Typography>
        {children}
        <div className={classes.status}>
          {messages && messages.map(line =>
            <Typography
              className={clsx(status.type === 'success' ? classes.success : classes.fail)}
              key={uniqueId()}>{line}
            </Typography>,
          )}
        </div>
      </ActionsContainer>
    </ScrollIntoView>
  );
};

ActionsPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  food: PropTypes.object,
  recommendedFood: PropTypes.object,
  status: PropTypes.object,
  children: PropTypes.array,
};

export default ActionsPanel;

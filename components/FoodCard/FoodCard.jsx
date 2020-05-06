import { Button, Card, CardActions, CardContent, List, ListItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';
import ScrollIntoView from '../ScrollIntoView/ScrollIntoView';
import { getCardNutrients, parseNutrients } from '../../helpers/utils';
import { connect } from 'react-redux';
import ResultsTable from '../ResultsTable';
import LoadingPanel from '../LoadingPanel';
import ModalPanel from '../ModalPanel';

const FoodCard = ({ food, onMouseOver, highlightItem, classes, preferences, userDetails }) => {
  const [foodDetails, setFoodDetails] = useState();
  const [nutrients, setNutrients] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [changeNutrientOpen, setChangeNutrientOpen] = useState(false);
  const [nutrientToChange, setNutrientToChange] = useState();
  const title = food ? food.foodName : '';

  useEffect(() => {
    let userCardNutrients;
    console.log('=== FoodCard.jsx #19 === ( userDetails ) =======>', userDetails);
    console.log('=== FoodCard.jsx #19 === ( preferences ) =======>', preferences);
    if (preferences && preferences.cardNutrients) {
      userCardNutrients = preferences.cardNutrients;
      console.log('=== FoodCard.jsx #21 === ( 111 ) =======>', 111);
    }
    const cardNutrients = getCardNutrients(food, userCardNutrients);
    console.log('=== FoodCard.jsx #23 === ( userCardNutrients ) =======>', userCardNutrients);
    console.log('=== FoodCard.jsx #23 === ( cardNutrients ) =======>', cardNutrients);
    setNutrients(cardNutrients);
  }, []);

  const showFoodDetails = () => {
    const { foodName, proximates, vitamins, inorganics } = food;
    setDetailsOpen(true);
    setFoodDetails({
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    });
  };

  const handleClick = event => {
    const nutrient = event.currentTarget.dataset.label;
    setNutrientToChange(nutrient);
    setChangeNutrientOpen(true);
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
    setChangeNutrientOpen(false);
  };

  return (
    <>
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary" title={title} noWrap={true}>
          {title}
        </Typography>
        <CardContent className={classes.content}>
          <List className={classes.list}>
            {nutrients && nutrients.map(({ label, quantity }) => (
              <ListItem
                button key={uniqueId()}
                data-label={label}
                className={clsx(classes.item, highlightItem === label ? classes.highlight : '')}
                onMouseOver={onMouseOver}
                onClick={handleClick}
              >
                <span className={classes.nutrient}>{label}</span>
                <span className={classes.value}>{quantity}</span>
              </ListItem>
            ))}
          </List>
          <Typography className={classes.caption} variant='caption'>
            <sup>*</sup>Click a nutrient in the card to change it
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <ScrollIntoView/>
          <Button
            variant='outlined'
            color='primary'
            className={classes.button}
            onClick={showFoodDetails}
          >
            Show More
          </Button>
        </CardActions>
      </Card>
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseModal}
                    title={foodDetails.foodName}
                    subtitle='Nutritional information per 100g of food'
        >
          {foodDetails && foodDetails.nutrients ? <ResultsTable data={foodDetails.nutrients}/> : <LoadingPanel/>}
        </ModalPanel>)}
      {changeNutrientOpen && (
        <ModalPanel open={changeNutrientOpen} onClose={handleCloseModal}>
          {nutrientToChange}
        </ModalPanel>)}
    </>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func,
  highlightItem: PropTypes.string,
  classes: PropTypes.object.isRequired,
  preferences: PropTypes.object,
};

const mapStateToProps = states => {
  return {
    preferences: states.globalState.preferences,
    userDetails: states.globalState.userDetails,
  };
};

export default connect(mapStateToProps)(FoodCard);





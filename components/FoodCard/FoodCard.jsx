import { Button, Card, CardActions, CardContent, Link, List, ListItem, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { DEFAULT_CARD_NUTRIENTS } from 'helpers/constants';
import { getCardNutrients, parseNutrients } from 'helpers/utils';
import { savePreferences } from 'interfaces/api/users';
import { isEqual } from 'lodash';
import { uniqueId } from 'lodash/util';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPreferencesAction } from 'store/global/actions';
import LoadingPanel from '../LoadingPanel';
import ModalPanel from '../ModalPanel';
import ResultsTable from '../ResultsTable';
import ScrollIntoView from '../ScrollIntoView';
import ChangeNutrientModal from './ChangeNutrientModal';

const FoodCard = ({ food, onMouseOver, title = true, highlightItem, header = true, actions = true, classes }) => {
  const preferences = useSelector(({ globalState }) => globalState.preferences);
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const dispatch = useDispatch();
  const setUserPreferences = useCallback(preferences => dispatch(setUserPreferencesAction(preferences)), []);
  const [foodDetails, setFoodDetails] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [changeNutrientOpen, setChangeNutrientOpen] = useState(false);
  const [nutrientToChange, setNutrientToChange] = useState();
  const [nutrients, setNutrients] = useState();
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const undoHistory = useRef([]);
  const cardTitle = food && title ? food.foodName : '';

  const setUndoHistory = (history) => {
    undoHistory.current = history;
  };

  useEffect(() => {
    preferences
      ? setNutrients(getCardNutrients(food, preferences.cardNutrients))
      : setNutrients(getCardNutrients(food));
  }, [food, preferences]);

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

  const handleClick = async ({ currentTarget }) => {
    const nutrientName = currentTarget.dataset.name;
    const nutrient = nutrients.find(({ name }) => name === nutrientName);
    setNutrientToChange(nutrient);
    setChangeNutrientOpen(true);
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
    setChangeNutrientOpen(false);
  };

  const popHistory = () => {
    const history = [...undoHistory.current];
    const previousState = history.pop();
    setUndoHistory(history);
    return previousState;
  };

  const updatePreferences = async (newPreferences, addToUndo) => {
    setUserPreferences(newPreferences);
    await savePreferences(userDetails.email, newPreferences);
    if (addToUndo) {
      setUndoHistory([...undoHistory.current, preferences.cardNutrients]);
    }
    forceUpdate();
  };

  const handleNutrientChange = newNutrient => {
    const newNutrientsList = nutrients.map(({ label, name }) => ({ label, name }));
    const index = nutrients.findIndex(({ name }) => name === nutrientToChange.name);
    newNutrientsList.splice(index, 1, { label: newNutrient.label, name: newNutrient.name });
    const newPreferences = { ...preferences, cardNutrients: newNutrientsList };
    updatePreferences(newPreferences, true);
    setChangeNutrientOpen(false);
  };

  const resetCardNutrients = () => {
    const newPreferences = { ...preferences, cardNutrients: DEFAULT_CARD_NUTRIENTS };
    updatePreferences(newPreferences, true);
  };

  const undo = () => {
    const newPreferences = { ...preferences, cardNutrients: popHistory() };
    updatePreferences(newPreferences);
  };

  return (
    <>
      <Card className={classes.card}>
        {header && (
          <Typography className={classes.title} color="textSecondary" title={cardTitle} noWrap={true}>
            {cardTitle}
            <span className={classes.subtitle}>Nutritional values per 100g of food</span>
          </Typography>
        )}
        <CardContent className={classes.content}>
          <List className={classes.list}>
            {nutrients && nutrients.map(({ label, name, quantity, changed }) => (
              <ListItem
                button key={uniqueId()}
                data-name={name}
                className={clsx([classes.item,
                  highlightItem === name ? classes.highlight : '',
                  changed ? classes.changedItem : '',
                ])}
                onMouseOver={onMouseOver}
                onClick={handleClick}
              >
                <span className={classes.nutrient}>{label}</span>
                <span className={classes.value}>{quantity}</span>
              </ListItem>
            ))}
          </List>
          <Typography className={classes.caption} variant='caption'>
            &nbsp;<sup>*</sup>&nbsp;Click a nutrient in the card to change it
          </Typography>
          <div className={classes.cardLinks}>
            {preferences && preferences.cardNutrients && !isEqual(preferences.cardNutrients, DEFAULT_CARD_NUTRIENTS) && (
              <Link component='button'
                    onClick={resetCardNutrients}
                    className={classes.link}
                    title='Reset to default nutrients'
              >
                Reset
              </Link>
            )}
            {undoHistory.current && undoHistory.current.length > 0 && (
              <Link component='button'
                    key={undoHistory.current.length}
                    onClick={undo}
                    className={classes.link}
                    title='Undo last change'
              >
                Undo
              </Link>
            )}
          </div>
        </CardContent>
        {actions && (
          <CardActions className={classes.actions}>
            <ScrollIntoView/>
            <Button variant='outlined' color='primary' className={classes.button} onClick={showFoodDetails}>
              Show More
            </Button>
          </CardActions>
        )}
      </Card>
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseModal}
                    title={foodDetails.foodName}
                    subtitle='Nutritional information per 100g of food'
        >
          {foodDetails && foodDetails.nutrients
            ? <ResultsTable data={foodDetails.nutrients} scrollable={true} sortColumns={['nutrient']}/>
            : <LoadingPanel/>
          }
        </ModalPanel>)}
      {changeNutrientOpen && (
        <ChangeNutrientModal open={changeNutrientOpen}
                             onClose={handleCloseModal}
                             nutrientToChange={nutrientToChange}
                             onNutrientChange={handleNutrientChange}
                             cardNutrients={nutrients}
        />)}
    </>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
  onMouseOver: PropTypes.func,
  highlightItem: PropTypes.string,
  header: PropTypes.bool,
  title: PropTypes.bool,
  actions: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

export default FoodCard;

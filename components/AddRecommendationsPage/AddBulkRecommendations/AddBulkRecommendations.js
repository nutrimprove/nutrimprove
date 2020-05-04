import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emptyFood, getTime } from '../../../helpers/utils';
import { addUserPointsAction } from '../../../store/global/actions';
import { postRecommendations } from '../../../interfaces/api/recommendations';
import { difference, uniqBy } from 'lodash';
import { usePromiseTracker } from 'react-promise-tracker';
import ButtonWithSpinner from '../../ButtonWithSpinner';
import Status from '../../Status';
import { calcPoints } from '../../../helpers/userUtils';
import RepeatableFoodsPanel from '../../RepeatableFoodsPanel';
import {
  addFoodAction,
  addRecommendedFoodAction,
  editFoodAction,
  editRecommendedFoodAction,
  removeAllFoodsAndRecommendationsAction,
  removeFoodAction,
  removeRecommendedFoodAction,
} from '../../../store/addRecommendation/actions';

const AddBulkRecommendations = ({
                                  foods,
                                  recommendations,
                                  addEmptyRecommendedFood,
                                  addEmptyFood,
                                  removeFood,
                                  removeRecommendedFood,
                                  removeAllFoods,
                                  userDetails,
                                  saveFood,
                                  saveRecommendedFood,
                                  addUserPoints,
                                  classes,
                                }) => {
  const [validation, setValidation] = useState(false);
  const [status, setStatus] = useState([]);

  const { promiseInProgress: savingRecommendations } = usePromiseTracker({ area: 'postRecommendations' });
  const { promiseInProgress: loadingRecs } = usePromiseTracker({ area: 'getSearchTerms-rec' });
  const { promiseInProgress: loadingFoods } = usePromiseTracker({ area: 'getSearchTerms-food' });
  const loadingSearchTerms = loadingRecs || loadingFoods;
  const addRecommendationsDisabled = loadingSearchTerms || savingRecommendations;

  const isValid = food => {
    if (!validation) {
      return !!food && food.id ? true : null;
    }
    if (!food || !food.id || !food.name) return false;

    const allFoodIds = foods.concat(recommendations).map(item => item.name);
    const sameIds = allFoodIds.filter(id => id === food.name);
    return food.id.length > 0 && food.name.length > 2 && sameIds.length <= 1;
  };

  const setFood = food => {
    if (food) {
      saveFood(food);
    }
  };

  const setRecommendation = food => {
    if (food) {
      saveRecommendedFood(food);
    }
  };

  const validateFields = () => {
    const allFoods = foods.concat(recommendations);
    const emptyFields = allFoods.filter(food => !food.id);
    const duplicatedFoods = difference(allFoods, uniqBy(allFoods, 'id'), 'id');
    return duplicatedFoods.length === 0 && emptyFields.length === 0;
  };

  const updateStatus = newStatus => {
    if (Array.isArray(newStatus)) {
      const statusToAppend = [];
      newStatus.map((statusLine, index) =>
        index === 0
          ? statusToAppend.push(`${getTime()} - ${statusLine}`)
          : statusToAppend.push(statusLine),
      );
      setStatus([...statusToAppend, '', ...status]);
    } else {
      setStatus([`${getTime()} - ${newStatus}`, '', ...status]);
    }
  };

  const addRecommendations = async () => {
    const recommendationsPayload = [];

    if (!validateFields()) {
      setValidation(true);
      updateStatus('No duplicate nor empty fields are allowed when inserting recommendations!');
      return;
    }

    for (const food of foods) {
      for (const recommendation of recommendations) {
        recommendationsPayload.push({
          food: { id: food.id, name: food.name },
          recommendation: { id: recommendation.id, name: recommendation.name },
          contributors: [{ id: userDetails.email }],
        });
      }
    }

    const result = await postRecommendations(recommendationsPayload);
    if (!result) return;

    const recCount = recommendationsPayload.length;
    const insertedCount = result.inserted ? result.inserted.length : 0;
    const incrementedCount = result.incremented ? result.incremented.length : 0;
    const duplicatesCount = result.duplicates ? result.duplicates.length : 0;

    if (insertedCount + incrementedCount === recCount) {
      // Reset fields if all combinations were stored successfully
      removeAllFoods();
      setValidation(false);

      const addedPoints = calcPoints({ added: insertedCount, incremented: incrementedCount });
      addUserPoints(addedPoints);

      const recommendationString = insertedCount === 1 ? 'recommendation' : 'recommendations';
      let status = `${insertedCount} new ${recommendationString} added to the database!`;

      if (result.incremented) {
        status = status + ` Added your contribution to ${incrementedCount} already present.`;
      }
      status += ` +${addedPoints} points`;
      updateStatus(status);
    } else {
      if (duplicatesCount > 0) {
        const duplicatesList = result.duplicates.map(dup => `${dup.food.name} -> ${dup.recommendation.name}`);
        updateStatus([
          'Some recommendations have already been submitted by you!',
          'Please remove these before submitting again:',
          ...duplicatesList,
        ]);
      } else {
        updateStatus([
          'Something went wrong when saving record(s) to database.',
          'Please refresh and try again. If it persists please contact us!',
        ]);
      }
    }
  };

  return (
    <>
      <div className={classes.main}>
        <RepeatableFoodsPanel title='Choose food(s):'
                              foods={foods}
                              addEmptyField={addEmptyFood}
                              setFood={setFood}
                              removeField={removeFood}
                              isValid={isValid}/>
        <RepeatableFoodsPanel title='Healthier alternative(s):'
                              foods={recommendations}
                              addEmptyField={addEmptyRecommendedFood}
                              setFood={setRecommendation}
                              removeField={removeRecommendedFood}
                              isValid={isValid}/>
      </div>
      <div className={classes.submit}>
        <ButtonWithSpinner
          action={addRecommendations}
          disabled={addRecommendationsDisabled}
          context='postRecommendations'
        >
          Add recommendation(s)
        </ButtonWithSpinner>
      </div>
      {status.length > 0 ? <Status status={status}/> : null}
    </>
  );
};

AddBulkRecommendations.propTypes = {
  recommendations: PropTypes.array,
  foods: PropTypes.array,
  addEmptyFood: PropTypes.func,
  removeFood: PropTypes.func,
  addEmptyRecommendedFood: PropTypes.func,
  removeRecommendedFood: PropTypes.func,
  removeAllFoods: PropTypes.func,
  userDetails: PropTypes.object,
  classes: PropTypes.object.isRequired,
  saveFood: PropTypes.func,
  saveRecommendedFood: PropTypes.func,
  addUserPoints: PropTypes.func,
};

const mapStateToProps = states => {
  return {
    recommendations: states.addRecommendationState.recommendedFoods,
    foods: states.addRecommendationState.foods,
    userDetails: states.globalState.userDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  removeFood: food => dispatch(removeFoodAction(food)),
  removeRecommendedFood: food => dispatch(removeRecommendedFoodAction(food)),
  addEmptyFood: () => dispatch(addFoodAction(emptyFood())),
  addEmptyRecommendedFood: () => dispatch(addRecommendedFoodAction(emptyFood())),
  removeAllFoods: () => dispatch(removeAllFoodsAndRecommendationsAction()),
  saveFood: food => dispatch(editFoodAction(food)),
  saveRecommendedFood: food => dispatch(editRecommendedFoodAction(food)),
  addUserPoints: points => dispatch(addUserPointsAction(points)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBulkRecommendations);

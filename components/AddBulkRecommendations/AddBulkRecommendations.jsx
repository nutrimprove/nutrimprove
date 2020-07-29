import ButtonWithSpinner from 'components/ButtonWithSpinner';
import Filters from 'components/Filters';
import RepeatableFoodsPanel from 'components/RepeatableFoodsPanel';
import StatusMessage from 'components/StatusMessage';
import { calcPoints } from 'helpers/userUtils';
import { getTime } from 'helpers/utils';
import { postRecommendations } from 'interfaces/api/recommendations';
import { difference, uniqBy } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { addUserPointsAction } from 'store/global/actions';

const AddBulkRecommendations = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const [recommendedFoods, setRecommendedFoods] = useState();
  const [foods, setFoods] = useState();
  const [validation, setValidation] = useState(false);
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();

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

    const allFoodIds = foods.concat(recommendedFoods).map(item => item.name);
    const sameIds = allFoodIds.filter(id => id === food.name);
    return food.id.length > 0 && food.name.length > 2 && sameIds.length <= 1;
  };

  const validateFields = () => {
    const allFoods = foods.concat(recommendedFoods);
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

    if (!userDetails || !userDetails.email) {
      console.error('No user logged in?!');
      return;
    }

    // Every recommendation will be added to every single food (n->n)
    for (const food of foods) {
      for (const recommendation of recommendedFoods) {
        recommendationsPayload.push({
          food: { id: food.foodCode, name: food.foodName },
          recommendation: { id: recommendation.foodCode, name: recommendation.foodName },
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
    let status;

    if (insertedCount + incrementedCount === recCount) {
      const addedPoints = calcPoints({ added: insertedCount, incremented: incrementedCount });
      dispatch(addUserPointsAction(addedPoints));

      const recommendationString = insertedCount === 1 ? 'recommendation' : 'recommendations';
      status = `${insertedCount} new ${recommendationString} added to the database!`;

      if (result.incremented) {
        status = status + ` Added your contribution to ${incrementedCount} already present.`;
      }
      status += ` +${addedPoints} points`;
      updateStatus(status);

      // Reset fields if all combinations were stored successfully
      removeAllFoods();
      setValidation(false);
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
      <Filters/>
      <div className={classes.main}>
        <RepeatableFoodsPanel title='Choose food(s):'
                              foods={setFoods}
                              isValid={isValid}
        />
        <RepeatableFoodsPanel title='Healthier alternative(s):'
                              foods={setRecommendedFoods}
                              isValid={isValid}
        />
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
      {status.length > 0 ? <StatusMessage status={status}/> : null}
    </>
  );
};

AddBulkRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddBulkRecommendations;

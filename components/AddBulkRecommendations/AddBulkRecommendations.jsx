import RepeatableFoodsPanel from 'components/AddBulkRecommendations/RepeatableFoodsPanel';
import ButtonWithSpinner from 'components/ButtonWithSpinner';
import Filters from 'components/Filters';
import StatusMessage from 'components/StatusMessage';
import { calcPoints } from 'helpers/userUtils';
import { getTime } from 'helpers/utils';
import { postRecommendations } from 'interfaces/api/recommendations';
import { difference, uniqBy, uniqueId } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useDispatch, useSelector } from 'react-redux';
import { addUserPointsAction } from 'store/global/actions';

const MAX_FIELDS = 5;
const newField = () => ({
  key: uniqueId(),
  foodCode: '',
  foodName: '',
});

const AddBulkRecommendations = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const [recommendedFoods, setRecommendedFoods] = useState([newField()]);
  const [foods, setFoods] = useState([newField()]);
  const [invalidFoods, setInvalidFoods] = useState([]);
  const [validation, setValidation] = useState();
  const [status, setStatus] = useState([]);
  const dispatch = useDispatch();

  const { promiseInProgress: savingRecommendations } = usePromiseTracker({ area: 'postRecommendations' });
  const { promiseInProgress: loadingRecs } = usePromiseTracker({ area: 'getSearchTerms-rec' });
  const { promiseInProgress: loadingFoods } = usePromiseTracker({ area: 'getSearchTerms-food' });
  const loadingSearchTerms = loadingRecs || loadingFoods;
  const addRecommendationsDisabled = loadingSearchTerms || savingRecommendations;

  useEffect(() => {
    validation && validateFields();
  }, [foods, recommendedFoods]);

  const validateFields = () => {
    const allFoods = foods.concat(recommendedFoods);
    const emptyFields = allFoods.filter(({ foodCode }) => foodCode.length === 0);
    const nonEmptyFields = allFoods.filter(({ foodCode }) => foodCode.length > 0);
    const duplicateFoods = difference(nonEmptyFields, uniqBy(nonEmptyFields, 'foodCode'), 'foodCode');
    const invalidFoods = [...emptyFields, ...duplicateFoods];
    setInvalidFoods(invalidFoods);
    const valid = invalidFoods.length === 0;
    setValidation(!valid);
    return valid;
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

  const updateFood = (newFood, fieldKey) => {
    // updateFoodsObject(newFood, fieldKey, foods);
    const foodIndex = foods.findIndex(({ key }) => key === fieldKey);
    const updatedFoods = [...foods];
    updatedFoods.splice(foodIndex, 1, { ...foods[foodIndex], ...newFood });
    setFoods(updatedFoods);
  };

  const updateRecommendedFood = (newFood, fieldKey) => {
    // updateFoodsObject(newFood, fieldKey, recommendedFoods, true);
    const foodIndex = recommendedFoods.findIndex(({ key }) => key === fieldKey);
    const updatedFoods = [...recommendedFoods];
    updatedFoods.splice(foodIndex, 1, { ...recommendedFoods[foodIndex], ...newFood });
    setRecommendedFoods(updatedFoods);
  };

  const updateFoodsObject = (newFood, fieldKey, foods, isRecommendation) => {
    const foodIndex = foods.findIndex(({ key }) => key === fieldKey);
    const updatedFoods = [...foods];
    updatedFoods.splice(foodIndex, 1, { ...foods[foodIndex], ...newFood });
    isRecommendation
      ? setRecommendedFoods(updatedFoods)
      : setFoods(updatedFoods);
    validateFields();
  };

  const removeFood = ({ currentTarget }) => {
    setFoods(foods.filter(({ key }) => key !== currentTarget.dataset.key));
  };

  const removeRecommendedFood = ({ currentTarget }) => {
    setRecommendedFoods(recommendedFoods.filter(({ key }) => key !== currentTarget.dataset.key));
  };

  const addFood = () => {
    setFoods([...foods, newField()]);
  };

  const addRecommendedFood = () => {
    setRecommendedFoods([...recommendedFoods, newField()]);
  };

  const resetFields = () => {
    setFoods([newField()]);
    setRecommendedFoods([newField()]);
  };

  const addRecommendations = async () => {
    const recommendationsPayload = [];

    if (!validateFields()) {
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
      resetFields();
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
                              foods={foods}
                              onSelection={updateFood}
                              onRemove={removeFood}
                              onAdd={addFood}
                              maxFields={MAX_FIELDS}
                              invalidFoods={invalidFoods}
                              validation={validation}
        />
        <RepeatableFoodsPanel title='Healthier alternative(s):'
                              foods={recommendedFoods}
                              onSelection={updateRecommendedFood}
                              onRemove={removeRecommendedFood}
                              onAdd={addRecommendedFood}
                              maxFields={MAX_FIELDS}
                              invalidFoods={invalidFoods}
                              validation={validation}
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

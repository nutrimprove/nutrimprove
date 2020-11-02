import ActionsPanel from 'components/ActionsPanel';
import ButtonWithSpinner from 'components/ButtonWithSpinner';
import CompareModal from 'components/CompareModal';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import { calcPoints } from 'helpers/userUtils';
import { parseFoodDetails } from 'helpers/utils';
import { postRecommendations } from 'interfaces/api/recommendations';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserPointsAction } from 'store/global/actions';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [status, setStatus] = useState({});
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    setStatus({});
  }, [food, recommendedFood]);

  const addRecommendations = async ({ foods, recommendations, onSuccess, onFailure }) => {
    const recommendationsPayload = [];

    if(!userDetails) {
      console.error('No user logged in?!');
      return;
    }

    // Every recommendation will be added to every single food (n->n)
    for (const food of foods) {
      for (const recommendation of recommendations) {
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
      onSuccess(status);
    } else {
      if (duplicatesCount > 0) {
        if (result.duplicates.length === 1) {
          status = [
            'Recommendation already submitted by you!',
            'Please choose another combination before submitting again',
          ];
        } else {
          const duplicatesList = result.duplicates.map(dup => `${dup.food.name} -> ${dup.recommendation.name}`);
          status = [
            'Some recommendations have already been submitted by you!',
            'Please remove these before submitting again:',
            ...duplicatesList,
          ];
        }
      } else {
        status = [
          'Something went wrong when saving record(s) to database.',
          'Please refresh and try again. If it persists please contact us!',
        ];
      }
      onFailure(status);
    }
  };

  const setHoveredNutrient = event => {
    setHoveredItem(event.currentTarget.dataset.name);
  };

  const getFoodDetails = food => parseFoodDetails({ food, filterEmptyValues: false });

  const compareFoods = () => {
    setCompareOpen(true);
    const foodDetails = getFoodDetails(food);
    const recommendedFoodDetails = getFoodDetails(recommendedFood);
    setComparisonData([foodDetails, recommendedFoodDetails]);
  };

  const addRecommendation = async () => {
    await addRecommendations({
      foods: [food],
      recommendations: [recommendedFood],
      onSuccess: message => {
        setStatus({ type: 'success', content: message });
      },
      onFailure: message => {
        setStatus({ type: 'fail', content: message });
      },
    });
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

  return (
    <>
      <Filters/>
      <div className={classes.cards}>
        <FoodCardWithSearch title='Food'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='food'
                            onFoodLoad={setFood}
                            className={classes.card}
        />
        <FoodCardWithSearch title='Recommendation'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='recommendation'
                            onFoodLoad={setRecommendedFood}
                            className={classes.card}
                            searchLabel='Type recommendation'
        />
      </div>
      <ActionsPanel food={food} recommendedFood={recommendedFood} status={status}>
        <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
        <ButtonWithSpinner className={classes.button}
                           action={addRecommendation}
                           disabled={status.type === 'fail'}
                           context='postRecommendations'
        >
          Add Recommendation
        </ButtonWithSpinner>
      </ActionsPanel>
      {compareOpen && (
        <CompareModal dataSet={comparisonData}
                      open={compareOpen}
                      onClose={handleCloseModal}
        />)}
    </>
  );
};

AddRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddRecommendations;

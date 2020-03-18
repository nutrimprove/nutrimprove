import SearchInputField from './SearchInputField';
import React, { useState } from 'react';
import RemoveIcon from './RemoveIcon';
import MainButton from './MainButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { emptyFood, getTime } from '../helpers/utils';
import {
  addFoodAction,
  addRecommendedFoodAction,
  editFoodAction,
  editRecommendedFoodAction,
  removeAllFoodsAndRecommendationsAction,
  removeFoodAction,
  removeRecommendedFoodAction,
} from '../store/addRecommendation/actions';
import { postRecommendations } from '../connect/api';
import { difference, uniqBy } from 'lodash';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import { usePromiseTracker } from 'react-promise-tracker';
import ButtonWithSpinner from './ButtonWithSpinner';
import Status from './Status';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { calcPoints } from '../helpers/userUtils';

const maxFoodFields = 4;
const maxRecommendationFields = 4;
const defaultAddRecsButtonText = 'Add recommendation(s)';

const sectionHeader = {
  title: 'Add Recommendations',
  subtitle:
    'Choose the foods and the recommendations you would like to provide',
};

const AddRecommendationsPage = ({
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
  classes,
}) => {
  const [validation, setValidation] = useState(false);
  const [status, setStatus] = useState([]);

  const { promiseInProgress: savingRecommendations } = usePromiseTracker({
    area: 'postRecommendations',
  });
  const { promiseInProgress: loadingRecs } = usePromiseTracker({
    area: 'getSearchTerms-rec',
  });
  const { promiseInProgress: loadingFoods } = usePromiseTracker({
    area: 'getSearchTerms-food',
  });
  const loadingSearchTerms = loadingRecs || loadingFoods;

  const addRecommendationDisabled =
    recommendations.length >= maxRecommendationFields;
  const addFoodDisabled = foods.length >= maxFoodFields;
  const addRecommendationsDisabled =
    loadingSearchTerms || savingRecommendations;

  if (foods.length === 0) {
    addEmptyFood();
  }

  if (recommendations.length === 0) {
    addEmptyRecommendedFood();
  }

  const isValid = food => {
    if (!validation) {
      return !!food && food.id ? true : null;
    }

    if (!food || !food.id || !food.name) return false;

    const allFoodIds = foods
      .concat(recommendations)
      .map(item => item.name);
    const sameIds = allFoodIds.filter(id => id === food.name);
    return (
      food.id.length > 0 && food.name.length > 2 && sameIds.length <= 1
    );
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

  const renderRemoveIcon = (food, isRecommendation) => {
    return isRecommendation ? (
      <RemoveIcon foodItem={food} action={removeRecommendedFood} />
    ) : (
      <RemoveIcon foodItem={food} action={removeFood} />
    );
  };

  /**
   * @param foods foods to render in input fields
   * @param isRecommendation if the food is a recommendation
   * @returns {*}
   */
  const renderField = ({ foods, isRecommendation }) =>
    foods.map(food => (
      <div key={food.key} className={classes.searchfood}>
        <SearchInputField
          isValid={isValid(food)}
          foodAction={isRecommendation ? setRecommendation : setFood}
          foodKey={food.key}
        />
        {foods.length <= 1 ? (
          <RemoveIcon />
        ) : (
          renderRemoveIcon(food, isRecommendation)
        )}
      </div>
    ));

  const validateFields = () => {
    const allFoods = foods.concat(recommendations);
    const emptyFields = allFoods.filter(food => !food.id);
    const duplicatedFoods = difference(
      allFoods,
      uniqBy(allFoods, 'id'),
      'id'
    );
    return duplicatedFoods.length === 0 && emptyFields.length === 0;
  };

  const updateStatus = newStatus => {
    if (Array.isArray(newStatus)) {
      const statusToAppend = [];
      newStatus.map((statusLine, index) => {
        index === 0
          ? statusToAppend.push(`${getTime()} - ${statusLine}`)
          : statusToAppend.push(statusLine);
      });
      setStatus([...statusToAppend, '', ...status]);
    } else {
      setStatus([`${getTime()} - ${newStatus}`, '', ...status]);
    }
  };

  const addRecommendations = async () => {
    const recommendationsPayload = [];

    if (!validateFields()) {
      setValidation(true);
      updateStatus(
        'No duplicate nor empty fields are allowed when inserting recommendations!'
      );
      return;
    }

    for (const food of foods) {
      for (const recommendation of recommendations) {
        recommendationsPayload.push({
          food: {
            id: food.id,
            name: food.name,
          },
          recommendation: {
            id: recommendation.id,
            name: recommendation.name,
          },
          contributors: [{ id: userDetails.email }],
        });
      }
    }

    const result = await postRecommendations(recommendationsPayload);

    if (result) {
      const recCount = recommendationsPayload.length;
      const insertedCount = result.inserted ? result.inserted.length : 0;
      const incrementedCount = result.incremented
        ? result.incremented.length
        : 0;
      const duplicatesCount = result.duplicates
        ? result.duplicates.length
        : 0;

      if (insertedCount + incrementedCount === recCount) {
        // Reset fields if all combinations were stored successfully
        removeAllFoods();
        setValidation(false);

        const addedPoints = calcPoints({
          added: insertedCount,
          incremented: incrementedCount,
        });

        const recommendationString =
          insertedCount === 1 ? 'recommendation' : 'recommendations';

        let status = `${insertedCount} new ${recommendationString} added to the database!`;

        if (result.incremented) {
          status =
            status +
            ` Added your contribution to ${incrementedCount} already present.`;
        }
        status += ` +${addedPoints} points`;
        updateStatus(status);
      } else {
        if (duplicatesCount > 0) {
          const duplicatesList = result.duplicates.map(
            dup => `${dup.food.name} -> ${dup.recommendation.name}`
          );
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
    }

    return result;
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <Typography paragraph={true} variant='subtitle2'>
        Please refer to the <Link href={'/help#add_recs'}>Help page</Link>{' '}
        for instructions.
      </Typography>
      <div className={classes.main}>
        <div className={classes.fieldBox}>
          <Typography className={classes.fieldtitle} component='h4'>
            Choose food(s):
          </Typography>
          <div id='foods_input'>
            {renderField({ foods, isRecommendation: false })}
            <MainButton action={addEmptyFood} disabled={addFoodDisabled}>
              Add
            </MainButton>
          </div>
        </div>
        <div className={classes.fieldBox}>
          <Typography className={classes.fieldtitle} component='h4'>
            Healthier alternative(s):
          </Typography>
          <div id='recommendations_input'>
            {renderField({
              foods: recommendations,
              isRecommendation: true,
            })}
            <MainButton
              action={addEmptyRecommendedFood}
              disabled={addRecommendationDisabled}
            >
              Add
            </MainButton>
          </div>
        </div>
      </div>
      <div className={classes.submit}>
        <ButtonWithSpinner
          action={addRecommendations}
          disabled={addRecommendationsDisabled}
          context='postRecommendations'
        >
          {defaultAddRecsButtonText}
        </ButtonWithSpinner>
      </div>
      {status.length > 0 ? <Status status={status} /> : null}
    </>
  );
};

AddRecommendationsPage.propTypes = {
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
};

const styles = {
  fieldBox: {
    float: 'left',
    marginRight: 80,
    marginBottom: 30,
    width: 300,
    border: '1px dashed #ddd',
    padding: '30px 40px',
    borderRadius: 9,
    backgroundColor: '#dfefff',
    borderStyle: 'outset',
    height: 'fit-content',
  },
  title: {
    fontSize: '1.4em',
  },
  subtitle: {
    fontSize: '0.8em',
  },
  fieldtitle: {
    marginBottom: 20,
  },
  searchfood: {
    display: '-webkit-box',
  },
  main: {
    display: 'flex',
  },
  submit: {
    marginTop: 10,
  },
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
  removeRecommendedFood: food =>
    dispatch(removeRecommendedFoodAction(food)),
  addEmptyFood: () => dispatch(addFoodAction(emptyFood())),
  addEmptyRecommendedFood: () =>
    dispatch(addRecommendedFoodAction(emptyFood())),
  removeAllFoods: () => dispatch(removeAllFoodsAndRecommendationsAction()),
  saveFood: food => dispatch(editFoodAction(food)),
  saveRecommendedFood: food => dispatch(editRecommendedFoodAction(food)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddRecommendationsPage));

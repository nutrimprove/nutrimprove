import SearchFoodField from './SearchFoodField';
import React, { useState } from 'react';
import RemoveIcon from './RemoveIcon';
import PrimaryButton from './PrimaryButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { getTime } from '../helpers/utils';
import {
  addFoodAction,
  addRecommendedFoodAction,
  editFood,
  removeAllFoodsAndRecommendationsAction,
} from '../store/addRecommendation/actions';
import { postRecommendations } from '../connect/api';
import * as _ from 'lodash';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import { usePromiseTracker } from 'react-promise-tracker';
import ButtonWithSpinner from './ButtonWithSpinner';
import Status from './Status';

const maxFoodFields = 4;
const maxRecommendationFields = 4;
const defaultAddRecsButtonText = 'Add recommendation(s)';

const sectionHeader = {
  title: 'Add Recommendations',
  subtitle:
    'Choose the foods and the recommendations you would like to provide',
};

const AddRecommendations = ({
  foods,
  recommendations,
  addEmptyRecommendedFood,
  addEmptyFood,
  removeAllFoods,
  userDetails,
  setSearchTerm,
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

  const renderField = foods =>
    foods.map(food => (
      <div key={food.key} className={classes.searchfood}>
        <SearchFoodField
          food={food}
          isValid={isValid(food)}
          action={setSearchTerm}
          loadingContext={`getSearchTerms-${food.key}`}
        />
        {foods.length <= 1 ? (
          <RemoveIcon />
        ) : (
          <RemoveIcon foodItem={food} />
        )}
      </div>
    ));

  const isValid = food => {
    if (validation) {
      const allFoodIds = foods
        .concat(recommendations)
        .map(item => item.name);
      const sameIds = allFoodIds.filter(id => id === food.name);
      return (
        food &&
        food.id.length > 0 &&
        food.name.length > 2 &&
        sameIds.length <= 1
      );
    }
    return true;
  };

  const validateFields = () => {
    const allFoods = foods.concat(recommendations);
    const emptyFields = allFoods.filter(food => food.id.length === 0);
    const duplicatedFoods = _.difference(
      allFoods,
      _.uniqBy(allFoods, 'id'),
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
          contributorId: userDetails.email,
        });
      }
    }

    const result = await postRecommendations(recommendationsPayload);

    if (result) {
      const recCount = recommendationsPayload.length;

      if (result.length === recCount) {
        // Reset fields if all combinations were stored successfully
        removeAllFoods();
        setValidation(false);

        const recommendationString =
          recCount === 1 ? 'recommendation' : 'recommendations';
        updateStatus(
          `${recCount} ${recommendationString} added to the database!`
        );
      } else {
        if (result.duplicates) {
          const duplicatesList = result.duplicates.map(
            dup => `${dup.food} -> ${dup.recommendation}`
          );
          updateStatus([
            'Some recommendations are already present in the database!',
            'Please remove these before submitting again:',
            ...duplicatesList,
          ]);
        } else {
          updateStatus([
            'Something went wrong when saving records to database.',
            'Please refresh and try again. If it persists please contact us!',
          ]);
        }
      }
    } else {
      updateStatus(`Something went wrong. No results.`);
    }
    return result;
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <div className={classes.main}>
        <div className={classes.fieldBox}>
          <div className={classes.fieldtitle}>Choose food(s):</div>
          <div id='foods_input'>
            {renderField(foods)}
            <PrimaryButton
              action={addEmptyFood}
              disabled={addFoodDisabled}
            >
              Add
            </PrimaryButton>
          </div>
        </div>
        <div className={classes.fieldBox}>
          <div className={classes.fieldtitle}>
            Healthier alternative(s):
          </div>
          <div id='recommendations_input'>
            {renderField(recommendations)}
            <PrimaryButton
              action={addEmptyRecommendedFood}
              disabled={addRecommendationDisabled}
            >
              Add
            </PrimaryButton>
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

AddRecommendations.propTypes = {
  recommendations: PropTypes.Array,
  foods: PropTypes.Array,
  addEmptyFood: PropTypes.function,
  addEmptyRecommendedFood: PropTypes.function,
  removeAllFoods: PropTypes.function,
  userDetails: PropTypes.object,
  classes: PropTypes.object.isRequired,
  setSearchTerm: PropTypes.function,
};

const styles = {
  fieldBox: {
    float: 'left',
    marginRight: 80,
    marginBottom: 30,
    width: 300,
    border: '1px dashed #ddd',
    padding: 20,
  },
  title: {
    fontSize: '1.4em',
  },
  subtitle: {
    fontSize: '0.8em',
  },
  fieldtitle: {
    marginBottom: 30,
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

const mapStateToProps = (states, ownProps) => {
  return {
    recommendations: states.addRecommendationState.recommendedFoods,
    foods: states.addRecommendationState.foods,
    userDetails: states.globalState.userDetails,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const addEmptyField = action => {
    dispatch(
      action({
        key: uniqid(),
        id: '',
        name: '',
        suggestions: [],
      })
    );
  };

  return {
    addEmptyRecommendedFood: () => addEmptyField(addRecommendedFoodAction),
    addEmptyFood: () => addEmptyField(addFoodAction),
    removeAllFoods: () =>
      dispatch(removeAllFoodsAndRecommendationsAction()),
    setSearchTerm: (food, name) => {
      dispatch(editFood(food, name, food.isRecommendation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddRecommendations));

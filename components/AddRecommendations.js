import SearchFoodField from './SearchFoodField';
import React, { useState } from 'react';
import RemoveIcon from './RemoveIcon';
import AddButton from './AddButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import {
  addFoodAction,
  addRecommendedFoodAction,
  removeAllFoodsAndRecommendationsAction,
  setSavingAction,
} from '../store/addRecommendation/actions';
import { postRecommendations } from '../connect/api';
import * as _ from 'lodash';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';

const maxFoodFields = 4;
const maxRecommendationFields = 4;
const defaultAddRecsButtonText = 'Add recommendation(s)';
const title = 'Add Recommendations';
const subtitle =
  'Choose the foods and the recommendations you would like to provide';

const AddRecommendations = ({
  foods,
  recommendations,
  isSaving,
  addEmptyRecommendedFood,
  addEmptyFood,
  removeAllFoods,
  setSaving,
  classes,
}) => {
  const [validation, setValidation] = useState(false);
  const [status, setStatus] = useState('');

  if (foods.length === 0) {
    addEmptyFood();
  }

  if (recommendations.length === 0) {
    addEmptyRecommendedFood();
  }

  const renderField = foods =>
    foods.map(food => (
      <div key={food.key} className={classes.searchfood}>
        <SearchFoodField food={food} isValid={isValid} />
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

  const addRecommendations = async () => {
    const recommendationsPayload = [];

    if (!validateFields()) {
      setValidation(true);
      setStatus(
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
          contributorId: '099', // Requires authentication to populate this value dynamically
        });
      }
    }

    setSaving(true);
    const result = await postRecommendations(recommendationsPayload);
    setSaving(false);

    // Reset fields if all combinations were stored successfully
    if (result.insertedCount === recommendationsPayload.length) {
      removeAllFoods();
      setValidation(false);
      setStatus(
        `Recommendations inserted into the database! (#${recommendationsPayload.length})`
      );
    } else {
      setStatus(
        'Something went wrong when saving records to database.\nPlease refresh and try again. If it persists please contact us!'
      );
      console.error('Something went wrong!');
      console.error(
        `Recommendations records: ${recommendationsPayload.length}, inserted into DB: ${result.insertedCount}`
      );
    }
    return result;
  };

  return (
    <>
      <SectionHeader title={title} subtitle={subtitle} />
      <div className={classes.main}>
        <div className={classes.fieldBox}>
          <div className={classes.fieldtitle}>Choose food(s):</div>
          <div id='foods_input'>
            {renderField(foods)}
            {foods.length < maxFoodFields ? (
              <AddButton action={addEmptyFood} text='Add' />
            ) : (
              <AddButton text='Add' />
            )}
          </div>
        </div>
        <div className={classes.fieldBox}>
          <div className={classes.fieldtitle}>
            Healthier alternative(s):
          </div>
          <div id='recommendations_input'>
            {renderField(recommendations)}
            {recommendations.length < maxRecommendationFields ? (
              <AddButton action={addEmptyRecommendedFood} text='Add' />
            ) : (
              <AddButton text='Add' />
            )}
          </div>
        </div>
      </div>
      <div className={classes.submit}>
        {isSaving ? (
          <AddButton text='Saving...' />
        ) : (
          <AddButton
            action={addRecommendations}
            text={defaultAddRecsButtonText}
          />
        )}
      </div>
      <div className={classes.status}>{status}</div>
    </>
  );
};

AddRecommendations.propTypes = {
  recommendations: PropTypes.Array,
  foods: PropTypes.Array,
  isSaving: PropTypes.bool,
  addEmptyFood: PropTypes.function,
  addEmptyRecommendedFood: PropTypes.function,
  removeAllFoods: PropTypes.function,
  setSaving: PropTypes.function,
  classes: PropTypes.object.isRequired,
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
  status: {
    marginTop: 30,
    fontSize: '0.9em',
    backgroundColor: '#ffc',
  },
  searchfood: {
    display: '-webkit-box',
  },
  main: {
    display: 'flex',
  },
  submit: {
    marginTop: 20,
  },
};

const mapStateToProps = (states, ownProps) => {
  return {
    recommendations: states.addRecommendationState.recommendedFoods,
    foods: states.addRecommendationState.foods,
    isSaving: states.addRecommendationState.isSaving,
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
    setSaving: value => dispatch(setSavingAction(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddRecommendations));

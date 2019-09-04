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
} from '../store/addRecommendation/actions';
import { postRecommendations } from '../connect/api';

const maxFoodFields = 4;
const maxRecommendationFields = 4;
const defaultAddRecsButtonText = 'Add recommendation(s)';

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
    marginBottom: 30,
    fontWeight: 'bold',
  },
};

const AddRecommendations = ({
  foods,
  recommendations,
  addEmptyRecommendedFood,
  addEmptyFood,
  removeAllFoods,
}) => {
  const [validation, setValidation] = useState(false);
  const [saving, setSaving] = useState(false);

  if (foods.length === 0) {
    addEmptyFood();
  }

  if (recommendations.length === 0) {
    addEmptyRecommendedFood();
  }

  const renderField = foods => {
    return foods.map(food => (
      <div key={food.key} style={{ display: '-webkit-box' }}>
        <SearchFoodField
          className='food'
          food={food}
          validation={validation}
        />
        {foods.length <= 1 ? (
          <RemoveIcon />
        ) : (
          <RemoveIcon foodItem={food} />
        )}
      </div>
    ));
  };

  const addRecommendations = async () => {
    const recommendationsPayload = [];

    for (const food of foods) {
      for (const recommendation of recommendations) {
        if (!food.id.length || !recommendation.id.length) {
          setValidation(true);
          return;
        }
        recommendationsPayload.push({
          foodId: food.id,
          recommendationId: recommendation.id,
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
    } else {
      console.error('Something went wrong!');
      console.error(
        `Recommendations records: ${recommendationsPayload.length}, inserted into DB: ${result.insertedCount}`
      );
    }
    return result;
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Choose food:
          </div>
          <div id='foods_input'>
            {renderField(foods)}
            {foods.length < maxFoodFields ? (
              <AddButton action={addEmptyFood} text='Add' />
            ) : (
              <AddButton text='Add' />
            )}
          </div>
        </div>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Healthier alternatives(s):
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
      <div id='submit' style={{ marginTop: 20 }}>
        {saving ? (
          <AddButton text='Saving...' />
        ) : (
          <AddButton
            action={addRecommendations}
            text={defaultAddRecsButtonText}
          />
        )}
      </div>
    </>
  );
};

AddRecommendations.propTypes = {
  recommendations: PropTypes.Array,
  foods: PropTypes.Array,
  addEmptyFood: PropTypes.function,
  addEmptyRecommendedFood: PropTypes.function,
  removeAllFoods: PropTypes.function,
};

const mapStateToProps = (states, ownProps) => {
  return {
    recommendations: states.addRecommendationState.recommendedFoods,
    foods: states.addRecommendationState.foods,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecommendations);

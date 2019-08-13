import AutoCompleteField from './SearchFoodField';
import React from 'react';
import RemoveIcon from './RemoveIcon';
import AddButton from './AddButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addFood,
  addRecommendedFood,
} from '../store/addRecommendation/actions';
import { addRecommendations } from '../connect/api';

const maxFoodFields = 5;
const maxRecommendationFields = 5;

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
}) => {
  const renderField = (item, items) => {
    return (
      <div key={item.key} style={{ display: '-webkit-box' }}>
        <AutoCompleteField className='food' foodItem={item} />
        {items.length <= 1 ? (
          <RemoveIcon />
        ) : (
          <RemoveIcon foodItem={item} />
        )}
      </div>
    );
  };

  const update = () => {
    console.log(`====Foods===> ${JSON.stringify(foods)}`);
    console.log(`====Recs===> ${JSON.stringify(recommendations)}`);

    const recommendationsPayload = [];

    foods.forEach(food => {
      recommendations.forEach(recommendation => {
        recommendationsPayload.push({
          foodId: food.food,
          recommendationId: recommendation.food,
          contributorId: '099',
        });
      });
    });
    console.log('----->' + JSON.stringify(recommendationsPayload));
    addRecommendations(recommendationsPayload);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Choose food:
          </div>
          <div id='foods_input'>
            {foods.map(food => renderField(food, foods))}
            {foods.length < maxFoodFields ? (
              <AddButton
                action={addEmptyFood}
                text='Add'
              />
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
            {recommendations.map(recommendation =>
              renderField(recommendation, recommendations)
            )}
            {recommendations.length < maxRecommendationFields ? (
              <AddButton
                action={addEmptyRecommendedFood}
                text='Add'
              />
            ) : (
              <AddButton text='Add' />
            )}
          </div>
        </div>
      </div>
      <div id='submit' style={{ marginTop: 20 }}>
        <AddButton action={update} text='Add recommendation(s)' />
      </div>
    </>
  );
};
AddRecommendations.propTypes = {
  recommendations: PropTypes.Array,
  foods: PropTypes.Array,
  addEmptyFood: PropTypes.function,
  addEmptyRecommendedFood: PropTypes.function,
};

const mapStateToProps = (states, ownProps) => {
  return {
    recommendations: states.addRecommendationState.recommendedFoods,
    foods: states.addRecommendationState.foods,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addEmptyRecommendedFood: () => {
      dispatch(addRecommendedFood(''));
    },
    addEmptyFood: () => {
      dispatch(addFood(''));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecommendations);

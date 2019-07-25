import React from 'react';
import AutoCompleteField from './SearchFoodField';
import RemoveIcon from './RemoveIcon';
import AddButton from './AddButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addFood,
  addRecommendedFood,
} from '../store/addRecommendation/actions';

const maxFields = 4;

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
    console.log(
      `====Foods===> ${JSON.stringify(foods.map(field => field.key))}`
    );
    console.log(
      `====Recs===> ${JSON.stringify(
        recommendations.map(field => field.key)
      )}`
    );
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Choose food(s):
          </div>
          <div id='foods_input'>
            {foods.map(food => renderField(food, foods))}
            {foods.length < maxFields ? (
              <AddButton
                action={() => {
                  addEmptyFood();
                }}
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
            {recommendations.length < maxFields ? (
              <AddButton
                action={() => {
                  addEmptyRecommendedFood();
                }}
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

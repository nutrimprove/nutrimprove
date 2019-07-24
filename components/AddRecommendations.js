import React, { useState } from 'react';
import uniqid from 'uniqid';
import _ from 'lodash';
import SearchFoodField from './SearchFoodField';
import RemoveIcon from './RemoveIcon';
import AddButton from './AddButton';

const maxFoodFields = 1;
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

const AddRecommendations = () => {
  const [foods, setFoods] = useState(['']);
  const [recommendations, setRecommendations] = useState(['']);

  const addFood = () => {
    const uid = uniqid();
    setFoods([
      ...foods,
      {
        key: uid,
        food: '',
      },
    ]);
  };

  const addRecommendations = () => {
    const uid = uniqid();
    setRecommendations([
      ...recommendations,
      {
        key: uid,
        recommendation: '',
      },
    ]);
  };

  const filter = (items, key) => items.filter(item => item.key !== key);

  const removeField = item => () =>
    _.has(item, 'food')
      ? setFoods(filter(foods, item.key))
      : setRecommendations(filter(recommendations, item.key));

  const isSingle = item =>
    _.has(item, 'food')
      ? foods.length === 1
      : recommendations.length === 1;

  const renderField = item => {
    return (
      <div key={item.key} style={{ display: '-webkit-box' }}>
        <SearchFoodField className='food' />
        {isSingle(item) ? (
          <RemoveIcon />
        ) : (
          <RemoveIcon removeField={removeField(item)} />
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
    addRecommendations({
      foodIds: this.foods.map(food => food.id),
      recommendationsIds: this.recommendations.map(food => food.id),
    });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Choose food:
          </div>
          <div id='foods_input'>
            {foods.map(food => renderField(food))}
            {foods.length < maxFoodFields ? (
              <AddButton action={addFood} text='Add' />
            ) : (
              maxFoodFields > 1 && <AddButton text='Add' />
            )}
          </div>
        </div>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Healthier alternatives(s):
          </div>
          <div id='recommendations_input'>
            {recommendations.map(recommendation =>
              renderField(recommendation)
            )}
            {recommendations.length < maxRecommendationFields ? (
              <AddButton action={addRecommendations} text='Add' />
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

export default AddRecommendations;

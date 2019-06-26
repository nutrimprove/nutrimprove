import React, { useState } from 'react';
import uniqid from 'uniqid';
import _ from 'lodash';
import AutoCompleteField from './SearchFoodField';
import RemoveIcon from './RemoveIcon';
import AddButton from './AddButton';

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

const AddRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [foods, setFoods] = useState([]);

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

  const addRecommendation = () => {
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
        <AutoCompleteField className='food' />
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
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={styles.fieldBox}>
          <div className='title' style={styles.title}>
            Choose food(s):
          </div>
          <div id='foods_input'>
            {foods.map(food => renderField(food))}
            {foods.length < maxFields ? (
              <AddButton action={addFood} text='Add' />
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
              renderField(recommendation)
            )}
            {recommendations.length < maxFields ? (
              <AddButton action={addRecommendation} text='Add' />
            ) : (
              <AddButton text='Add' />
            )}
          </div>
        </div>
      </div>
      <div id='submit' style={{ marginTop: 20 }}>
        <AddButton action={update} text='Add recommendation(s)' />
      </div>
    </Fragment>
  );
};

export default AddRecommendations;

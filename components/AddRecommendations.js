import React, {Fragment, useEffect, useState} from 'react';
import uniqid from 'uniqid';
import AutoCompleteField from './SearchFoodField';
import Button from "@material-ui/core/Button";
import {fetchFoods, fetchRecommendations} from "../connect/api";

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const recBoxStyle = {
  float: 'left',
  marginRight: 80,
  border: '1px dashed #ddd',
  padding: 20,
  marginBottom: 30,
};

const AddRecommendations = () => {
  const [foods, setFoods] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [foodFields, setFoodFields] = useState([]);

  const getFoodName = (index) => foods[index].foodname;
  const getRecommendationName = (index) => recommendations[index].foodname;

  const addField = () => {
    const newFoodFields = [];
    newFoodFields.push(...foodFields);

    const index = newFoodFields.length;
    const uid = uniqid();
    newFoodFields.push(
      <Fragment key={uid}>
        <AutoCompleteField set={setFoods} className='foods'/>
        <Button onClick={(e) => removeField(e, uid)}>-</Button>
      </Fragment>
    );
    setFoodFields(newFoodFields);
  };

   // Index needs to be unique and need to find a way to remove specific element.

  const update = () => {
    console.log(`====PING===> ${JSON.stringify(foodFields.map((field) => field.key))}`);
  };

  const removeField = (e, uid) => {
    let newFoodFields = [...foodFields];
    console.log(`====BEFORE===> ${JSON.stringify(newFoodFields.map((field) => field.key))}`);
    console.log(`====UID===> ${uid}`);

    const fieldWithUid = newFoodFields.find(field => {
      console.log(field);
      if(field.key === uid) {
        console.log('YES');
        return field;
      }
    });
    console.log(`====fieldWithUid===> ${fieldWithUid}`);
    const index = newFoodFields.indexOf(fieldWithUid);
    console.log(`====INDEX===> ${index}`);
    if (index !== -1) {
      newFoodFields.splice(index, 1);
      setFoodFields(newFoodFields);
      console.log(`====AFTER===> ${JSON.stringify(newFoodFields.map((field) => field.key))}`);
    }
  };

  useEffect(() => {
    fetchFoods().then((values) => {
      setFoods(values);
    });
    addField();
  }, []);

  return (
    <form style={{display: 'flex'}}>
      <div style={{display: 'block'}}>
        <div style={recBoxStyle}>
          <div style={{marginBottom: 30}}>Choose food(s):</div>
          <div id='foods_input'>
            {foodFields}
            <Button onClick={addField}>Add</Button>
          </div>
        </div>
        <div style={recBoxStyle}>
          <div style={{marginBottom: 30}}>Recommendation(s) for selected food(s):</div>
          {/*<AutoCompleteField value={getRecommendationName()} set={setRecommendations} className='recommendations'/>*/}
        </div>
        <div id='submit' style={{marginTop: 20}}>
          <Button
            style={buttonStyles}
            variant="contained"
            color="primary"
            onClick={update}
          >
            Add recommendation(s)
          </Button>
        </div>
      </div>
    </form>
  )
};

export default AddRecommendations;

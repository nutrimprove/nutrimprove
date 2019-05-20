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
  marginBottom: 30,
  width: 300,
  border: '1px dashed #ddd',
  padding: 20,
};

const AddRecommendations = () => {
  const [foods, setFoods] = useState();
  const [recommendations, setRecommendations] = useState([]);
  const [foodFields, setFoodFields] = useState([]);

  const getFoodName = (index) => foods[index].foodname;
  const getRecommendationName = (index) => recommendations[index].foodname;

  const addField = () => {
    const uid = uniqid();
    setFoodFields([...foodFields,
      <div key={uid} style={{display: '-webkit-box'}}>
        <AutoCompleteField set={setFoods} className='foods'/>
        {foodFields.length > 0 && <Button onClick={() => removeField(uid)}>-</Button>}
      </div>
    ]);
  };

  const removeField = (uid) => {
    //const newFoodFields = [];
    //console.log(`===Uid====> ${JSON.stringify(uid)}`);
    console.log(`====foodFields===> ${JSON.stringify(foodFields.map(field => field.key))}`);


    // foodFields.forEach(field => {
    //   console.log(`====Field===> ${JSON.stringify(field.key)}`);
    //   if (field.key === uid) {
    //     console.log(`====ADD===> ${JSON.stringify(field.key)}`);
    //     newFoodFields.push(field);
    //   } else {
    //     console.log(`====REMOVE===> ${JSON.stringify(field.key)}`);
    //   }
    // });

    setFoodFields(foodFields);
    //console.log(`====AFTER_newFoodFields===> ${JSON.stringify(newFoodFields.map((field) => field.key))}`);
    //console.log(`====AFTER_foodFields===> ${JSON.stringify(foodFields.map((field) => field.key))}`);

  };

  const update = () => {
    console.log(`====PING===> ${JSON.stringify(foodFields.map(field => field.key))}`);
  };

  useEffect(() => {
    fetchFoods().then((values) => {
      setFoods(values);
    });
    addField();
  }, []);

  return (
    <form style={{display: 'flex'}}>
      <div>
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

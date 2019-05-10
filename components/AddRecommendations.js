import React, {Component} from 'react';
import AutoCompleteField from './SearchFoodField';
import Button from "@material-ui/core/Button";


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

class AddRecommendations extends Component {

   state = {
      food_one: 'Apple',
      food_two: '',
      food_three: '',
      rec_one: '',
      rec_two: '',
      rec_three: '',
   };

   fetchFoods = (endpoint) => {
      return fetch(endpoint)
         .then(response => response.json())
         .then(data => {
            this.setState({values: data.value});
         });
   };

   updateResults = async () => {
      await this.fetchFoods(`/api/v1/recommendations`);
   };

   setValue = (food) => {
      this.setState(() => food);
   };

   render() {
      return (
         <form style={{display: 'flex'}}>
            <div id='input_foods' style={{display: 'block'}}>
               <div style={recBoxStyle}>
                  <div style={{marginBottom: 30}}>Choose food(s):</div>
                  <AutoCompleteField value={this.state.food_one} set={this.setValue} id='food_one'/>
                  <AutoCompleteField value={this.state.food_two} id='food_two'/>
                  <AutoCompleteField value={this.state.food_three} id='food_three'/>
               </div>
               <div style={recBoxStyle}>
                  <div style={{marginBottom: 30}}>Recommendation(s) for selected food(s):</div>
                  <AutoCompleteField value={this.state.rec_one} id='rec_one'/>
                  <AutoCompleteField value={this.state.rec_two} id='rec_two'/>
                  <AutoCompleteField value={this.state.rec_three} id='rec_three'/>
               </div>
               <div id='submit' style={{marginTop: 20}}>
                  <Button
                     style={buttonStyles}
                     variant="contained"
                     color="primary"
                  >
                     Add recommendation(s)
                  </Button>
               </div>
            </div>

         </form>
      )
   }
}

export default AddRecommendations;

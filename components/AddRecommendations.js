import React, { Component } from 'react';
import AutoCompleteField from './SearchFoodField';
import Button from "@material-ui/core/Button";


const buttonStyles = {
   verticalAlign: 'bottom',
   marginLeft: 10,
};

class AddRecommendations extends Component {
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

   render() {
      return (
         <form>
            <AutoCompleteField />
            <Button
               style={buttonStyles}
               variant="contained"
               color="primary"
               onClick={this.updateResults}>
               ....
            </Button>
         </form>
      )
   }
}

export default AddRecommendations;

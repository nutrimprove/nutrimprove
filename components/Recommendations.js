import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import RecommendationsResults from "./RecommendationsResults";

const buttonStyles = {
   verticalAlign: 'bottom',
   marginLeft: 10,
};

class Recommendations extends Component {
   constructor(props) {
      super(props);
      this.state = {
         values: [],
      };
   }

   fetchFoods = (endpoint) => {
      console.log(JSON.stringify(endpoint));
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
      const {values} = this.state;
      return (
         <form>
            <Button
               style={buttonStyles}
               variant="contained"
               color="primary"
               onClick={this.updateResults}>
               Fetch all recommendations
            </Button>
            <RecommendationsResults values={values}/>
         </form>
      )
   }
}

export default Recommendations;

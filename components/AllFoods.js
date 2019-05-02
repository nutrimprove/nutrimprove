import {Component} from "react";
import ResultsTable from "./FoodFullResults";
import Button from '@material-ui/core/Button';

const buttonStyles = {
   verticalAlign: 'bottom',
   marginLeft: 10,
};

class AllFoods extends Component {
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
      await this.fetchFoods(`/api/v1/foods`);
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
               Fetch all foods
            </Button>
            <ResultsTable values={values}/>
         </form>
      )
   }
}

export default AllFoods;

import {Component} from "react";
import ResultsTable from "./FoodFullResults";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const textField = {
   width: 200,
   marginBottom: 0,
};

const buttonStyles = {
   verticalAlign: 'bottom',
   marginLeft: 10,
};

class FoodByName extends Component {
   constructor(props) {
      super(props);
      this.state = {
         foodName: '',
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

   updateName = (foodName) => {
      this.setState({foodName});
   };

   updateResults = async () => {
      const {foodName} = this.state;
      if (foodName !== '') {
         await this.fetchFoods(`/api/v1/food/name/${foodName}`);
      }
   };

   render() {
      const {foodName, values} = this.state;
      return (
         <form>
            <TextField
               id="foodName"
               label="Search food by name"
               type="search"
               value={foodName}
               style={textField}
               margin="normal"
               onChange={e => this.updateName(e.target.value)}
            />
            <Button
               style={buttonStyles}
               variant="contained"
               color="primary"
               onClick={this.updateResults}>
               Search
            </Button>
            <ResultsTable values={values}/>
         </form>
      )
   }
}

export default FoodByName;

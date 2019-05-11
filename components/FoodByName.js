import {Component} from "react";
import ResultsTable from "./FoodFullResults";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {fetchFoodByName} from "../connect/api";

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

   updateName = (foodName) => {
      this.setState({foodName});
   };

   updateResults = () => {
      const {foodName} = this.state;
      if (foodName !== '') {
         fetchFoodByName(foodName).then((values) => this.setState({values}));
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

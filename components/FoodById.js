import { Component } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFood } from '../connect/api';

const textField = {
  width: 200,
  marginBottom: 0,
};

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

class FoodById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodId: '',
      food: null,
    };
  }

  updateId = foodId => {
    this.setState({ foodId });
  };

  updateResults = () => {
    const { foodId } = this.state;
    if (foodId !== '') {
      fetchFood(foodId).then(({ food }) => this.setState({ food }));
    }
  };

  render() {
    const { foodId, food } = this.state;
    console.log(food);
    return (
      <form>
        <TextField
          id='foodId'
          label='Search food by Id'
          type='search'
          value={foodId}
          style={textField}
          margin='normal'
          onChange={e => this.updateId(e.target.value)}
        />
        <Button
          style={buttonStyles}
          variant='contained'
          color='primary'
          onClick={this.updateResults}
        >
          Search
        </Button>
        <ResultsTable values={food ? [food] : []} />
      </form>
    );
  }
}

export default FoodById;

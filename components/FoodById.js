import { Component } from 'react';
import ResultsTable from './FoodFullResults';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchFoodById } from '../connect/api';

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
      values: [],
    };
  }

  updateId = foodId => {
    this.setState({ foodId });
  };

  updateResults = () => {
    const { foodId } = this.state;
    if (foodId !== '') {
      fetchFoodById(foodId).then(values => this.setState({ values }));
    }
  };

  render() {
    const { foodId, values } = this.state;
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
        <ResultsTable values={values} />
      </form>
    );
  }
}

export default FoodById;

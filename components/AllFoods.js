import { Component } from 'react';
import ResultsTable from './FoodFullResults';
import Button from '@material-ui/core/Button';
import { fetchFoods } from '../connect/api';

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

  updateResults = () => {
    fetchFoods().then(values => this.setState({ values }));
  };

  render() {
    const { values } = this.state;
    return (
      <form>
        <Button
          style={buttonStyles}
          variant='contained'
          color='primary'
          onClick={this.updateResults}
        >
          Fetch all foods
        </Button>
        <ResultsTable values={values} />
      </form>
    );
  }
}

export default AllFoods;

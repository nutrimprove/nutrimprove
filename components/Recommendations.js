import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

class Recommendations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendations: [],
    };
  }

  updateResults = () => {
    fetchRecommendations().then(({ recommendations }) =>
      this.setState({ recommendations })
    );
  };

  render() {
    const { recommendations } = this.state;
    return (
      <form>
        <Button
          style={buttonStyles}
          variant='contained'
          color='primary'
          onClick={this.updateResults}
        >
          Fetch all recommendations
        </Button>
        <RecommendationsResults values={recommendations} />
      </form>
    );
  }
}

export default Recommendations;

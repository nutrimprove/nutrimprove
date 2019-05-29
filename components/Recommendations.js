import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';

const buttonStyles = {
  verticalAlign: 'bottom',
  marginLeft: 10,
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  const updateResults = () => {
    fetchRecommendations().then(values => setRecommendations(values));
  };

  return (
    <form>
      <Button
        style={buttonStyles}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Fetch all recommendations
      </Button>
      <RecommendationsResults values={recommendations} />
    </form>
  );
};

export default Recommendations;

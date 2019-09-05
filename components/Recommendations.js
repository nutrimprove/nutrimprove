import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';

const title = 'View Recommendations';
const subtitle = 'Fetch the list of recommendations you have provided';

const styles = {
  header: {
    marginBottom: '30px',
  },
  subtitle: {
    fontSize: '0.8em',
  },
  title: {
    fontSize: '1.4em',
  },
  fetchButton: {
    verticalAlign: 'bottom',
    marginLeft: 10,
  },
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  const updateResults = () => {
    fetchRecommendations('099').then(fetchedRecommendations =>
      setRecommendations(fetchedRecommendations)
    );
  };

  return (
    <form>
      <div id='header' style={styles.header}>
        <div id='title' style={styles.title}>
          {title}
        </div>
        <div id='subtitle' style={styles.subtitle}>
          {subtitle}
        </div>
      </div>
      <Button
        style={styles.fetchButton}
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

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ResultsTable from './ResultsTable';
import { fetchRecommendations } from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Fetch the list of recommendations you have provided',
};

const Recommendations = ({ userDetails }) => {
  const [recommendations, setRecommendations] = useState([]);

  const updateResults = () => {
    if (userDetails) {
      fetchRecommendations(userDetails.email).then(
        fetchedRecommendations =>
          setRecommendations(fetchedRecommendations)
      );
    } else {
      console.error('User details not found!', userDetails);
    }
  };

  const formattedRecommendations = () =>
    recommendations.map(recommendation => ({
      food: recommendation.food.name,
      recommendation: recommendation.recommendation.name,
      contributor: recommendation.contributor_id,
    }));

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <Button
        style={styles.fetchButton}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Fetch inserted recommendations
      </Button>
      <ResultsTable values={formattedRecommendations()} />
    </>
  );
};

Recommendations.propTypes = {
  userDetails: PropTypes.object,
};

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

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(
  mapStateToProps,
  null
)(Recommendations);

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';

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

  return (
    <>
      <SectionHeader title={title} subtitle={subtitle} />
      <Button
        style={styles.fetchButton}
        variant='contained'
        color='primary'
        onClick={updateResults}
      >
        Fetch all recommendations
      </Button>
      <RecommendationsResults values={recommendations} />
    </>
  );
};

Recommendations.propTypes = {
  userDetails: PropTypes.object,
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

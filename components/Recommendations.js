import React, { useState } from 'react';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import LoadingSpinner from './LoadingSpinner';
import PrimaryButton from './PrimaryButton';

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

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <PrimaryButton
        action={updateResults}
        text='Fetch inserted recommendations'
      >
        <LoadingSpinner context='fetchRecommendations' colour='white' />
      </PrimaryButton>
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

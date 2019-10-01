import React, { useState } from 'react';
import RecommendationsResults from './RecommendationsResults';
import { fetchRecommendations } from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import ButtonWithSpinner from './ButtonWithSpinner';

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
      <ButtonWithSpinner
        action={updateResults}
        context='fetchRecommendations'
      >
        {sectionHeader.title}
      </ButtonWithSpinner>
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

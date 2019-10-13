import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import { getRecommendations } from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import ButtonWithSpinner from './ButtonWithSpinner';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Fetch the list of recommendations you have provided',
};

const ViewRecommendations = ({ userDetails }) => {
  const [recommendations, setRecommendations] = useState();

  const updateResults = async () => {
    if (userDetails) {
      const recommendations = await getRecommendations(userDetails.email);
      setRecommendations(recommendations);
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
      <ButtonWithSpinner
        action={updateResults}
        context='getRecommendations'
      >
        {sectionHeader.title}
      </ButtonWithSpinner>
      {recommendations && (
        <ResultsTable
          values={formattedRecommendations()}
          title='Recommendations added by you'
        />
      )}
    </>
  );
};

ViewRecommendations.propTypes = {
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
)(ViewRecommendations);

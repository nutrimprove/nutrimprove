import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import {
  getAllRecommendations,
  getUserRecommendations,
} from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import ButtonWithSpinner from './ButtonWithSpinner';
import { isAdmin } from '../helpers/userUtils';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Fetch the list of recommendations you have provided',
};

const ViewRecommendationsPage = ({ userDetails }) => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  const loadUserRecommendations = async () => {
    if (userDetails) {
      const recommendations = await getUserRecommendations(
        userDetails.email
      );
      const count = recommendations ? recommendations.length : 0;
      setTitle(`Your recommendations (${count})`);
      setRecommendations(recommendations);
    } else {
      console.error('User details not found!', userDetails);
    }
  };

  const loadAllRecommendations = async () => {
    const recommendations = await getAllRecommendations();
    setTitle(`All recommendations (${recommendations.length})`);
    setRecommendations(recommendations);
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
        action={loadUserRecommendations}
        context='getUserRecommendations'
      >
        Your Recommendations
      </ButtonWithSpinner>
      {isAdmin(userDetails) && (
        <ButtonWithSpinner
          action={loadAllRecommendations}
          context='getAllRecommendations'
        >
          View All Recommendations
        </ButtonWithSpinner>
      )}
      {recommendations && (
        <ResultsTable values={formattedRecommendations()} title={title} />
      )}
    </>
  );
};

ViewRecommendationsPage.propTypes = {
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
)(ViewRecommendationsPage);

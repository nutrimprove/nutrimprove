import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import {
  getAllRecommendations,
  getRecommendationsByFood,
  getUserRecommendations,
} from '../connect/api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import ButtonWithSpinner from './ButtonWithSpinner';
import { isAdmin } from '../helpers/userUtils';
import SearchFood from './SearchFood';
import { Typography } from '@material-ui/core';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Search and display existing recommendations',
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

  const loadRecommendationsByFood = async food => {
    const recommendations = await getRecommendationsByFood(food.name);
    const count = recommendations ? recommendations.length : 0;
    setTitle(`Found ${count} recommendations with '${food.name}'`);
    setRecommendations(recommendations);
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
      <Typography>
        In this page you can view which recommendations have already been
        inserted into the database.
      </Typography>
      <Typography paragraph={true}>
        You can either retrieve all recommendations, list only your
        insertions or simply type a food name and a list of existing
        recommendations with that food will be displayed.
      </Typography>
      {isAdmin(userDetails) && (
        <ButtonWithSpinner
          action={loadAllRecommendations}
          context='getAllRecommendations'
        >
          View All Recommendations
        </ButtonWithSpinner>
      )}
      <ButtonWithSpinner
        action={loadUserRecommendations}
        context='getUserRecommendations'
      >
        Your Recommendations
      </ButtonWithSpinner>
      <SearchFood
        action={loadRecommendationsByFood}
        context='getRecommendationsByFood'
      />

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

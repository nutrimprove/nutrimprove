import React, { useState } from 'react';
import ResultsTable from '../ResultsTable';
import {
  getAllRecommendations,
  getRecommendationsByFood,
  getUserRecommendations,
} from '../../interfaces/api/recommendations';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from '../SectionHeader';
import ButtonWithSpinner from '../ButtonWithSpinner';
import { isAdmin } from '../../helpers/userUtils';
import SearchFoodSet from '../SearchFoodSet';
import { Typography } from '@material-ui/core';
import Filters from '../Filters';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Search and display existing recommendations',
};

const ViewRecommendationsPage = ({ classes, userDetails }) => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  const loadUserRecommendations = async () => {
    const recommendations = await getUserRecommendations(
      userDetails.email,
    );
    const count = recommendations ? recommendations.length : 0;
    setTitle(`Your recommendations (${count})`);
    setRecommendations(recommendations);
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
      rating: recommendation.rating,
      'Date Added': new Date(recommendation.timestamp).toLocaleDateString("en-GB")
    }));

  return (
    <>
      <SectionHeader content={sectionHeader}/>
      <Filters/>
      <Typography paragraph={true} variant='subtitle1'>
        Your points: {userDetails.points || 0}
      </Typography>
      <Typography paragraph={true} variant='subtitle2'>
        List only your recommendations or simply type a food name to list
        all existing recommendations with that food.
      </Typography>
      <div className={classes.buttons}>
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
      </div>
      <SearchFoodSet
        action={loadRecommendationsByFood}
        context='getRecommendationsByFood'
        naked={true}
      />
      {recommendations && <ResultsTable data={formattedRecommendations()} title={title}/>}
    </>
  );
};

ViewRecommendationsPage.propTypes = {
  classes: PropTypes.object,
  userDetails: PropTypes.object,
};

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(mapStateToProps, null)(ViewRecommendationsPage);

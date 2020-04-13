import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import {
  getAllRecommendations,
  getRecommendationsByFood,
  getUserRecommendations,
} from '../interfaces/api/recommendations';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SectionHeader from './SectionHeader';
import ButtonWithSpinner from './ButtonWithSpinner';
import { isAdmin } from '../helpers/userUtils';
import SearchFood from './SearchFood';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Search and display existing recommendations',
};

const ViewRecommendationsPage = ({ classes, userDetails }) => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();

  const loadUserRecommendations = async () => {
    const recommendations = await getUserRecommendations(
      userDetails.email
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
    recommendations.map(recommendation => {
      const contributorsCount = recommendation.contributors.length;
      const contributorIndex = recommendation.contributors.findIndex(
        ({ id }) => id === userDetails.email
      );
      let mainContributor =
        contributorIndex === 0 ? 'You' : recommendation.contributors[0].id;
      let otherContributors =
        contributorsCount > 1 ? `+ ${contributorsCount - 1}` : '';

      if (contributorIndex === -1) {
        mainContributor = recommendation.contributors[0].id;
        otherContributors =
          contributorsCount > 1 ? `+ ${contributorsCount - 1}` : '';
      } else if (contributorIndex === 0) {
        mainContributor = 'You';
        otherContributors =
          contributorsCount > 1 ? `+ ${contributorsCount - 1}` : '';
      } else {
        mainContributor = recommendation.contributors[0].id;
        otherContributors =
          contributorsCount > 2 ? `You + ${contributorsCount - 1}` : 'You';
      }

      return {
        food: recommendation.food.name,
        recommendation: recommendation.recommendation.name,
        'Main Contributor': mainContributor,
        'Other Contributors': otherContributors,
      };
    });

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <Typography paragraph={true} variant='subtitle1'>
        Your points: {userDetails.points || 0}
      </Typography>
      <Typography paragraph={true} variant='subtitle2'>
        List only your recommendations or simply type a food name to list
        all existing recommendations with that food.
      </Typography>
      <div>
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
        <div className={classes.searchBox}>
          <SearchFood
            action={loadRecommendationsByFood}
            context='getRecommendationsByFood'
          />
        </div>
      </div>
      {recommendations && (
        <ResultsTable values={formattedRecommendations()} title={title} />
      )}
    </>
  );
};

ViewRecommendationsPage.propTypes = {
  classes: PropTypes.object,
  userDetails: PropTypes.object,
};

const styles = {
  searchBox: {
    position: 'absolute',
    display: 'inline-block',
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
)(withStyles(styles)(ViewRecommendationsPage));

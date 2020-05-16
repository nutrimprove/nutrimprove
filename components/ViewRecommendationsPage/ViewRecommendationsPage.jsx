import React, { useState } from 'react';
import ResultsTable from '../ResultsTable';
import {
  getAllRecommendations,
  getRecommendation,
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
import { getFoodsFromRecommendation, parseNutrients } from '../../helpers/utils';
import CompareModal from '../CompareModal';

const sectionHeader = {
  title: 'View Recommendations',
  subtitle: 'Search and display existing recommendations',
};

const ViewRecommendationsPage = ({ classes, userDetails }) => {
  const [recommendations, setRecommendations] = useState();
  const [title, setTitle] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [compareOpen, setCompareOpen] = useState();

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

  const formattedRecommendations = () => {
    // Sort by date of recommendation (more recent first)
    const sortedRecs = recommendations.sort((a, b) => b.timestamp - a.timestamp);
    return sortedRecs.map(recommendation => ({
      id: recommendation._id,
      food: recommendation.food.name,
      recommendation: recommendation.recommendation.name,
      rating: recommendation.rating,
      'Date Added': new Date(recommendation.timestamp).toLocaleDateString('en-GB'),
    }));
  };

  const getFoodDetails = (food) => {
    const { foodName, proximates, vitamins, inorganics } = food;
    return {
      foodName,
      nutrients: [
        ...parseNutrients({ nutrients: proximates, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: vitamins, filterEmptyValues: false }),
        ...parseNutrients({ nutrients: inorganics, filterEmptyValues: false }),
      ],
    };
  };

  const handleRowClick = async ({ currentTarget }) => {
    setComparisonData(null);
    setCompareOpen(true);
    const recommendation = await getRecommendation(currentTarget.dataset.id);
    const foods = await getFoodsFromRecommendation(recommendation);
    const food = getFoodDetails(foods[0]);
    const recommendedFood = getFoodDetails(foods[1]);
    setComparisonData([food, recommendedFood]);
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

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
      {recommendations && <ResultsTable data={formattedRecommendations()} title={title} onRowClick={handleRowClick}/>}
      {compareOpen && <CompareModal dataSet={comparisonData} open={compareOpen} onClose={handleCloseModal}/>}
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

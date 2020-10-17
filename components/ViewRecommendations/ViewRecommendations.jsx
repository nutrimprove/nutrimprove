import CompareModal from 'components/CompareModal';
import LoadingPanel from 'components/LoadingPanel';
import RadioOptions from 'components/RadioOptions';
import ResultsTable from 'components/ResultsTable';
import SearchField from 'components/SearchField';
import { getFoodsFromRecommendation, parseFoodDetails } from 'helpers/utils';
import { getRecommendation } from 'interfaces/api/recommendations';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const formatRecommendations = recommendations => {
  // Sort by date of recommendation (more recent first)
  const sortedRecs = recommendations.sort((a, b) => b.timestamp - a.timestamp);
  return sortedRecs.map(recommendation => ({
    id: recommendation._id,
    food: recommendation.food.name,
    recommendation: recommendation.recommendation.name,
    'Date Added': recommendation.timestamp,
  }));
};

const hasFood = (foods, food) => !!foods.some(({ foodName }) => foodName === food.foodName);

const ViewRecommendations = ({ recommendations, title, classes }) => {
  const [list, setList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [recommendationRating, setRecommendationRating] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [filter, setFilter] = useState();
  const [foodNames, setFoodNames] = useState();
  const [columnFilter, setColumnFilter] = useState('All');
  const [filterTriggered, setFilterTriggered] = useState(false);

  const columnOptions = ['All', 'Foods', 'Recommendations'];

  const includeFoods = () => ['All', 'Foods'].includes(columnFilter);
  const includeRecommendations = () => ['All', 'Recommendations'].includes(columnFilter);

  useEffect(() => {
    if (!recommendations) return;
    const formattedRecommendations = formatRecommendations(recommendations);
    const foods = [];
    formattedRecommendations.forEach(rec => {
      const food = { foodName: rec.food };
      const recommendedFood = { foodName: rec.recommendation };
      if (!hasFood(foods, food)) {
        foods.push(food);
      }
      if (!hasFood(foods, recommendedFood)) {
        foods.push(recommendedFood);
      }
    });
    setFoodNames(foods);
    setList(formattedRecommendations);
    setFilteredList({ list: formattedRecommendations });
  }, [recommendations, columnFilter]);

  useEffect(() => {
    if (filter && filterTriggered) {
      filterByFood();
    }
  }, [columnFilter]);

  const getFoodDetails = food => parseFoodDetails({ food, filterEmptyValues: false });

  const handleRowClick = async ({ currentTarget }) => {
    setComparisonData(null);
    setCompareOpen(true);
    const recommendation = await getRecommendation(currentTarget.dataset.id);
    setRecommendationRating(recommendation.rating);
    const foods = await getFoodsFromRecommendation(recommendation);
    const food = getFoodDetails(foods[0]);
    const recommendedFood = getFoodDetails(foods[1]);
    setComparisonData([food, recommendedFood]);
  };

  const handleSelection = (event, item) => {
    if (item) {
      setFilter(item.foodName);
    } else {
      setFilter(null);
      setFilteredList({ list });
    }
    setFilterTriggered(false);
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

  const handleColumnFilterChange = e => {
    setColumnFilter(e.target.value);
  };

  const filterByFood = () => {
    const filteredRecommendations = list.filter(({ food, recommendation }) =>
      (includeFoods() && food === filter) || (includeRecommendations() && recommendation === filter));
    const title = `${filteredRecommendations.length} recommendations (out of ${list.length})`;
    setFilteredList({ title, list: filteredRecommendations });
    setFilterTriggered(true);
  };

  return (
    <>
      <div className={classes.filtersContainer}>
        <SearchField loading={!foodNames}
                     onSelection={handleSelection}
                     onButtonClick={filterByFood}
                     values={foodNames}
                     buttonDisabled={!filter}
                     buttonText='Filter'
                     className={classes.search}
        />
        <RadioOptions options={columnOptions} onChange={handleColumnFilterChange} initialValue={columnFilter}
                      inline={false} label='Show from:' className={classes.filters}/>
      </div>
      {!recommendations && <LoadingPanel/>}
      {filteredList && filteredList.list && <ResultsTable data={filteredList.list}
                                                          title={filteredList.title || title}
                                                          onRowClick={handleRowClick}
                                                          sortColumns={['food', 'recommendation', 'rating', 'date added']}
                                                          sortOnLoad='date added'
      />}
      {compareOpen &&
      <CompareModal dataSet={comparisonData} tableTitle={`Recommendation rating: ${recommendationRating}`}
                    open={compareOpen} onClose={handleCloseModal}/>}
    </>
  );
};

ViewRecommendations.propTypes = {
  title: PropTypes.string,
  recommendations: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

export default ViewRecommendations;

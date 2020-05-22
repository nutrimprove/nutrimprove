import React, { useEffect, useState } from 'react';
import ResultsTable from '../../ResultsTable';
import { getRecommendation } from '../../../interfaces/api/recommendations';
import PropTypes from 'prop-types';
import { getFoodsFromRecommendation, parseNutrients } from '../../../helpers/utils';
import CompareModal from '../../CompareModal';
import SearchField from '../../SearchField';

const formatRecommendations = recommendations => {
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

const ViewRecommendations = ({ recommendations, title }) => {
  const [list, setList] = useState();
  const [filteredList, setFilteredList] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [filter, setFilter] = useState();
  const [foodNames, setFoodNames] = useState();
  const [filteredTitle, setFilteredTitle] = useState();

  useEffect(() => {
    const formattedRecommendations = formatRecommendations(recommendations);
    const foods = [];
    formattedRecommendations.forEach(rec => {
      foods.push({ foodName: rec.food });
      foods.push({ foodName: rec.recommendation });
    });
    setList(formattedRecommendations);
    setFilteredList(formattedRecommendations);
    setFoodNames(foods);
  }, [recommendations]);

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

  const handleSelection = (event, item) => {
    if (item) {
      setFilter(item.foodName);
    } else {
      setFilter(null);
      setFilteredList(list);
      setFilteredTitle(null);
    }
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

  const filterByFood = () => {
    const filteredRecommendations = list.filter(({ food, recommendation }) => food === filter || recommendation === filter);
    setFilteredList(filteredRecommendations);
    setFilteredTitle(`${filteredRecommendations.length} recommendations (out of ${list.length})`);
  };

  return (
    <>
      <SearchField loading={!foodNames}
                   onSelection={handleSelection}
                   onButtonClick={filterByFood}
                   values={foodNames}
                   buttonDisabled={!filter}
                   buttonText='Filter'
      />
      {filteredList && <ResultsTable data={filteredList} title={filteredTitle || title} onRowClick={handleRowClick}/>}
      {compareOpen && <CompareModal dataSet={comparisonData} open={compareOpen} onClose={handleCloseModal}/>}
    </>
  );
};

ViewRecommendations.propTypes = {
  title: PropTypes.string,
  recommendations: PropTypes.array,
};

export default ViewRecommendations;

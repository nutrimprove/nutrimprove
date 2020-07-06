import ActionsPanel from 'components/ActionsPanel';
import ButtonWithSpinner from 'components/ButtonWithSpinner';
import CompareModal from 'components/CompareModal';
import Filters from 'components/Filters';
import FoodCardWithSearch from 'components/FoodCardWithSearch';
import addRecommendations from 'helpers/addRecommendations';
import { parseNutrients } from 'helpers/utils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const AddRecommendations = ({ classes }) => {
  const [food, setFood] = useState();
  const [recommendedFood, setRecommendedFood] = useState();
  const [hoveredItem, setHoveredItem] = useState();
  const [compareOpen, setCompareOpen] = useState();
  const [comparisonData, setComparisonData] = useState();
  const [status, setStatus] = useState({});

  useEffect(() => {
    setStatus({});
  }, [food, recommendedFood]);

  const setHoveredNutrient = event => {
    setHoveredItem(event.currentTarget.dataset.name);
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

  const compareFoods = () => {
    setCompareOpen(true);
    const foodDetails = getFoodDetails(food);
    const recommendedFoodDetails = getFoodDetails(recommendedFood);
    setComparisonData([foodDetails, recommendedFoodDetails]);
  };

  const addRecommendation = async () => {
    await addRecommendations({
      foods: [food],
      recommendations: [recommendedFood],
      onSuccess: message => {
        setStatus({ type: 'success', content: message });
      },
      onFailure: message => {
        setStatus({ type: 'fail', content: message });
      },
    });
  };

  const handleCloseModal = () => {
    setCompareOpen(false);
  };

  return (
    <>
      <Filters/>
      <div className={classes.cards}>
        <FoodCardWithSearch title='Food'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='food'
                            foodInfo={setFood}
                            className={classes.card}
        />
        <FoodCardWithSearch title='Recommendation'
                            onHover={setHoveredNutrient}
                            highlightItem={hoveredItem}
                            context='recommendation'
                            foodInfo={setRecommendedFood}
                            className={classes.card}
        />
      </div>
      <ActionsPanel food={food} recommendedFood={recommendedFood} status={status}>
        <ButtonWithSpinner className={classes.button} action={compareFoods}>Compare</ButtonWithSpinner>
        <ButtonWithSpinner className={classes.button}
                           action={addRecommendation}
                           disabled={status.type === 'fail'}
                           context='postRecommendations'
        >
          Add Recommendation
        </ButtonWithSpinner>
      </ActionsPanel>
      {compareOpen && (
        <CompareModal dataSet={comparisonData}
                      open={compareOpen}
                      onClose={handleCloseModal}
        />)}
    </>
  );
};

AddRecommendations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AddRecommendations;

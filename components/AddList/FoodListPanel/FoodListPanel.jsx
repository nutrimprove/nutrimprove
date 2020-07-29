import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import MainButton from 'components/MainButton';
import TabbedPanel from 'components/TabbedPanel';
import { sumNutrients } from 'helpers/utils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FoodList from './FoodList';

const FoodListPanel = ({ classes, className, title, foods = [], onListNameChange, onEditQuantity, onDelete, onSaveButtonClick }) => {
  const [nutritionalData, setNutritionalData] = useState();
  const quantity = foods.reduce((total, food) => total + +food.quantity, 0);

  useEffect(() => {
    setNutritionalData(sumNutrients(foods));
  }, [foods]);

  const getFoodCardTitle = () => {
    return foods.length === 1 ? foods[0].foodName : `${foods.length} ingredients`;
  };

  const tabs = [
    {
      label: 'Foods',
      content: <FoodList foods={foods} onDelete={onDelete} onEditQuantity={onEditQuantity}/>,
    },
    {
      label: 'Nutritional Information',
      content: <FoodCard food={nutritionalData}
                         title={getFoodCardTitle()}
                         subtitle={`Total weight: ${quantity}g`}
      />,
      disabled: !nutritionalData || nutritionalData.length === 0,
      container: false,
    },
  ];

  return (
    <div className={className}>
      <CardTitle title={title} editable={true} onTitleChange={onListNameChange}/>
      <TabbedPanel tabs={tabs} selectTab={!nutritionalData || nutritionalData.length === 0 ? 0 : null}/>
      <MainButton className={classes.saveButton} disabled={foods.length === 0} action={onSaveButtonClick}>
        Save and start new...
      </MainButton>
    </div>
  );
};

FoodListPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  foods: PropTypes.array.isRequired,
  onListNameChange: PropTypes.func,
  onEditQuantity: PropTypes.func,
  onDelete: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

export default FoodListPanel;

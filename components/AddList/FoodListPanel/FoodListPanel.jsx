import CardTitle from 'components/CardTitle';
import FoodCard from 'components/FoodCard';
import TabbedPanel from 'components/TabbedPanel';
import { NUTRIENT_GROUPS } from 'helpers/constants';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import FoodList from './FoodList';

const sumNutrients = (foods, groups) => {
  if (foods && foods.length > 0) {
    return foods.reduce((merged, food, index) => {
      const current = cloneDeep(food);
      if (index === 0) {
        groups.forEach(group => {
          Object.keys(current[group]).forEach(nutrient => {
            if (isNaN(current[group][nutrient].quantity)) {
              current[group][nutrient].quantity = 0;
            }
          });
        });
        return current;
      }

      groups.forEach(group => {
        Object.keys(merged[group]).forEach(nutrient => {
          const quantity = isNaN(current[group][nutrient].quantity) ? 0 : current[group][nutrient].quantity;
          merged[group][nutrient].quantity = +merged[group][nutrient].quantity + +quantity;
        });
      });
      return merged;
    }, {});
  }
};

const FoodListPanel = ({ className, title, foods, onListNameChange, onDelete }) => {
  const [nutritionalData, setNutritionalData] = useState();

  useEffect(() => {
    setNutritionalData(sumNutrients(foods, NUTRIENT_GROUPS));
  }, [foods]);

  const tabs = [
    {
      label: 'Foods',
      content: <FoodList foods={foods} onDelete={onDelete}/>,
    },
    {
      label: 'Nutritional Information',
      content: <FoodCard actions={false} food={nutritionalData} title={false}/>,
      disabled: !nutritionalData || nutritionalData.length === 0,
      container: false,
    },
  ];

  return (
    <div className={className}>
      <CardTitle title={title} editable={true} onTitleChange={onListNameChange}/>
      <TabbedPanel tabs={tabs}/>
    </div>
  );
};

FoodListPanel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  foods: PropTypes.array.isRequired,
  onListNameChange: PropTypes.func,
  onDelete: PropTypes.func,
};

export default FoodListPanel;

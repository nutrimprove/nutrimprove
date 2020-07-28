import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Filters from 'components/Filters';
import LoadingPanel from 'components/LoadingPanel';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import SearchField from 'components/SearchField';
import SaveToListModal from 'components/SearchFoodByNutrient/SaveToListModal';
import { NUTRIENT_GROUPS } from 'helpers/constants';
import { formatListToSave } from 'helpers/listsUtils';
import { parseFoodDetails } from 'helpers/utils';
import { getFoodByName, getFoodsByNutrient, getNutrients } from 'interfaces/api/foods';
import { addList } from 'interfaces/api/users';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchFoodByNutrient = () => {
  const categories = useSelector(({ globalState }) => globalState.categories);
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const [nutrient, setNutrient] = useState();
  const [nutrients, setNutrients] = useState([]);
  const [foods, setFoods] = useState();
  const [fullFoodsData, setFullFoodsData] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [selectedFoodDetails, setSelectedFoodDetails] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [saveToListOpen, setSaveToListOpen] = useState(false);
  const [resultsTitle, setResultsTitle] = useState();

  useEffect(() => {
    (async () => {
      const nutrientList = await getNutrients(NUTRIENT_GROUPS);
      setNutrients(nutrientList);
    })();
  }, []);

  const formatFoods = foods =>
    foods.map(food => {
      const foodObj = food[nutrient.group][nutrient.name];
      // In some rare cases and due to some rounding calculations (from the source data)
      // the quantity of a nutrient is higher than 100 for 100g of food (eg: Simple sugar and carbohydrates)
      // In these cases we are setting 100 as the value
      const quantity = nutrient.label === 'Carbohydrate' && foodObj.quantity > 100 ? 100 : foodObj.quantity;
      return {
        name: food.foodName,
        [nutrient.label]: `${quantity} ${foodObj.unit}`,
        group: food.group,
      };
    });

  const getFoods = async () => {
    const nutrientKey = `${nutrient.group}.${nutrient.name}`;
    const foods = await getFoodsByNutrient({ nutrient: nutrientKey, filters: categories.selectedGroups });
    setResultsTitle(`${nutrient.label} per 100g of food`);
    setFoods(formatFoods(foods));
    setFullFoodsData(foods);
  };

  const handleRowClick = async ({ currentTarget }) => {
    const foodName = currentTarget.firstChild.innerText;
    if (foodName === selectedFood) {
      setDetailsOpen(true);
      return;
    }
    setSelectedFood(foodName);
    setSelectedFoodDetails(null);
    setDetailsOpen(true);
    const food = await getFoodByName(foodName);
    if (food) {
      const nutrients = parseFoodDetails({ food }).nutrients;
      setSelectedFoodDetails(nutrients);
    }
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
    setSaveToListOpen(false);
  };

  const handleNutrientSelection = (event, value) => {
    setNutrient(value);
  };

  const handleSaveListIconClick = () => {
    setSaveToListOpen(true);
  };

  const handleSaveToList = ({ listName, quantity }) => {
    const foodsToSave = fullFoodsData.slice(0, quantity);
    const foodsToSaveWithQuantity = foodsToSave.map(food => ({ ...food, quantity: 100 }));
    const list = { name: listName, foods: foodsToSaveWithQuantity };
    addList(user, formatListToSave(list));
    setSaveToListOpen(false);
  };

  return (
    <>
      <Filters/>
      <SearchField loading={nutrients.length === 0}
                   onSelection={handleNutrientSelection}
                   onButtonClick={getFoods}
                   optionsContext='getNutrients'
                   buttonContext='getFoodsByNutrient'
                   values={nutrients}
                   buttonDisabled={!nutrient}
                   label='Choose nutrient'
                   labelProp='label'
                   noMatchText='No nutrient matched!!'
                   groupBy={(option) => option.group}
                   strict={false}
      />
      {foods && <ResultsTable
        data={foods}
        title={resultsTitle}
        onRowClick={handleRowClick}
        sortColumns={[0, 1, 2]}
        titleIcon={<PlaylistAddIcon htmlColor='#3f51b5' onClick={handleSaveListIconClick}/>}
      />}
      {detailsOpen && (
        <ModalPanel
          open={detailsOpen}
          onClose={handleCloseModal}
          title={selectedFood}
          subtitle='Nutritional information per 100g of food'
        >
          {selectedFoodDetails ? <ResultsTable data={selectedFoodDetails} scrollable sortColumns={['nutrient']}/> :
            <LoadingPanel/>}
        </ModalPanel>
      )}
      {saveToListOpen &&
      <SaveToListModal open={saveToListOpen} nutrientName={nutrient.label} onSubmit={handleSaveToList}
                       onClose={handleCloseModal}/>}
    </>
  );
};

export default SearchFoodByNutrient;

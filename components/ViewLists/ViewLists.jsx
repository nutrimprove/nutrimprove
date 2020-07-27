import { Link, Typography } from '@material-ui/core';
import DeleteButton from 'components/DeleteButton';
import LoadingPanel from 'components/LoadingPanel';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import { listsWithFullFoodDetails } from 'helpers/listsUtils';
import { parseFoodDetails, sumNutrients } from 'helpers/utils';
import { deleteList, getUser } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewLists = ({ classes }) => {
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const [lists, setLists] = useState();
  const [listDetailsOpen, setListDetailsOpen] = useState(false);
  const [foodDetailsOpen, setFoodDetailsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const [selectedFood, setSelectedFood] = useState();

  useEffect(() => {
    (async () => {
      if (user) {
        const userDetails = await getUser(user);
        if (userDetails && userDetails.lists) {
          const fullLists = await listsWithFullFoodDetails(userDetails.lists);
          setLists(fullLists);
        } else {
          setLists([]);
        }
      }
    })();
  }, [user]);

  const getTotalWeight = foods => foods.reduce((quantity, currentFood) => quantity + currentFood.quantity, 0);

  const listsData = () => {
    return lists.filter(({ id }) => id !== -1).map(({ id, name, foods, created }) => {
      const quantity = getTotalWeight(foods);
      return { id, name, Foods: foods.length, 'Total Weight': `${quantity}g`, 'Date Created': created };
    });
  };

  const onListRowClick = ({ currentTarget }) => {
    const { name, foods, id } = lists.find(({ id }) => id.toString() === currentTarget.dataset.id);
    const formattedList = {
      id,
      name,
      foods: foods.map(food => ({ id: food.foodCode, name: food.foodName, quantity: `${food.quantity}g` })),
      totalWeight: `${getTotalWeight(foods)}g`,
    };
    setSelectedList(formattedList);
    setListDetailsOpen(true);
  };

  const handleCloseListDetails = () => {
    setListDetailsOpen(false);
  };

  const handleCloseFoodDetails = () => {
    setFoodDetailsOpen(false);
  };

  const onDeleteList = () => {
    deleteList(user, selectedList.id);
    setLists(lists.filter(food => food.id !== selectedList.id));
    setListDetailsOpen(false);
  };

  const listsResultsTitle = () => {
    const quantity = listsData().length;
    return quantity === 0
      ? 'You have no lists created!'
      : `You currently have ${quantity} ${quantity === 1 ? 'saved list' : 'saved lists'}!`;
  };

  const Footer = () => (
    <DeleteButton buttonText='Delete List'
                  icon={true}
                  buttonConfirmationText='Confirm Deletion?'
                  onConfirmation={onDeleteList}
    />
  );

  const ListsResultsTable = () => {
    if (!lists) return <LoadingPanel/>;

    return listsData().length === 0
      ? <Typography>No lists. You can add a new list <Link href='/lists/add'>here</Link></Typography>
      : <ResultsTable className={classes.table}
                      onRowClick={onListRowClick}
                      title={listsResultsTitle()}
                      sortColumns={['name', 'foods', 'total weight', 'date created']}
                      data={listsData()}
      />;
  };

  const onFoodClick = ({ currentTarget }) => {
    const fullList = lists.find(list => list.id === selectedList.id);
    const food = fullList.foods.find(food => food.foodCode === currentTarget.dataset.id);
    const foodWithUpdatedNutrientQuantities = parseFoodDetails({
      food: sumNutrients([food]),
      filterEmptyValues: false,
    });
    foodWithUpdatedNutrientQuantities.quantity = food.quantity;
    setSelectedFood(foodWithUpdatedNutrientQuantities);
    setFoodDetailsOpen(true);
  };

  return (
    <>
      <ListsResultsTable/>
      {listDetailsOpen && (
        <ModalPanel open={listDetailsOpen}
                    onClose={handleCloseListDetails}
                    title={selectedList.name}
                    subtitle={`Total weight: ${selectedList.totalWeight} - ${selectedList.foods.length} foods`}
                    footer={<Footer/>}
                    style={selectedList.foods.length <= 3 ? classes.shortHeight : null}
        >
          {selectedList && (
            <ResultsTable
              data={selectedList.foods}
              sortColumns={[0, 1]}
              onRowClick={onFoodClick}
            />
          )}
        </ModalPanel>)}
      {foodDetailsOpen && (
        <ModalPanel open={foodDetailsOpen}
                    onClose={handleCloseFoodDetails}
                    title={selectedFood.foodName}
                    subtitle={`Nutritional values (${selectedFood.quantity}g)`}
        >
          {selectedFood
            ? <ResultsTable data={selectedFood.nutrients} scrollable={true} sortColumns={[0, 1]}/>
            : <LoadingPanel/>
          }
        </ModalPanel>)}
    </>
  );
};

ViewLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ViewLists;

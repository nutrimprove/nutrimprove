import { Link, Typography } from '@material-ui/core';
import DeleteButton from 'components/DeleteButton';
import LoadingPanel from 'components/LoadingPanel';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import { listsWithFullFoodDetails } from 'helpers/listsUtils';
import { deleteList, getUser } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ViewLists = ({ classes }) => {
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const [lists, setLists] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();

  useEffect(() => {
    (async () => {
      if (user) {
        const userDetails = await getUser(user);
        if (userDetails && userDetails.lists) {
          setLists(await listsWithFullFoodDetails(userDetails.lists));
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
      foods: foods.map(food => ({ name: food.foodName, quantity: `${food.quantity}g` })),
      totalWeight: `${getTotalWeight(foods)}g`,
    };
    setSelectedList(formattedList);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const onDeleteList = () => {
    deleteList(user, selectedList.id);
    setLists(lists.filter(food => food.id !== selectedList.id));
    setDetailsOpen(false);
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
                      sortColumns={['name', 'foods', 'totalweight', 'datecreated']}
                      data={listsData()}
      />;
  };

  const onFoodClick = ({ currentTarget }) => {
    console.log(`=== ViewLists.jsx #64 === ( currentTarget ) =======>`, currentTarget);
  };

  return (
    <>
      <ListsResultsTable/>
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseDetails}
                    title={selectedList.name}
                    subtitle={`Total weight: ${selectedList.totalWeight} - ${selectedList.foods.length} foods`}
                    footer={<Footer/>}
                    style={selectedList.foods.length <= 3 ? classes.shortHeight : null}
        >
          {selectedList && (
            <ResultsTable
              data={selectedList.foods}
              sortColumns={['foods']}
              onRowClick={onFoodClick}
            />
          )}

        </ModalPanel>)}
    </>
  );
};

ViewLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ViewLists;

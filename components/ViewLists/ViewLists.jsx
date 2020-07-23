import { Link, Typography } from '@material-ui/core';
import DeleteButton from 'components/DeleteButton';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import { deleteList } from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListAction } from 'store/global/actions';

const ViewLists = ({ classes }) => {
  const lists = useSelector(({ globalState }) => globalState.lists);
  const user = useSelector(({ globalState }) => globalState.userDetails.email);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();
  const dispatch = useDispatch();
  const deleteListFromState = useCallback(listId => dispatch(deleteListAction(listId)), []);

  const getTotalWeight = foods => foods.reduce((quantity, currentFood) => quantity + currentFood.quantity, 0);

  const listsData = () => lists.filter(({ id }) => id !== -1).map(({ id, name, foods, created }) => {
    const quantity = getTotalWeight(foods);
    return { id, name, Foods: foods.length, 'Total Weight': `${quantity}g`, 'Date Created': created };
  });

  const onRowClick = ({ currentTarget }) => {
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
    setDetailsOpen(false);
    deleteListFromState(selectedList.id);
  };

  const listsResultsTitle = () => {
    const quantity = listsData().length;
    return quantity === 0
      ? 'You have no lists created!'
      : `You currently have ${quantity} ${quantity === 1 ? 'list' : 'lists'}!`;
  };

  const Footer = () => (
    <DeleteButton buttonText='Delete List'
                  icon={true}
                  buttonConfirmationText='Confirm Deletion?'
                  onConfirmation={onDeleteList}
    />
  );

  return (
    <>
      {lists.length === 0
        ? <Typography>No lists. You can add a new list <Link href='/lists/add'>here</Link></Typography>
        : <ResultsTable className={classes.table}
                        onRowClick={onRowClick}
                        title={listsResultsTitle()}
                        sortColumns={['name', 'foods', 'totalweight', 'datecreated']}
                        data={listsData()}
        />
      }
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseDetails}
                    title={selectedList.name}
                    subtitle={`Total weight: ${selectedList.totalWeight} - ${selectedList.foods.length}`}
                    footer={<Footer/>}
                    style={selectedList.foods.length <= 3 ? classes.shortHeight : null}
        >
          {selectedList && (
            <ResultsTable
              data={selectedList.foods}
              sortColumns={['foods']}
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

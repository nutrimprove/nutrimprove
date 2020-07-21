import { Link, Typography } from '@material-ui/core';
import LoadingPanel from 'components/LoadingPanel';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ViewLists = ({ classes }) => {
  const lists = useSelector(({ globalState }) => globalState.lists);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState();

  const getTotalWeight = foods => foods.reduce((quantity, currentFood) => quantity + currentFood.quantity, 0);

  const listsData = () => lists.filter(({ id }) => id !== -1).map(({ id, name, foods, created }) => {
    const quantity = getTotalWeight(foods);
    const foodName = id !== -1 ? name : `${name} *`;
    return { id, Name: foodName, Foods: foods.length, 'Total Weight': `${quantity}g`, 'Date Created': created };
  });

  const onRowClick = ({ currentTarget }) => {
    const { name, foods } = lists.find(({ id }) => id.toString() === currentTarget.dataset.id);
    const formattedList = {
      name: name,
      foods: foods.map(food => ({ name: food.foodName, quantity: `${food.quantity}g` })),
      totalWeight: `${getTotalWeight(foods)}g`,
    };
    setSelectedList(formattedList);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      {lists.length === 0
        ? <Typography>No lists. You can add a new list <Link href='/lists/add'>here</Link></Typography>
        : <ResultsTable className={classes.table} onRowClick={onRowClick}
                        sortColumns={['name', 'foods', 'totalweight', 'datecreated']} data={listsData()}/>
      }
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseDetails}
                    title={selectedList.name}
        >
          {selectedList
            ? <ResultsTable title={`Total weight: ${selectedList.totalWeight}`} data={selectedList.foods}
                            sortColumns={['foods']}/>
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

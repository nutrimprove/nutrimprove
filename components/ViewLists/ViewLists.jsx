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

  const formattedLists = () => lists.filter(({ id }) => id !== -1).map(({ id, name, foods }) => {
    const quantity = foods.reduce((quantity, currentFood) => quantity + currentFood.quantity, 0);
    const foodName = id !== -1 ? name : `${name} *`;
    return { id, name: foodName, foods: foods.length, totalWeight: `${quantity}g` };
  });

  const onRowClick = ({ currentTarget }) => {
    const selected = lists.find(({ id }) => id.toString() === currentTarget.dataset.id);
    setSelectedList(selected);
    setDetailsOpen(true);
  };

  const formattedSelectedList = () => {
    return {
      name: selectedList.name,
      foods: selectedList.foods.map(food => ({name: food.foodName, quantity: food.quantity})),
    }
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      {lists.length === 0
        ? <Typography>No lists. You can add a new list <Link href='/lists/add'>here</Link></Typography>
        : <ResultsTable className={classes.table} onRowClick={onRowClick}
                        sortColumns={['name', 'foods']} data={formattedLists()}/>
      }
      {detailsOpen && (
        <ModalPanel open={detailsOpen}
                    onClose={handleCloseDetails}
                    title={selectedList.name}
        >
          {selectedList
            ? <ResultsTable data={formattedSelectedList().foods} scrollable={true} sortColumns={['foods']}/>
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

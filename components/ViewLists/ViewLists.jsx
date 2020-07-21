import { Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ViewLists = ({ classes }) => {
  const lists = useSelector(({ globalState }) => globalState.lists);

  const showList = ({currentTarget}) => {
    console.log(`=== ViewLists.jsx #10 === ( event ) =======>`, currentTarget.dataset.key);
  };

  return (
    <>
      {lists.length > 0 && lists.map(list => (
        <Typography key={list.id} data-key={list.id} onClick={showList}>
          {list.id !== -1 ? list.name : `${list.name} *`}
        </Typography>
      ))}
      {lists.length === 0 && <Typography>No lists. You can add a new list <Link href='/lists/add'>here</Link></Typography>}
    </>
  );
};

ViewLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ViewLists;

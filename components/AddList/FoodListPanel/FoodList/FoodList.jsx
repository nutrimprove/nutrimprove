import { List, ListItem, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditableText from 'components/EditableText';
import PropTypes from 'prop-types';
import React from 'react';

const FoodList = ({ classes, foods, onDelete }) => {
  const setHoverColor = ({ currentTarget }) => {
    currentTarget.style.color = 'darkred';
  };

  const setNormalColor = ({ currentTarget }) => {
    currentTarget.style.color = 'grey';
  };

  return (
    <>
      <Table size='small' className={classes.table}>
        {foods && foods.map(food => (
          <TableRow key={food.foodCode} className={classes.food}>
            <TableCell className={classes.nameCell}>
              <Typography variant='body2' noWrap title={food.foodName}>{food.foodName}</Typography>
            </TableCell>
            <TableCell align='right'>
              <EditableText>100g</EditableText>
            </TableCell>
            <TableCell align='right'>
              <DeleteIcon onClick={onDelete}
                          style={{ color: 'grey', cursor: 'pointer' }}
                          onMouseOver={setHoverColor}
                          onMouseLeave={setNormalColor}
                          titleAccess='Delete'
                          data-key={food.foodCode}
              />
            </TableCell>
          </TableRow>
        ))}
        {!foods || foods.length === 0 && (
          <ListItem>
            <Typography variant='body2' className={classes.empty} title='Empty list'>Empty</Typography>
          </ListItem>
        )}
      </Table>
      <div className={classes.foodsFooter}>
        <Typography>Add foods to list from left side panel</Typography>
      </div>
    </>
  );
};

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
  foods: PropTypes.array,
  onDelete: PropTypes.func,
};

export default FoodList;

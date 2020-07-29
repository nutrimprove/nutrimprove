import { Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import EditableText from 'components/EditableText';
import RemoveIcon from 'components/RemoveIcon';
import PropTypes from 'prop-types';
import React from 'react';

const FoodList = ({ classes, foods, onEditQuantity, onDelete }) => (
  <>
    <Table size='small' className={classes.table}>
      <TableBody>
        {foods && foods.map(food => (
          <TableRow key={food.foodCode} className={classes.food}>
            <TableCell>
              <Typography variant='body2' noWrap title={food.foodName}>{food.foodName}</Typography>
            </TableCell>
            <TableCell align='right' className={classes.quantity}>
              <EditableText size='small' value={food.quantity} min={0.1} max={9999} type='number'
                            datakey={food.foodCode} onChange={onEditQuantity}>
                g
              </EditableText>
            </TableCell>
            <TableCell align='right' className={classes.deleteIcon}>
              <RemoveIcon onClick={onDelete} dataKey={food.foodCode}/>
            </TableCell>
          </TableRow>
        ))}
        {!foods || foods.length === 0 && (
          <TableRow>
            <TableCell>
              <Typography variant='body2' className={classes.empty} title='Empty list'>Empty</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <div className={classes.foodsFooter}>
      <Typography>Add foods to list from left side panel</Typography>
    </div>
  </>
);

FoodList.propTypes = {
  classes: PropTypes.object.isRequired,
  foods: PropTypes.array,
  onDelete: PropTypes.func,
  onEditQuantity: PropTypes.func,
};

export default FoodList;

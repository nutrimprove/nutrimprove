import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableBody from '@material-ui/core/TableBody/index';
import { withStyles } from '@material-ui/core/styles/index';

const formatCellValue = cell => {
  if (typeof cell === 'boolean') {
    return cell.toString();
  }
  if (typeof cell === 'object' && Array.isArray(cell)) {
    return cell.map(value => value.id).join(', ');
  }
  return cell;
};

const ResultsTableBody = ({ values, classes }) => (
  <TableBody>
    {values.map((row, index) => (
      <TableRow
        key={index}
        hover
        className={classes.root}
      >
        {Object.values(row).map((value, vIndex) => (
          <TableCell key={vIndex} className={classes.cell}>
            {formatCellValue(value)}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

ResultsTableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
};

const styles = {
  cell: {
    padding: '7px 20px 7px 10px',
    minWidth: 80,
  },
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f8f8f8',
    },
    '&:$hover:hover': {
      backgroundColor: '#E9EEFF',
      cursor: 'pointer',
    },
  },
};

export default withStyles(styles)(ResultsTableBody);

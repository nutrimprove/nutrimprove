import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableBody from '@material-ui/core/TableBody/index';
import { withStyles } from '@material-ui/core/styles/index';

const ResultsTableBody = ({ values, classes }) => (
  <TableBody>
    {values.map((row, index) => (
      <TableRow key={index}>
        {Object.values(row).map((value, vIndex) => (
          <TableCell key={vIndex} className={classes.cell}>
            {typeof value === 'boolean' ? value.toString() : value}
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
    padding: 10,
  },
};

export default withStyles(styles)(ResultsTableBody);

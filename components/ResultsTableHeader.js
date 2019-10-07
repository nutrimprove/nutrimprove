import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableCell from '@material-ui/core/TableCell/index';
import withStyles from '@material-ui/core/styles/withStyles';

const ResultsTableHeader = ({ classes, columnNames }) => {
  return (
    <TableHead className={classes.head}>
      <TableRow>
        {columnNames.map((name, index) => (
          <TableCell key={index} className={classes.cell}>
            {name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

ResultsTableHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  columnNames: PropTypes.array,
};

const styles = {
  head: {
    backgroundColor: '#E7E7E7',
    fontSize: '1em',
  },
};

export default withStyles(styles)(ResultsTableHeader);
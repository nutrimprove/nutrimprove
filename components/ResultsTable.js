import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import TableCell from '@material-ui/core/TableCell/index';
import Paper from '@material-ui/core/Paper/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    minWidth: 700,
  },
  table: {
    minWidth: 700,
  },
  cell: {
    padding: 10,
  },
  foodName: {
    minWidth: 100,
    padding: 10,
  },
});

const ResultsTable = ({ classes, values, columnNames }) => {
  if (values && values.length > 0) {
    const columns = columnNames || Object.keys(values[0]);
    return (
      <div className='results'>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((name, index) => (
                  <TableCell key={index} className={classes.cell}>
                    {name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {values.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, vIndex) => (
                    <TableCell key={vIndex} className={classes.cell}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  } else {
    return <div className='results' />;
  }
};

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
};

export default withStyles(styles)(ResultsTable);

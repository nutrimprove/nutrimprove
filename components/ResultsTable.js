import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/index';
import Table from '@material-ui/core/Table/index';
import { withStyles } from '@material-ui/core/styles/index';
import ResultsTableHeader from './ResultsTableHeader';
import ResultsTableBody from './ResultsTableBody';

const ResultsTable = ({ classes, values, columnNames }) => (
  <div>
    <Paper className={classes.root}>
      {values.length > 0 ? (
        <Table className={classes.table}>
          <ResultsTableHeader
            columnNames={columnNames || Object.keys(values[0])}
          />
          <ResultsTableBody values={values} />
        </Table>
      ) : (
        <div className={classes.noresults}>No results!!</div>
      )}
    </Paper>
  </div>
);

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  values: PropTypes.array.isRequired,
  columnNames: PropTypes.array,
};

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
  noresults: {
    padding: 15,
  },
});

export default withStyles(styles)(ResultsTable);

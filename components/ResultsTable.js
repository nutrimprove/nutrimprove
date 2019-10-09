import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper/index';
import Table from '@material-ui/core/Table/index';
import { withStyles } from '@material-ui/core/styles/index';
import ResultsTableHeader from './ResultsTableHeader';
import ResultsTableBody from './ResultsTableBody';

const ResultsTable = ({ classes, values, columnNames, title }) => (
  <div>
    <Paper className={classes.root}>
      <div className={classes.resultsTitle}>{title}</div>
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
  title: PropTypes.string,
};

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    width: 'fit-content',
  },
  table: {
    width: 'fit-content',
  },
  noresults: {
    padding: 15,
  },
  resultsTitle: {
    padding: 10,
    fontWeight: 'bold',
    display: 'flex',
    fontFamily: 'sans-serif, arial',
    lineHeight: '40px',
    fontSize: '1em',
    justifyContent: 'center',
  },
});

export default withStyles(styles)(ResultsTable);

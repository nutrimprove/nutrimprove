import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';

const ResultsTable = ({ classes, data, onRowClick, title }) => {
  const columns = Object.keys(data[0]);

  return (
    <>
      {title && <Typography variant='body1' align='center' className={classes.title}>
        {title}
      </Typography>}
        <Paper className={classes.root}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell className={classes.tableHeader} key={`${column}-${index}`}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  hover={!!onRowClick}
                  className={clsx(classes.row, onRowClick ? classes.clickable : null)}
                  tabIndex={-1}
                  key={uniqueId()}
                  onClick={onRowClick}
                >
                  {columns.map(column => (
                    <TableCell key={uniqueId()}>
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
    </>
  );
};

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  onRowClick: PropTypes.func,
};

const styles = {
  root: {
    width: '100%',
  },
  tableHeader: {
    backgroundColor: '#3F51B5',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    '&:first-child': {
      borderTopLeftRadius: 9,
    },
    '&:last-child': {
      borderTopRightRadius: 9,
    },
  },
  row: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f8f8f8',
    },
  },
  clickable: {
    cursor: 'pointer',
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
};

export default withStyles(styles)(ResultsTable);

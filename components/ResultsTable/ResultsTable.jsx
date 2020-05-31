import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { uniqueId } from 'lodash/util';
import PropTypes from 'prop-types';
import React from 'react';

const ResultsTable = ({ classes, data, onRowClick, title, inModal = true }) => {
  let columns;

  if (data && data.length > 0) {
    columns = Object.keys(data[0]).filter(key => key !== 'id');
  }

  return (
    <div className={clsx(classes.table, inModal ? classes.modal : null)}>
      {title && <Typography variant='body1' align='center' className={classes.title}>
        {title}
      </Typography>}
      {columns && <Paper className={classes.results}>
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
                data-id={row.id}
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
      </Paper>}
    </div>
  );
};

ResultsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  title: PropTypes.string,
  inModal: PropTypes.bool,
  onRowClick: PropTypes.func,
};

export default ResultsTable;

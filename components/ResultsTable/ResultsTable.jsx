import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const ResultsTable = ({ classes, data, onRowClick, title, scrollable, sortOnLoad, sortColumns = [] }) => {
  const [order, setOrder] = useState({ column: null, order: null });
  const [tableData, setTableData] = useState([]);

  let columns;
  if (data && data.length > 0) {
    columns = Object.keys(data[0]).filter(key => key !== 'id').map(key => key);
  }

  let columnsToSort = [...sortColumns];
  if (sortColumns.every(column => typeof column === 'number')) {
    columnsToSort = sortColumns.map(column => columns[column].toLowerCase());
  }

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  useEffect(() => {
    handleSort(sortOnLoad);
  }, []);

  const toggleOrder = order => order.toLowerCase() === 'asc' ? 'desc' : 'asc';

  const sort = column => column ? columnsToSort.includes(column.toLowerCase()) : column;

  const handleSort = column => {
    if (!sort(column) || !data || data.length === 0) return;

    const sortObject = { column };
    order.column === column
      ? sortObject.order = toggleOrder(order.order)
      : sortObject.order = 'asc';
    setOrder(sortObject);

    const sortBy = Object.keys(data[0]).find(key => key.toLowerCase() === column.toLowerCase());
    const sortedData = orderBy(data, [sortBy], [sortObject.order]);
    setTableData(sortedData);
  };

  return (
    <div className={clsx(classes.table, scrollable ? classes.scrollable : null)}>
      {title && <Typography variant='body1' align='center' className={classes.title}>
        {title}
      </Typography>}
      {columns && <Paper className={classes.results}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell className={clsx(classes.tableHeader, sort(column) ? classes.pointer : null)}
                             key={`${column}-${index}`}
                             onClick={sort(column) ? () => handleSort(column) : null}
                  >
                    {column}
                    <span className={classes.sortIcon}>
                      {sort(column) && order.column === column.toLowerCase() && (order.order === 'asc'
                          ? <ArrowDropUpIcon/>
                          : <ArrowDropDownIcon/>
                      )}
                    </span>

                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                hover={!!onRowClick}
                className={clsx(classes.row, onRowClick ? classes.clickable : null)}
                tabIndex={-1}
                key={`${row}-${index}`}
                onClick={onRowClick}
                data-id={row.id}
              >
                {columns.map((column) => (
                  <TableCell key={`${row}-${column}`}>
                    {column.toLowerCase().includes('date') ? new Date(row[column]).toLocaleDateString() : row[column]}
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
  scrollable: PropTypes.bool,
  sortOnLoad: PropTypes.string,
  sortColumns: PropTypes.array,
  onRowClick: PropTypes.func,
};

export default ResultsTable;

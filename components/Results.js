import ResultsTable from './ResultsTable';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const Results = ({ list, title, onRowClick, classes }) => (
  <>
    {title && (
      <div className={classes.title}>
        {title}
      </div>
    )}
    <div className={classes.table}>
      <ResultsTable values={list} onRowClick={onRowClick}/>
    </div>
  </>
);

Results.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

const styles = {
  search: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderRadius: 7,
    borderColor: 'lightgray',
    padding: '10px 10px 10px 20px',
  },
  title: {
    display: 'block',
    marginTop: 30,
    fontFamily: 'sans-serif, arial',
    fontSize: '1em',
  },
  table: {
    marginRight: 30,
    marginTop: 20,
    maxWidth: 1000,
  },
  term: {
    fontWeight: 'bold',
  },
  button: {
    margin: 10,
  },
};

export default withStyles(styles)(Results);
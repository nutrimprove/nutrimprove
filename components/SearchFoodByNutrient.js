import React, { useState } from 'react';
import ResultsTable from './ResultsTable';
import { getNutritionData } from '../interfaces/api/nutrition';
import SectionHeader from './SectionHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SearchFood from './SearchFood';
import { EDAMAM_DB } from '../helpers/constants';
import SearchFilters from './SearchFilters';
import { connect } from 'react-redux';

const SearchFoodByNutrient = ({ classes }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [foodData, setFoodData] = useState();
  const [secondColumnData, setSecondColumnData] = useState();


  return (
    <>
      <div className={classes.tables}>
        {foodData && (
          <>
            <div className={classes.title}>
              Nutritional values per 100g of &apos;
              <span className={classes.term}>{searchTerm}&apos;</span>
            </div>
            <div className={classes.table}>
              <ResultsTable values={foodData}/>
            </div>
          </>
        )}
        {secondColumnData && (
          <div className={classes.table}>
            <ResultsTable values={secondColumnData}/>
          </div>
        )}
      </div>
    </>
  );
};

SearchFoodByNutrient.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = states => {
  return {
    categories: states.globalState.categories,
  };
};

const styles = {
  search: {
    display: 'inline-flex',
  },
  button: {
    marginLeft: 10,
  },
  tablesContainer: {
    display: 'block',
  },
  table: {
    display: 'inline-flex',
    marginRight: 30,
  },
  title: {
    display: 'block',
    marginTop: 30,
    fontFamily: 'sans-serif, arial',
    fontSize: '1em',
  },
  term: {
    fontWeight: 'bold',
  },
};

export default connect(mapStateToProps)(withStyles(styles)(SearchFoodByNutrient));

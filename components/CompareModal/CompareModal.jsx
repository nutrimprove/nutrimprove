import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from '../ResultsTable';
import ModalPanel from '../ModalPanel';

const CompareModal = ({ dataSet, title, subtitle, open, onClose, classes }) => {
  const mergedData = [];

  // Merge both sets of data to have one table showing nutrient name and both quantities
  dataSet[0].nutrients.forEach(({ nutrient, quantity }) => {
    const secondSetNutrient = dataSet[1].nutrients.find(nutrientB => nutrientB.nutrient === nutrient);
    mergedData.push({
      nutrient,
      [`${dataSet[0].foodName}`]: quantity,
      [`${dataSet[1].foodName}`]: secondSetNutrient.quantity,
    });
  });

  return (
    <ModalPanel open={open} onClose={onClose} title={title} subtitle={subtitle}>
      <div className={classes.compareTables}>
          <ResultsTable data={mergedData}/>
      </div>
    </ModalPanel>
  );
};

CompareModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  dataSet: PropTypes.array,
  subtitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default CompareModal;

import React from 'react';
import PropTypes from 'prop-types';
import ResultsTable from '../ResultsTable';
import ModalPanel from '../ModalPanel';
import LoadingPanel from '../LoadingPanel';

const CompareModal = ({
                        dataSet,
                        title = 'Food comparison',
                        subtitle = 'Nutritional information per 100g of food',
                        open,
                        onClose,
                        classes,
                      }) => {
  const mergedData = [];

  if (dataSet) {
    // Merge both sets of data to have one table showing nutrient name and both quantities
    dataSet[0].nutrients.forEach(({ nutrient, quantity }) => {
      const secondSetNutrient = dataSet[1].nutrients.find(nutrientB => nutrientB.nutrient === nutrient);
      mergedData.push({
        nutrient,
        [`${dataSet[0].foodName}`]: quantity,
        [`${dataSet[1].foodName}`]: secondSetNutrient.quantity,
      });
    });
  }
  return (
    <ModalPanel open={open} onClose={onClose} title={title} subtitle={subtitle}>
      <div className={classes.compareTables}>
        {mergedData.length > 0 ? <ResultsTable data={mergedData}/> : <LoadingPanel />}
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

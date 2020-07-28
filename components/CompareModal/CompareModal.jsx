import PropTypes from 'prop-types';
import React from 'react';
import LoadingPanel from '../LoadingPanel';
import ModalPanel from '../ModalPanel';
import ResultsTable from '../ResultsTable';

const CompareModal = ({
                        classes,
                        dataSet,
                        title = 'Food comparison',
                        tableTitle,
                        subtitle = 'Nutritional information per 100g of food',
                        open,
                        onClose,
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
    <ModalPanel open={open} onClose={onClose} title={title} subtitle={subtitle} style={classes.content}>
      {mergedData.length > 0 ? <ResultsTable title={tableTitle} data={mergedData} scrollable sortColumns={['nutrient']}/> :
        <LoadingPanel/>}
    </ModalPanel>
  );
};

CompareModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.string.isRequired,
  title: PropTypes.string,
  tableTitle: PropTypes.string,
  dataSet: PropTypes.array,
  subtitle: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default CompareModal;

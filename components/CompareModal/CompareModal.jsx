import React from 'react';
import { Typography, IconButton, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import ResultsTable from '../ResultsTable';

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
    <Modal open={open} onClose={onClose}>
      <div className={classes.modal}>
        <div>
          <IconButton classes={{ root: classes.closeIcon }} onClick={onClose} aria-label='close'>
            <CloseIcon fontSize='small'/>
          </IconButton>
          <div className={classes.header}>
            <Typography variant='h6' noWrap={true} title={title}>{title}</Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {subtitle}
            </Typography>
          </div>
        </div>
        <div className={classes.compareTables}>
          <div className={classes.table}>
            <ResultsTable data={mergedData}/>
          </div>
        </div>
      </div>
    </Modal>
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

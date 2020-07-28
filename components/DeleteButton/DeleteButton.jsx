import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import MainButton from '../MainButton';

const DeleteButton = ({ classes, onConfirmation, datakey, icon = false, context, buttonText, buttonConfirmationText, disabled, className }) => {
  const [confirm, setConfirm] = useState(false);

  const setTempConfirmation = () => {
    setConfirm(true);
    setTimeout(() => {
      setConfirm(false);
    }, 3000);
  };

  const defaultButton = () => (
    <MainButton action={setTempConfirmation} disabled={disabled} className={className}>
      {icon && <DeleteIcon className={classes.deleteIcon}/>}
      {buttonText}
    </MainButton>
  );

  const confirmButton = () => (
    <MainButton
      action={onConfirmation}
      colour={'secondary'}
      disabled={disabled}
      className={className}
      datakey={datakey}
    >
      {buttonConfirmationText}
      <LoadingSpinner context={context}/>
    </MainButton>
  );

  return confirm ? confirmButton() : defaultButton();
};

DeleteButton.propTypes = {
  onConfirmation: PropTypes.func,
  datakey: PropTypes.string,
  context: PropTypes.string,
  buttonText: PropTypes.string,
  buttonConfirmationText: PropTypes.string,
  icon: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default DeleteButton;

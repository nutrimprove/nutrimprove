import PropTypes from 'prop-types';
import React, { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import MainButton from '../MainButton';

const DeleteUserButton = ({ onConfirmation, datakey, context, buttonText, buttonConfirmationText, disabled, className }) => {
  const [confirm, setConfirm] = useState(false);

  const setTempConfirmation = () => {
    setConfirm(true);
    setTimeout(() => {
      setConfirm(false);
    }, 3000);
  };

  const defaultButton = () => (
    <MainButton action={setTempConfirmation} disabled={disabled} className={className}>
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

DeleteUserButton.propTypes = {
  onConfirmation: PropTypes.func,
  datakey: PropTypes.string,
  context: PropTypes.string,
  buttonText: PropTypes.string,
};

export default DeleteUserButton;

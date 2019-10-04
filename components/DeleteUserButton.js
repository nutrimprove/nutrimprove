import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import LoadingSpinner from './LoadingSpinner';
import { deleteUser } from '../connect/api';
import { useState } from 'react';

const DeleteUserButton = ({ user, action }) => {
  const [confirm, setConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const confirmButtonActions = async () => {
    setDisabled(true);
    await deleteUser(user);
    action();
  };

  const setTempConfirmation = () => {
    setConfirm(true);
    setTimeout(() => {
      setConfirm(false);
    }, 5000);
  };

  const defaultButton = () => (
    <PrimaryButton action={setTempConfirmation}>Delete User</PrimaryButton>
  );

  const confirmButton = () => (
    <PrimaryButton
      action={confirmButtonActions}
      colour={'secondary'}
      disabled={disabled}
    >
      Confirm Deletion
      <LoadingSpinner context={`deleteUser-${user}`} />
    </PrimaryButton>
  );

  return confirm ? confirmButton() : defaultButton();
};

DeleteUserButton.propTypes = {
  user: PropTypes.string.isRequired,
  action: PropTypes.object,
};

export default DeleteUserButton;

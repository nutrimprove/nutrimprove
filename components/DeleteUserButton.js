import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import LoadingSpinner from './LoadingSpinner';
import { deleteUser } from '../connect/api';
import { useState } from 'react';
import { isAdmin } from '../helpers/userUtils';

const DeleteUserButton = ({ user, action }) => {
  const [confirm, setConfirm] = useState(false);
  const [disabled, setDisabled] = useState(isAdmin(user)); // Admin users not deletable

  const confirmButtonActions = async () => {
    setDisabled(true);
    await deleteUser(user.email);
    action();
  };

  const setTempConfirmation = () => {
    setConfirm(true);
    setTimeout(() => {
      setConfirm(false);
    }, 5000);
  };

  const defaultButton = () => (
    <PrimaryButton action={setTempConfirmation} disabled={disabled}>
      Delete User
    </PrimaryButton>
  );

  const confirmButton = () => (
    <PrimaryButton
      action={confirmButtonActions}
      colour={'secondary'}
      disabled={disabled}
    >
      Confirm Deletion
      <LoadingSpinner context={`deleteUser-${user.email}`} />
    </PrimaryButton>
  );

  return confirm ? confirmButton() : defaultButton();
};

DeleteUserButton.propTypes = {
  user: PropTypes.object.isRequired,
  action: PropTypes.object,
};

export default DeleteUserButton;

import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import LoadingSpinner from './LoadingSpinner';
import { deleteUser } from '../connect/api';
import { useState } from 'react';

const DeleteUserButton = ({ user, action }) => {
  const [confirm, setConfirm] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const actions = async () => {
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

  if (!confirm) {
    return (
      <PrimaryButton action={setTempConfirmation}>
        Delete User
      </PrimaryButton>
    );
  } else {
    return (
      <PrimaryButton
        action={actions}
        colour={'secondary'}
        disabled={disabled}
      >
        Confirm Deletion
        <LoadingSpinner context={`deleteUser-${user}`} />
      </PrimaryButton>
    );
  }
};

DeleteUserButton.propTypes = {
  user: PropTypes.string.isRequired,
  action: PropTypes.object,
};

export default DeleteUserButton;

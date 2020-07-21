import { ROLES } from 'helpers/constants';
import { isAdmin, isOwner, userRoleToString } from 'helpers/userUtils';
import { updateDB } from 'interfaces/api/db';
import {
  approveUser,
  deleteUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  revokeUser,
  updateAllUsersPoints,
} from 'interfaces/api/users';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonWithSpinner from '../ButtonWithSpinner';
import DeleteUserButton from '../DeleteUserButton';
import LoadingPanel from '../LoadingPanel';
import ResultsTable from '../ResultsTable';

const enableDB = process.env.ENABLE_UPDATE_DB;

const queries = {
  GET_ALL: 'Users',
  APPROVED: 'Approved Users',
  NOT_APPROVED: 'Users Waiting Approval',
};

const updateDatabase = async () => {
  const result = await updateDB();
  console.log('Update DB result:', result);
};

const updatePoints = async () => {
  const result = await updateAllUsersPoints();
  console.log('Update all users points result:', result);
};

const AdminPanel = ({ classes }) => {
  const userDetails = useSelector(({ globalState }) => globalState.userDetails);
  const [users, setUsers] = useState();
  const [userQuery, setUserQuery] = useState();

  useEffect(() => {
    setUserQuery(queries.NOT_APPROVED);
  }, []);

  useEffect(() => {
    updateResults();
  }, [userDetails]);

  useEffect(() => {
    setUsers(null);
    updateResults();
  }, [userQuery]);

  const approvalButton = user => {
    const hasPermissions =
      isAdmin(userDetails) && userDetails.role < user.role;
    const action = user.approved === false ? 'approve' : 'revoke';
    return (
      <ButtonWithSpinner
        action={async () => {
          action === 'approve'
            ? await approveUser(user.email)
            : await revokeUser(user.email);
          updateResults();
        }}
        context={`${action}User-${user.email}`}
        disabled={!hasPermissions}
        className={classes.actionButton}
      >
        {action}
      </ButtonWithSpinner>
    );
  };

  const deleteButton = user => {
    if (userDetails.role === ROLES.OWNER) {
      return <DeleteUserButton
        onConfirmation={confirmDeletion}
        key={user.email}
        buttonText='Delete User'
        buttonConfirmationText='Confirm Deletion'
        datakey={user.email}
        disabled={isAdmin(user)}
        className={classes.actionButton}
        context={`deleteUser-${user.email}`}
      />;
    }
  };

  const renderActionButtons = user => (
    <>
      {approvalButton(user)}
      {deleteButton(user)}
    </>
  );

  const removeUser = userToDelete => {
    const newUserList = users.filter(user => user.email !== userToDelete);
    setUsers(newUserList);
    updateResults();
  };

  const confirmDeletion = async event => {
    const email = event.currentTarget.dataset.key;
    await deleteUser(email);
    removeUser(email);
  };

  const updateResults = async () => {
    let users;
    switch (userQuery) {
      case queries.GET_ALL:
        users = await getAllUsers();
        break;
      case queries.APPROVED:
        users = await getApprovedUsers();
        break;
      case queries.NOT_APPROVED:
        users = await getNotApprovedUsers();
        break;
      default:
        return;
    }
    const newUsersObj = [];
    if (users) {
      users.map(user => {
        newUsersObj.push({
          email: user.email,
          role: userRoleToString(user.role),
          approved: user.approved,
          action: renderActionButtons(user),
        });
      });
    }
    setUsers(newUsersObj);
  };

  return (
    <>
      <ButtonWithSpinner
        action={() => setUserQuery(queries.GET_ALL)}
        disabled={userQuery === queries.GET_ALL}
      >
        All Users
      </ButtonWithSpinner>
      <ButtonWithSpinner
        action={() => setUserQuery(queries.NOT_APPROVED)}
        disabled={userQuery === queries.NOT_APPROVED}
      >
        Waiting Approval
      </ButtonWithSpinner>
      <ButtonWithSpinner
        action={() => setUserQuery(queries.APPROVED)}
        disabled={userQuery === queries.APPROVED}
      >
        Approved Users
      </ButtonWithSpinner>
      {isOwner(userDetails) && enableDB === 'true' && (
        <>
          <ButtonWithSpinner
            action={updateDatabase}
            context='updateDB'
            colour='secondary'
          >
            Update DB
          </ButtonWithSpinner>
        </>
      )}
      {isOwner(userDetails) && (
        <>
          <ButtonWithSpinner
            action={updatePoints}
            context='updateAllUsersPoints'
            colour='secondary'
          >
            Update Users&apos; Points
          </ButtonWithSpinner>
        </>
      )}
      {users ? <ResultsTable data={users} title={`${users.length} ${userQuery}`}/> : <LoadingPanel/>}
    </>
  );
};

AdminPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AdminPanel;

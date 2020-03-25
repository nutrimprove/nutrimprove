import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import {
  approveUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  revokeUser,
} from '../interfaces/api/users';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MainButton from './MainButton';
import DeleteUserButton from './DeleteUserButton';
import { isAdmin, isOwner, userRoleToString } from '../helpers/userUtils';
import { ROLES } from '../helpers/constants';
import { updateDB } from '../interfaces/api/db';
import { updateAllUsersPoints } from '../server/users/users';

const enableDB = process.env.ENABLE_UPDATE_DB;

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const queries = {
  GET_ALL: 'getall',
  APPROVED: 'approved',
  NOT_APPROVED: 'notapproved',
};

const updateDatabase = async () => {
  const result = await updateDB();
  console.log('Update DB result:', result);
};

const updatePoints = async () => {
  const result = await updateAllUsersPoints();
  console.log('Update all users points result:', result);
};

const AdminPanel = ({ userDetails }) => {
  const [users, setUsers] = useState();
  const [userQuery, setUserQuery] = useState();

  useEffect(() => {
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
      >
        {action}
      </ButtonWithSpinner>
    );
  };

  const removeUser = userToDelete => {
    const newUserList = users.filter(user => user.email !== userToDelete);
    setUsers(newUserList);
    updateResults();
  };

  const deleteButton = user => {
    if (userDetails.role === ROLES.OWNER) {
      return <DeleteUserButton action={removeUser} user={user} />;
    }
  };

  const renderActionButtons = user => (
    <>
      {approvalButton(user)}
      {deleteButton(user)}
    </>
  );

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

  const listAllUsers = () => setUserQuery(queries.GET_ALL);
  const listApprovedUsers = () => setUserQuery(queries.APPROVED);
  const listNotApprovedUsers = () => setUserQuery(queries.NOT_APPROVED);

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <MainButton
        action={listAllUsers}
        disabled={userQuery === queries.GET_ALL}
      >
        All Users
      </MainButton>
      <MainButton
        action={listNotApprovedUsers}
        disabled={userQuery === queries.NOT_APPROVED}
      >
        Waiting Approval
      </MainButton>
      <MainButton
        action={listApprovedUsers}
        disabled={userQuery === queries.APPROVED}
      >
        Approved Users
      </MainButton>
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
            Update All User Points
          </ButtonWithSpinner>
        </>
      )}
      {users && <ResultsTable values={users} />}
    </>
  );
};

AdminPanel.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

const mapStateToProps = (states, ownProps) => {
  return {
    userDetails: states.globalState.userDetails,
  };
};

export default connect(mapStateToProps, null)(AdminPanel);

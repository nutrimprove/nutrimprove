import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import { approveUser, getUsers, revokeUser } from '../connect/api';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import DeleteUserButton from './DeleteUserButton';
import { isAdmin, userRoleToString } from '../helpers/userUtils';
import { ROLES } from '../helpers/constants';

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const queries = {
  GET_ALL: 'getall',
  APPROVED: 'approved',
  NOT_APPROVED: 'notapproved',
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
    if (userQuery) {
      const users = await getUsers(userQuery);
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
    }
  };

  const listAllUsers = () => setUserQuery(queries.GET_ALL);
  const listApprovedUsers = () => setUserQuery(queries.APPROVED);
  const listNotApprovedUsers = () => setUserQuery(queries.NOT_APPROVED);

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <PrimaryButton
        action={listAllUsers}
        disabled={userQuery === queries.GET_ALL}
      >
        All Users
      </PrimaryButton>
      <PrimaryButton
        action={listNotApprovedUsers}
        disabled={userQuery === queries.NOT_APPROVED}
      >
        Waiting Approval
      </PrimaryButton>
      <PrimaryButton
        action={listApprovedUsers}
        disabled={userQuery === queries.APPROVED}
      >
        Approved Users
      </PrimaryButton>
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

export default connect(
  mapStateToProps,
  null
)(AdminPanel);

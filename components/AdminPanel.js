import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import { approveUser, getUsers, revokeUser } from '../connect/api';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import DeleteUserButton from './DeleteUserButton';
import { userRoleToString } from '../helpers/utils';
import { ROLES } from '../helpers/constants';

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const AdminPanel = ({ userDetails }) => {
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState();

  useEffect(() => {
    updateResults();
  }, [userQuery]);

  const approvalButton = user => {
    const hasPermissions =
      userDetails.isAdmin && userDetails.role < user.role;
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

  const deleteButton = user => {
    if (userDetails.role === ROLES.OWNER) {
      return <DeleteUserButton action={updateResults} user={user.email} />;
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

  const listAllUsers = () => setUserQuery('getall');

  const listApprovedUsers = () => setUserQuery('approved');

  const listNotApprovedUsers = () => setUserQuery('notapproved');

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <PrimaryButton action={listAllUsers}>All Users</PrimaryButton>
      <PrimaryButton action={listNotApprovedUsers}>
        Waiting Approval
      </PrimaryButton>
      <PrimaryButton action={listApprovedUsers}>
        Approved Users
      </PrimaryButton>
      <ResultsTable values={users} />
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

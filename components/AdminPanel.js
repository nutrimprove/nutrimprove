import React, { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import { approveUser, getUsers, revokeUser } from '../connect/api';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PrimaryButton from './PrimaryButton';
import DeleteUserButton from './DeleteUserButton';

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const userRoleToString = userRole => {
  let role;
  switch (userRole) {
    case 0:
      role = 'Owner';
      break;
    case 5:
      role = 'Admin';
      break;
    case 100:
      role = 'Contributor';
      break;
    default:
      role = 'Other';
  }
  return role;
};

const AdminPanel = ({ userDetails }) => {
  const [users, setUsers] = useState([]);
  const [userQuery, setUserQuery] = useState();

  useEffect(() => {
    updateResults();
  }, [userQuery]);

  const approvalButton = (user, disabled, action) => (
    <ButtonWithSpinner
      action={async () => {
        if (action === 'approve') {
          await approveUser(user);
        } else {
          await revokeUser(user);
        }
        updateResults();
      }}
      context={`${action}User-${user}`}
      disabled={disabled}
    >
      {action}
    </ButtonWithSpinner>
  );

  const renderApprovalButton = user => {
    const hasPermissions = userDetails.role < user.role;
    const action = user.approved === false ? 'approve' : 'revoke';
    return approvalButton(user.email, !hasPermissions, action);
  };

  const renderActionButtons = user => (
    <>
      {renderApprovalButton(user)}
      {userDetails.role === 0 && (
        <DeleteUserButton action={updateResults} user={user.email} />
      )}
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

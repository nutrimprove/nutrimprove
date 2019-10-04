import React, { useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { approveUser, getUsers, revokeUser } from '../connect/api';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  const approvalButton = (user, disabled, action) => {
    return (
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
  };

  const renderActionButton = user => {
    const hasPermissions = userDetails.role < user.role;
    const action = user.approved === false ? 'approve' : 'revoke';
    return approvalButton(user.email, !hasPermissions, action);
  };

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
            action: renderActionButton(user),
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
      <ButtonWithSpinner action={listAllUsers} context='users-getall'>
        All Users
      </ButtonWithSpinner>
      <ButtonWithSpinner
        action={listNotApprovedUsers}
        context='users-notapproved'
      >
        Users Needing Approval
      </ButtonWithSpinner>
      <ButtonWithSpinner
        action={listApprovedUsers}
        context='users-approved'
      >
        Approved Users
      </ButtonWithSpinner>
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

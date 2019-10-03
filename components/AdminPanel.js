import React, { useState } from 'react';
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

const approveButton = (user, update, disabled) => {
  return (
    <ButtonWithSpinner
      action={async () => {
        await approveUser(user);
        update();
      }}
      context={`approveUser-${user}`}
      disabled={disabled}
    >
      Approve
    </ButtonWithSpinner>
  );
};

const revokeButton = (user, update, disabled) => {
  return (
    <ButtonWithSpinner
      action={async () => {
        await revokeUser(user);
        update();
      }}
      context={`revokeUser-${user}`}
      disabled={disabled}
    >
      Revoke
    </ButtonWithSpinner>
  );
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

  const renderActionButton = user => {
    const hasPermissions = userDetails.role < user.role;
    const button = user.approved === false ? approveButton : revokeButton;
    return button(user.email, updateResults, !hasPermissions);
  };

  const updateResults = async () => {
    const users = await getUsers();
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
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <ButtonWithSpinner action={updateResults} context='getUsers'>
        List Users
      </ButtonWithSpinner>
      <ResultsTable values={users} updateResults={updateResults} />
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

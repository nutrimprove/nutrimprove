import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { getUsers } from '../connect/api';
import ResultsTable from './ResultsTable';
import ButtonWithSpinner from './ButtonWithSpinner';
import PrimaryButton from './PrimaryButton';

const sectionHeader = {
  title: 'Administration page',
  subtitle: `Verify and revoke users' access to the app`,
};

const revokeButton = () => <PrimaryButton>Revoke</PrimaryButton>;

const approveButton = () => <PrimaryButton>Approve</PrimaryButton>;

const formatUsers = users => {
  if (users) {
    const newUsersObj = [];
    users.map(user => {
      newUsersObj.push({
        email: user.email,
        role: user.role,
        approved: user.approved,
        action: user.approved ? revokeButton() : approveButton(),
      });
    });
    return newUsersObj;
  }
};

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const updateResults = async () => {
    const users = await getUsers();
    setUsers(formatUsers(users));
  };

  return (
    <>
      <SectionHeader content={sectionHeader} />
      <ButtonWithSpinner action={updateResults} context='getUsers'>
        List Users
      </ButtonWithSpinner>
      <ResultsTable values={users} />
    </>
  );
};

export default AdminPanel;

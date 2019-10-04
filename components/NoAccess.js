import React from 'react';
import SectionHeader from './SectionHeader';
import PropTypes from 'prop-types';
import { PROJECT_NAME } from '../helpers/constants';

const content = {
  title: PROJECT_NAME,
  subtitle: 'Please login to be able to use the website!',
  message: '',
};

const NoAccess = ({ user }) => {
  if (user && user.email && !user.email_verified) {
    content.subtitle = 'Your account has not yet been verified.';
    content.messages = [
      'Thank you for registering.',
      'An admin will need to verify your account so that you can access the functionality of the site. ',
      'Please try again later!',
    ];
  }

  return (
    <>
      <SectionHeader content={content} />
    </>
  );
};

NoAccess.propTypes = {
  user: PropTypes.object,
};

export default NoAccess;

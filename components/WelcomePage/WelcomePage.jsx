import About from 'components/About';
import { PROJECT_NAME } from 'helpers/constants';
import { emailVerified } from 'helpers/userUtils';
import PropTypes from 'prop-types';
import React from 'react';
import { useAuth } from 'react-use-auth';
import SectionHeader from '../SectionHeader';

const WelcomePage = () => {
  // const { isAuthenticated } = useAuth();

  const content = {
    title: `Welcome to ${PROJECT_NAME}`,
    subtitle: '',
  };

  // if (isAuthenticated()) {
  //   if (!emailVerified()) {
  //     content.subtitle = 'Please verify your email account';
  //     content.messages = [
  //       'Follow the link provided in the verification email we sent you',
  //     ];
  //   } else {
  //     content.subtitle = '';
  //   }
  // } else {
  //   content.subtitle = 'Please login to be able to use the website!';
  // }

  return (
    <>
      <SectionHeader content={content} />
      <About header={false} />
    </>
  );
};

WelcomePage.propTypes = {
  userDetails: PropTypes.object,
};

export default WelcomePage;

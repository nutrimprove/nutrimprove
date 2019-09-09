import React, { useEffect } from 'react';
import Auth from '../lib/Auth';
import Router from 'next/router';
import SectionHeader from '../components/SectionHeader';

const auth = new Auth();

const Callback = () => {
  useEffect(() => {
    const userDetails = auth.extractInfoFromHash();
    auth.handleAuthentication().then(res => {
      if (!res) {
        console.error('Not able to authenticate user!', userDetails);
      }
      Router.push('/');
    });
  }, []);

  return (
    <SectionHeader
      title='Processing login information!!'
      subtitle='Please wait!!'
    />
  );
};

export default Callback;

import NoAccess from 'components/NoAccess';
import WelcomePage from 'components/WelcomePage';
import React from 'react';
import { useAuth } from 'react-use-auth';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <WelcomePage/> : <NoAccess />;
};

export default Index;

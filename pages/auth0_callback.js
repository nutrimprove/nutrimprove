import LoadingPanel from 'components/LoadingPanel';
import React, { useEffect } from 'react';
import { useAuth } from 'react-use-auth';

const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <LoadingPanel/>
  );
};

export default Auth0CallbackPage;

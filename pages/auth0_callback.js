import LoadingPanel from 'components/LoadingPanel';
import React, { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useAuth } from 'react-use-auth';

const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth();

  useEffect(() => {
    (async () => {
      trackPromise(await new Promise(() => handleAuthentication()), 'authenticating');
    })();
  }, []);

  return (
    <LoadingPanel/>
  );
};

export default Auth0CallbackPage;

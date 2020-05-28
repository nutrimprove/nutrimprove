import LoadingPanel from 'components/LoadingPanel';
import WelcomePage from 'components/WelcomePage';
import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const Index = () => {
  const { promiseInProgress } = usePromiseTracker({ area: 'getUser' });

  return (
    <>
      {promiseInProgress ? <LoadingPanel/> : <WelcomePage />}
    </>
  );
};

export default Index;

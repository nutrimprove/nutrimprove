import Header from 'components/Header';
import PageContent from 'components/PageContent';
import LoaderContainer from 'components/LoaderContainer';
import * as gtag from 'helpers/analytics';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-use-auth';
import withReduxStore from 'store/withReduxStore';

const MyApp = ({ Component, pageProps, store }) => {
  const router = useRouter();

  useEffect(() => {
    // Google Analytics
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <AuthProvider
      navigate={router.push}
      auth0_domain='dev-eatwell.eu.auth0.com'
      auth0_client_id='mkvqwP1yMM0ICN88WsOWp1h1y82Xd55A'
    >
      <Provider store={store}>
        <LoaderContainer>
          <Header/>
          <PageContent>
            <Component {...pageProps}/>
          </PageContent>
        </LoaderContainer>
      </Provider>
    </AuthProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);

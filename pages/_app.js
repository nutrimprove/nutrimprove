import Header from 'components/Header';
import NoAccess from 'components/NoAccess';
import PageContent from 'components/PageContent';
import RootContainer from 'components/RootContainer';
import * as gtag from 'helpers/analytics';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AuthProvider, useAuth } from 'react-use-auth';
import withReduxStore from 'store/withReduxStore';

const noAuthPages = ['/auth0_callback', '/about'];

const MyApp = ({ Component, pageProps, store }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const allow = isAuthenticated() || noAuthPages.includes(router.route);

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

  console.log(`=== _app.js #31 === ( allow ) =======>`, allow);

  return (
    <AuthProvider
      navigate={router.push}
      auth0_domain='dev-eatwell.eu.auth0.com'
      auth0_client_id='mkvqwP1yMM0ICN88WsOWp1h1y82Xd55A'
    >
      <Provider store={store}>
        <RootContainer>
          <Header/>
          <PageContent>
            {allow ? <Component {...pageProps}/> : <NoAccess/>}
          </PageContent>
        </RootContainer>
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

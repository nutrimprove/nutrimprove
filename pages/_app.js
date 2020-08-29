import Header from 'components/Header';
import LoaderContainer from 'components/LoaderContainer';
import PageContent from 'components/PageContent';
import * as gtag from 'helpers/analytics';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-use-auth';
import withReduxStore from 'store/withReduxStore';

const noHeaderPages = ['/info'];
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT = process.env.AUTH0_CLIENT_ID;

const MyApp = ({ Component, pageProps, store }) => {
  const router = useRouter();
  const hasHeader = !noHeaderPages.includes(router.route);

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
      auth0_domain={AUTH0_DOMAIN}
      auth0_client_id={AUTH0_CLIENT}
    >
      {console.log(`=== _app.js #37 === ( AUTH0_DOMAIN ) =======>`, AUTH0_DOMAIN)}
      {console.log(`=== _app.js #38 === ( AUTH0_CLIENT ) =======>`, AUTH0_CLIENT)}
      {console.log(`=== _app.js #36 === ( process.env.MONGODB_URI ) =======>`, process.env.MONGODB_URI)}
      {console.log(`=== _app.js #36 === ( process.env.AUTH0_CLIENT_ID ) =======>`, process.env.AUTH0_CLIENT_ID)}
      {console.log(`=== _app.js #36 === ( process.env.AUTH0_DOMAIN ) =======>`, process.env.AUTH0_DOMAIN)}
      <Provider store={store}>
        <LoaderContainer>
          {hasHeader ? <Header/> : null}
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

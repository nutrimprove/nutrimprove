import Header from 'components/Header';
import LoaderContainer from 'components/LoaderContainer';
import PageContent from 'components/PageContent';
import * as gtag from 'helpers/analytics';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// import { AuthProvider } from 'react-use-auth';
import withReduxStore from 'store/withReduxStore';

const noHeaderPages = ['/info'];

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
    <>
      <Head>
        <title>Nutrimprove</title>
      </Head>
      {/* <AuthProvider
        navigate={router.push}
        auth0_domain={process.env.AUTH0_DOMAIN}
        auth0_client_id={process.env.AUTH0_CLIENT_ID}
      > */}
      <Provider store={store}>
        <LoaderContainer>
          {hasHeader ? <Header /> : null}
          <PageContent>
            <Component {...pageProps} />
          </PageContent>
        </LoaderContainer>
      </Provider>
      {/* </AuthProvider> */}
    </>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);

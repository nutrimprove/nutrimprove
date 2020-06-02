import AuthContainer from 'components/AuthContainer';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import RootContainer from 'components/RootContainer';
import * as gtag from 'helpers/analytics';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'store/withReduxStore';

const MyApp = ({ Component, pageProps, store }) => {
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    };
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, []);

  return (
    <Provider store={store}>
      <RootContainer>
        <Header/>
        <PageContent>
          <AuthContainer>
            <Component {...pageProps}/>
          </AuthContainer>
        </PageContent>
      </RootContainer>
    </Provider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);

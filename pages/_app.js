import AuthContainer from 'components/AuthContainer';
import Header from 'components/Header';
import MainNav from 'components/MainNav';
import PageContent from 'components/PageContent';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'store/withReduxStore';

const MyApp = ({ Component, pageProps, store }) => (
  <Provider store={store}>
    <Header/>
    <AuthContainer>
      <MainNav/>
      <PageContent>
        <Component {...pageProps}/>
      </PageContent>
    </AuthContainer>
  </Provider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);

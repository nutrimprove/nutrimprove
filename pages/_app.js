import AuthContainer from 'components/AuthContainer';
import Header from 'components/Header';
import PageContent from 'components/PageContent';
import RootContainer from 'components/RootContainer';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'store/withReduxStore';

const MyApp = ({ Component, pageProps, store }) => (
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

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);

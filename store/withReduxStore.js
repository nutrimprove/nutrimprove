import React from 'react';
import PropTypes from 'prop-types'; // Make sure to import PropTypes
import { makeRootStore } from './index';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return makeRootStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = makeRootStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = getOrCreateStore({});

      appContext.ctx.store = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.store = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} store={this.store} />;
    }
  }

  // Define propTypes for AppWithRedux
  AppWithRedux.propTypes = {
    initialReduxState: PropTypes.object.isRequired,
  };

  return AppWithRedux; // Return the HOC class
};

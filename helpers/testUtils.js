import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { makeRootStore } from '../store';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

export const renderWithRedux = (
  ui,
  {
    initialState = {
      globalState: {
        categories: {
          all: [],
          selectedGroups: [],
        },
      },
    },
    store = makeRootStore(initialState),
    ...renderOptions
  } = {},
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  Wrapper.propTypes = {
    children: PropTypes.object,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

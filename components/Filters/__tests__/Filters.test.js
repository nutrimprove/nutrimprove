import React from 'react';
import Filters from '../../../components/Filters';
import { renderWithRedux } from '../../../helpers/testUtils';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect'

describe('Filters', () => {
  let filtersButton;

  beforeEach(() => {
    renderWithRedux(<Filters/>);
    filtersButton = screen.getByTestId('triggerButton');
  });

  test('button is rendered with correct text', () => {
    expect(filtersButton).toHaveTextContent('Filter by category');
  });

  test('popup is opened after clicking button', () => {
    fireEvent.click(filtersButton);
    const popup = screen.getByTestId('filtersPopup');
    expect(popup).toBeInTheDocument();
  });
});

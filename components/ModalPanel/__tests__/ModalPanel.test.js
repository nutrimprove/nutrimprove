import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ModalPanel from 'components/ModalPanel';
import React from 'react';

const modalPanel = (
  <ModalPanel title='Modal title' open={true} onClose={jest.fn()} subtitle='Modal subtitle'>
    <span>This is a modal panel.</span>
  </ModalPanel>
);

describe('Modal Panel', () => {
  test('is rendered', () => {
    const {container} = render(modalPanel, { container: document.body });
    expect(container).toMatchSnapshot();
  });
});

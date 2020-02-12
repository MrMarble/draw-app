import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import Color from './Color';

const TEST_ID = 'color-circle';

describe('Color Component', () => {
  test('Component is rendered', () => {
    const { container } = render(<Color />);

    expect(container.firstChild.nodeName).toBe('SPAN');
  });

  test('Background color is applied', () => {
    const bgColor = 'red';
    const { getByTestId } = render(<Color bgColor={bgColor} />);

    expect(getByTestId(TEST_ID)).toHaveStyleRule('background-color', bgColor);
  });

  test('Check mark is shown when isActive', () => {
    const isActive = true;
    const { getByTestId } = render(<Color isActive={isActive} />);

    expect(getByTestId(TEST_ID)).toHaveStyleRule({ pseudo: 'before' });
  });

  test('onActive is called', () => {
    const bgColor = 'red';
    const onActive = jest.fn();
    const { getByTestId } = render(
      <Color bgColor={bgColor} onActive={onActive} />,
    );

    fireEvent.click(getByTestId(TEST_ID));

    expect(onActive).toHaveBeenCalledTimes(1);
    expect(onActive).toHaveBeenCalledWith(bgColor);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import Color from './Color';

describe('Color Component', () => {
  test('Component is rendered', () => {
    const { queryByTestId } = render(<Color />);

    expect(queryByTestId('color-circle')).not.toBeNull();
  });

  test('Background color is applied', () => {
    const bgColor = 'red';
    const { getByTestId } = render(<Color bgColor={bgColor} />);

    expect(getByTestId('color-circle')).toHaveStyleRule(
      'background-color',
      bgColor,
    );
  });

  test('Check mark is shown when isActive', () => {
    const isActive = true;
    const { queryByTestId } = render(<Color isActive={isActive} />);

    expect(queryByTestId('color-selected')).not.toBeNull();
  });

  test('onActive is called', () => {
    const bgColor = 'red';
    const onActive = jest.fn();
    const { getByTestId } = render(
      <Color bgColor={bgColor} onActive={onActive} />,
    );

    fireEvent.click(getByTestId('color-circle'));

    expect(onActive).toHaveBeenCalledTimes(1);
    expect(onActive).toHaveBeenCalledWith(bgColor);
  });
});

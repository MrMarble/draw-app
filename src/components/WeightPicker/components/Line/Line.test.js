import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import Line from './Line';

describe('Line Component', () => {
  test('Component is rendered', () => {
    const weight = 1;
    const { queryByTestId } = render(<Line weight={weight} />);

    expect(queryByTestId('test-wrapper')).not.toBeNull();
    expect(queryByTestId('test-line')).not.toBeNull();
  });

  test('Weight is applied', () => {
    const weight = 15;
    const { getByTestId } = render(<Line weight={weight} />);

    expect(getByTestId('test-line')).toHaveStyleRule('height', `${weight}px`);
  });

  test('Mark is shown when isActive = true', () => {
    const isActive = true;
    const weight = 1;
    const { queryByTestId } = render(
      <Line weight={weight} isActive={isActive} />,
    );

    expect(queryByTestId('test-selected')).not.toBeNull();
    expect(queryByTestId('test-selected').nodeName).toBe('SPAN');
  });

  test('onActive is called', () => {
    const weight = 55;
    const onActive = jest.fn();
    const { getByTestId } = render(
      <Line weight={weight} onActive={onActive} />,
    );

    fireEvent.click(getByTestId('test-wrapper'));

    expect(onActive).toHaveBeenCalledTimes(1);
    expect(onActive).toHaveBeenCalledWith(weight);
  });
});

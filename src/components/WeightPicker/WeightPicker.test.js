import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import WeightPicker from './WeightPicker';

const TEST_ID = 'weight-list';

describe('WeightPicker Component', () => {
  test('Component is rendered', () => {
    const weightList = [1, 2, 3];
    const { container, getByTestId } = render(
      <WeightPicker weightList={weightList} />,
    );

    expect(getByTestId(TEST_ID)).not.toBeNull();
    expect(container.firstChild.nodeName).toBe('DIV');
  });

  describe('Weight list', () => {
    test('Weight list is used', () => {
      const weightList = [1, 2, 3];
      const { getByTestId } = render(<WeightPicker weightList={weightList} />);

      expect(getByTestId(TEST_ID).childElementCount).toBe(weightList.length);
    });
    test('Duplicated weights are removed', () => {
      const weightList = [1, 2, 3, 2];
      const { getByTestId } = render(<WeightPicker weightList={weightList} />);

      expect(getByTestId(TEST_ID).childElementCount).toBe(3);
    });
  });

  describe('Paragraph element', () => {
    test('Is shown', () => {
      const weightList = [1, 2];
      const { getByTestId } = render(<WeightPicker weightList={weightList} />);

      expect(getByTestId('weight-paragraph')).not.toBeNull();
    });

    test('Not shown when weight list is empty', () => {
      const emptyWeightList = [];
      const { queryByTestId } = render(
        <WeightPicker weightList={emptyWeightList} />,
      );

      expect(queryByTestId('weight-paragraph')).toBeNull();
    });
  });

  test('onActiveCallback is called', () => {
    const weightList = [1, 2, 3];
    const onActiveCallback = jest.fn();
    const { getByTestId } = render(
      <WeightPicker
        weightList={weightList}
        onActiveCallback={onActiveCallback}
      />,
    );

    fireEvent.click(getByTestId(TEST_ID).firstChild);

    expect(onActiveCallback).toHaveBeenCalledTimes(1);
    expect(onActiveCallback).toHaveBeenCalledWith(weightList[0]);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import 'jest-styled-components';
import ColorPicker from './ColorPicker';

const TEST_ID = 'color-list';

describe('ColorPicker Component', () => {
  test('Component is rendered', () => {
    const colorList = ['#fff', '#f00', '#0f0'];
    const { container } = render(<ColorPicker colorList={colorList} />);

    expect(container.firstChild.nodeName).toBe('DIV');
  });

  describe('Color list', () => {
    test('Color list is used', () => {
      const colorList = ['#fff', '#f00', '#0f0'];
      const { getByTestId } = render(<ColorPicker colorList={colorList} />);

      expect(getByTestId(TEST_ID).childElementCount).toBe(colorList.length);
    });
    test('Duplicated colors are removed', () => {
      const colorList = ['#fff', '#f00', '#fff'];
      const { getByTestId } = render(<ColorPicker colorList={colorList} />);

      expect(getByTestId(TEST_ID).childElementCount).toBe(2);
    });
  });

  describe('Paragraph element', () => {
    test('Is shown', () => {
      const colorList = ['#fff'];
      const { container } = render(<ColorPicker colorList={colorList} />);

      expect(container.firstChild.firstChild.nodeName).toBe('P');
    });

    test('Not shown when color list is empty', () => {
      const emptyColorList = [];
      const { container } = render(<ColorPicker colorList={emptyColorList} />);

      expect(container.firstChild.firstChild.nodeName).toBe('DIV');
    });
  });

  test('onActiveCallback is called', () => {
    const colorList = ['#f00', '#0f0'];
    const onActiveCallback = jest.fn();
    const { getByTestId } = render(
      <ColorPicker colorList={colorList} onActiveCallback={onActiveCallback} />,
    );

    fireEvent.click(getByTestId(TEST_ID).firstChild);

    expect(onActiveCallback).toHaveBeenCalledTimes(1);
    expect(onActiveCallback).toHaveBeenCalledWith(colorList[0]);
  });
});

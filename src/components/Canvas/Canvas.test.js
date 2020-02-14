import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CanvasComponent from './Canvas';

describe('Canvas Component', () => {
  test('Should render', () => {
    const { getByTestId } = render(<CanvasComponent width={1} height={1} />);

    expect(getByTestId('canvas')).not.toBeNull();
    expect(getByTestId('canvas').nodeName).toBe('CANVAS');
  });

  describe('Size props should apply', () => {
    test('width is applied', () => {
      const width = 134;
      const { getByTestId } = render(
        <CanvasComponent width={width} height={1} />,
      );

      expect(getByTestId('canvas').width).toBe(width);
    });

    test('height is applied', () => {
      const height = 134;
      const { getByTestId } = render(
        <CanvasComponent width={1} height={height} />,
      );

      expect(getByTestId('canvas').height).toBe(height);
    });
  });

  describe('Callbacks should fire', () => {
    test('onMouseDown', () => {
      const callback = jest.fn();
      const { getByTestId } = render(
        <CanvasComponent width={1} height={1} onMouseDown={callback} />,
      );

      fireEvent.mouseDown(getByTestId('canvas'));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onMouseUp', () => {
      const callback = jest.fn();
      const { getByTestId } = render(
        <CanvasComponent width={1} height={1} onMouseUp={callback} />,
      );

      fireEvent.mouseUp(getByTestId('canvas'));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onMouseMove', () => {
      const callback = jest.fn();
      const { getByTestId } = render(
        <CanvasComponent width={1} height={1} onMouseMove={callback} />,
      );

      fireEvent.mouseMove(getByTestId('canvas'));

      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onMouseLeave', () => {
      const callback = jest.fn();
      const { getByTestId } = render(
        <CanvasComponent width={1} height={1} onMouseLeave={callback} />,
      );

      fireEvent.mouseLeave(getByTestId('canvas'));

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

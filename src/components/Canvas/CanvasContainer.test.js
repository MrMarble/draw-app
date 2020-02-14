import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CanvasContainer from './CanvasContainer';

describe('CanvasContainer Component', () => {
  let moveTo;
  let beginPath;
  let lineTo;
  let stroke;
  beforeEach(() => {
    moveTo = jest.fn();
    beginPath = jest.fn();
    lineTo = jest.fn();
    stroke = jest.fn();
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      moveTo,
      beginPath,
      lineTo,
      stroke,
    }));
  });

  test('should return drawing path', () => {
    const callback = jest.fn();
    const color = '#000';
    const lineWeight = 3;
    const result = [
      {
        x: 10,
        y: 10,
        color,
        lineWeight,
      },
    ];
    const { getByTestId } = render(
      <CanvasContainer
        width={10}
        height={10}
        drawingUpdatedCallback={callback}
        color={color}
        lineWeight={lineWeight}
      />,
    );

    fireEvent.mouseDown(getByTestId('canvas'), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.mouseMove(getByTestId('canvas'), {
      clientX: 10,
      clientY: 10,
    });
    fireEvent.mouseUp(getByTestId('canvas'));

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(result);
  });

  test('should draw initial path', () => {
    const color = '#000';
    const lineWeight = 3;
    const path = [
      {
        x: 50,
        y: 50,
        color,
        lineWeight,
      },
      {
        x: 150,
        y: 100,
        color,
        lineWeight,
      },
      {
        x: 250,
        y: 50,
        color,
        lineWeight,
      },
    ];
    render(
      <CanvasContainer
        width={10}
        height={10}
        color={color}
        lineWeight={lineWeight}
        currentDrawing={path}
      />,
    );

    expect(beginPath).toHaveBeenCalled();
    expect(moveTo).toHaveBeenCalledWith(path[0].x, path[0].y);
    expect(lineTo).toHaveBeenCalledWith(path[1].x, path[1].y);
  });
  test('should not draw without pressing the mouse button', () => {
    const callback = jest.fn();
    const color = '#000';
    const lineWeight = 3;
    const { getByTestId } = render(
      <CanvasContainer
        width={10}
        height={10}
        drawingUpdatedCallback={callback}
        color={color}
        lineWeight={lineWeight}
      />,
    );

    fireEvent.mouseMove(getByTestId('canvas'), {
      clientX: 10,
      clientY: 10,
    });
    expect(callback).not.toHaveBeenCalled();
    expect(lineTo).not.toHaveBeenCalled();
  });
});

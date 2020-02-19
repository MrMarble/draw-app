import React, { useEffect, useRef, useState } from 'react';
import t from 'prop-types';
import Canvas from './Canvas';
import { getMouseCoords } from './utils/getMouseCoords';

const CanvasContainer = ({
  width,
  height,
  lineWeight,
  color,
  currentDrawing,
  drawingUpdatedCallback,
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const ctx = useRef();
  const canvas = useRef();
  const drawing = useRef([]);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    ctx.current.lineCap = 'round';
    ctx.current.lineJoin = 'round';
    ctx.current.strokeStyle = color;
    ctx.current.lineWidth = lineWeight;
  }, []);

  useEffect(() => {
    ctx.current.lineWidth = lineWeight;
  }, [lineWeight]);

  useEffect(() => {
    ctx.current.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    ctx.current.clearRect(0, 0, width, height);
    for (let index = 0; index < currentDrawing.length; index += 1) {
      const line = currentDrawing[index];
      let begin = false;
      if (ctx.current.lineWidth !== line.lineWeight) {
        ctx.current.lineWidth = line.lineWeight;
        begin = true;
      }
      if (ctx.current.strokeStyle.toUpperCase() !== line.color.toUpperCase()) {
        ctx.current.strokeStyle = line.color;
        begin = true;
      }
      if (line.mode === 'begin' || begin) {
        ctx.current.beginPath();
        ctx.current.moveTo(line.x, line.y);
      }
      ctx.current.lineTo(line.x, line.y);
      if (line.mode === 'end' || index === currentDrawing.length - 1) {
        ctx.current.stroke();
      }
    }
    ctx.current.strokeStyle = color;
    ctx.current.lineWidth = lineWeight;
    drawing.current = currentDrawing;
  }, [currentDrawing]);

  const onMouseDown = event => {
    const cursorPosition = getMouseCoords(canvas.current, event);
    ctx.current.moveTo(cursorPosition.x, cursorPosition.y);
    ctx.current.beginPath();
    setIsMouseDown(true);
    drawing.current = [
      ...drawing.current,
      {
        x: cursorPosition.x,
        y: cursorPosition.y,
        lineWeight,
        color,
        mode: 'begin',
      },
    ];
  };
  const onMouseUp = event => {
    if (isMouseDown) {
      const cursorPosition = getMouseCoords(canvas.current, event);
      setIsMouseDown(false);
      if (typeof cursorPosition === 'undefined') {
        drawing.current = [
          ...drawing.current,
          {
            x: drawing.current.slice(-1)[0].x,
            y: drawing.current.slice(-1)[0].y,
            lineWeight,
            color,
            mode: 'end',
          },
        ];
      } else {
        drawing.current = [
          ...drawing.current,
          {
            x: cursorPosition.x,
            y: cursorPosition.y,
            lineWeight,
            color,
            mode: 'end',
          },
        ];
      }

      drawingUpdatedCallback(drawing.current);
    }
  };

  const onMouseMove = event => {
    if (isMouseDown) {
      const cursorPosition = getMouseCoords(canvas.current, event);
      ctx.current.lineTo(cursorPosition.x, cursorPosition.y);
      ctx.current.stroke();
      drawing.current = [
        ...drawing.current,
        {
          x: cursorPosition.x,
          y: cursorPosition.y,
          lineWeight,
          color,
          mode: 'draw',
        },
      ];
    }
  };

  return (
    <Canvas
      data-testid="canvas-container"
      canvas={canvas}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchMove={onMouseMove}
    />
  );
};

CanvasContainer.propTypes = {
  /** Canvas width */
  width: t.number.isRequired,
  /** Canvas height */
  height: t.number.isRequired,
  /** Thickness of the line */
  lineWeight: t.number,
  /** Color fo the line */
  color: t.string,
  /** Drawing to print on the canvas */
  currentDrawing: t.arrayOf(t.object),
  /** Callback to get the current drawing */
  drawingUpdatedCallback: t.func,
};

CanvasContainer.defaultProps = {
  lineWeight: 2,
  color: '#000',
  currentDrawing: [],
  drawingUpdatedCallback: Function.prototype,
};

export default CanvasContainer;

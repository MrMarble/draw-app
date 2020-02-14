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
  const drawing = useRef(currentDrawing);

  useEffect(() => {
    ctx.current = canvas.current.getContext('2d');
    ctx.current.lineCap = 'round';
    ctx.current.lineJoin = 'round';

    if (drawing.current.length > 0) {
      for (let index = 1; index < drawing.current.length; index += index) {
        const lineStart = drawing.current[index - 1];
        const lineEnd = drawing.current[index];
        ctx.current.beginPath();
        ctx.current.moveTo(lineStart.x, lineStart.y);
        ctx.current.lineWidth = lineEnd.lineWeight;
        ctx.current.strokeStyle = lineEnd.color;
        ctx.current.lineTo(lineEnd.x, lineEnd.y);
        ctx.current.stroke();
      }
    }
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
    drawing.current = currentDrawing;
  }, [currentDrawing]);

  const onMouseDown = event => {
    const cursorPosition = getMouseCoords(canvas.current, event);
    ctx.current.moveTo(cursorPosition.x, cursorPosition.y);
    ctx.current.beginPath();
    setIsMouseDown(true);
  };
  const onMouseUp = () => setIsMouseDown(false);

  const onMouseMove = event => {
    if (isMouseDown) {
      const cursorPosition = getMouseCoords(canvas.current, event);
      ctx.current.lineTo(cursorPosition.x, cursorPosition.y);
      ctx.current.stroke();
      drawing.current.push({
        x: cursorPosition.x,
        y: cursorPosition.y,
        lineWeight,
        color,
      });
      drawingUpdatedCallback(drawing.current);
    }
  };

  return (
    <Canvas
      data-testid="canvas-container"
      canvas={canvas}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
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

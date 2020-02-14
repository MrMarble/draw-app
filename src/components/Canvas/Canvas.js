import React, { useRef } from 'react';
import t from 'prop-types';
import styled from 'styled-components';

const Canvas = styled.canvas`
  border: 1px solid grey;
`;

const CanvasComponent = ({
  canvas,
  width,
  height,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onMouseMove,
}) => (
  <Canvas
    data-testid="canvas"
    ref={canvas}
    width={width}
    height={height}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
    onMouseMove={onMouseMove}
  />
);

CanvasComponent.propTypes = {
  canvas: t.objectOf(useRef),
  width: t.number.isRequired,
  height: t.number.isRequired,
  onMouseDown: t.func,
  onMouseUp: t.func,
  onMouseLeave: t.func,
  onMouseMove: t.func,
};

CanvasComponent.defaultProps = {
  canvas: React.RefObject,
  onMouseDown: Function.prototype,
  onMouseUp: Function.prototype,
  onMouseLeave: Function.prototype,
  onMouseMove: Function.prototype,
};

export default CanvasComponent;

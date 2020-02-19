export const getMouseCoords = (canvas, event) => {
  const canvasRect = canvas.getBoundingClientRect();
  if (Object.prototype.hasOwnProperty.call(event, 'clientX')) {
    return {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };
  }
  if (
    Object.prototype.hasOwnProperty.call(event, 'touches')
    && event.touches.length > 0
  ) {
    return {
      x: event.touches[0].clientX - canvasRect.left,
      y: event.touches[0].clientY - canvasRect.top,
    };
  }
  return undefined;
};

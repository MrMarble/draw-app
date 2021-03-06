import { getMouseCoords } from './getMouseCoords';

describe('getMouseCoords()', () => {
  Element.prototype.getBoundingClientRect = jest.fn(() => ({
    left: 5,
    top: 5,
  }));

  test('Should return {x: 5, y: 5}', () => {
    const canvas = document.createElement('canvas');
    const event = {
      clientX: 10,
      clientY: 10,
    };

    const mouseCoords = getMouseCoords(canvas, event);

    expect(mouseCoords.x).toEqual(5);
    expect(mouseCoords.y).toEqual(5);
  });
  test('Touch event Should return {x: 5, y: 5}', () => {
    const canvas = document.createElement('canvas');
    const event = {
      touches: [
        {
          clientX: 10,
          clientY: 10,
        },
      ],
    };

    const mouseCoords = getMouseCoords(canvas, event);

    expect(mouseCoords.x).toEqual(5);
    expect(mouseCoords.y).toEqual(5);
  });
  test('TouchEnd should return undefined', () => {
    const canvas = document.createElement('canvas');
    const event = {};

    const mouseCoords = getMouseCoords(canvas, event);

    expect(mouseCoords).toBeUndefined();
  });
});

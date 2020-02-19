import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UndoRedo from './UndoRedo';

describe('UndoRedo Component', () => {
  test('Should render', () => {
    const { getByTestId } = render(<UndoRedo />);

    expect(getByTestId('undo-redo')).not.toBeNull();
    expect(getByTestId('undo-redo').nodeName).toBe('DIV');
  });

  describe('Callbacks should fire', () => {
    test('undoCallback', () => {
      const callback = jest.fn();
      const { getByTestId } = render(<UndoRedo undoCallback={callback} />);

      fireEvent.click(getByTestId('undo-redo').firstChild);

      expect(callback).toHaveBeenCalledTimes(1);
    });
    test('redoCallback', () => {
      const callback = jest.fn();
      const { getByTestId } = render(<UndoRedo redoCallback={callback} />);

      fireEvent.click(getByTestId('undo-redo').lastChild);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { undo, redo } from 'react-icons-kit/iconic';
import Icon from 'react-icons-kit';

const Button = styled.button`
  margin: 0 5px;
  background-repeat: no-repeat;
  border: none;
  color: #0074d9;
  background-color: transparent;
  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
  &:active {
    filter: brightness(0.9);
  }
  &:disabled,
  [disabled] {
    cursor: not-allowed;
    filter: contrast(40%);
  }
`;
const Arrow = ({
  disabled, clickCallback, children, label,
}) => {
  const onClick = () => clickCallback();

  return (
    <Button onClick={onClick} disabled={disabled} aria-label={label}>
      {children}
    </Button>
  );
};

Arrow.propTypes = {
  disabled: t.bool,
  clickCallback: t.func,
  children: t.oneOfType([t.node, t.arrayOf(t.node)]).isRequired,
  label: t.string.isRequired,
};

Arrow.defaultProps = {
  disabled: false,
  clickCallback: Function.prototype,
};

const UndoRedo = ({
  undoCallback, redoCallback, disableUndo, disableRedo,
}) => {
  const onClickUndo = () => undoCallback();
  const onClickRedo = () => redoCallback();
  return (
    <div data-testid="undo-redo">
      <Arrow clickCallback={onClickUndo} disabled={disableUndo} label="Undo">
        <Icon icon={undo} size="2.5em" />
      </Arrow>
      <Arrow clickCallback={onClickRedo} disabled={disableRedo} label="Redo">
        <Icon icon={redo} size="2.5em" />
      </Arrow>
    </div>
  );
};

UndoRedo.propTypes = {
  undoCallback: t.func,
  redoCallback: t.func,
  disableUndo: t.bool,
  disableRedo: t.bool,
};

UndoRedo.defaultProps = {
  undoCallback: Function.prototype,
  redoCallback: Function.prototype,
  disableUndo: false,
  disableRedo: false,
};

export default UndoRedo;

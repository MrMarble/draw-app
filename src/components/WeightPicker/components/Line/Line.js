import React from 'react';
import style from 'styled-components';
import t from 'prop-types';

const theme = `
  border-radius: 1em;
  display: inline-block;
  background-color: black;
  vertical-align: middle;
`;

const LineWrapper = style.div`
  position:relative;
`;

const Line = style.span`
 ${theme}
 ${(props) => props.weight && `height: ${props.weight}px`};
 width:5em;
 margin-right: .2em;
`;

const SelectedMark = style.span`
  ${theme}
  ${(props) => props.isActive && 'content: " ";'}
  width: .7em;
  height: .7em;
  background-color: black;
  border-radius:1em;
`;

const LineComponent = ({ weight, isActive, onActive }) => (
  <LineWrapper data-testid="test-wrapper" onClick={() => onActive(weight)}>
    <Line data-testid="test-line" weight={weight} />
    {isActive && (
      <SelectedMark data-testid="test-selected" isActive={isActive} />
    )}
  </LineWrapper>
);

LineComponent.propTypes = {
  /** Height of the line */
  weight: t.number.isRequired,
  /** Show selected mark */
  isActive: t.bool,
  /** Click callback with selected color */
  onActive: t.func,
};

LineComponent.defaultProps = {
  isActive: false,
  onActive: Function.prototype,
};

export default LineComponent;

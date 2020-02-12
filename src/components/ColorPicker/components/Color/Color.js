import React from 'react';
import style from 'styled-components';
import t from 'prop-types';

const Circle = style.span`
    width: 2em;
    height: 2em;
    display: inline-block;
    position:relative;
    margin: 2px 3px;
    border-radius: 1em;

    ${(props) => props.bgColor && `background-color: ${props.bgColor}`};
`;

const CheckMark = style.span`
  color: white;
  position: absolute;
  margin: 50% 0 0 50%;
  transform: translate3d(-50%, -50%, 0);

  &:before {
    content: " ";
    position: absolute;
    width: 1.3em;
    height: 1.3em;
    border-radius:1em;
    margin: 50% 0 0 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(0, 0, 0, .3);
  }
`;

const Color = ({ bgColor, isActive, onActive }) => (
  <Circle
    data-testid="color-circle"
    onClick={() => onActive(bgColor)}
    bgColor={bgColor}
  >
    {isActive && <CheckMark data-testid="color-selected">&#10004;</CheckMark>}
  </Circle>
);

Color.propTypes = {
  /** Color to be shown */
  bgColor: t.string,
  /** Show selected mark */
  isActive: t.bool,
  /** Click callback with selected color */
  onActive: t.func,
};

Color.defaultProps = {
  bgColor: '#fff',
  isActive: false,
  onActive: Function.prototype,
};

export default Color;

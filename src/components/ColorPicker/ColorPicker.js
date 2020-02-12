import React, { useState } from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Color from './components/Color';

const Label = styled.p`
  font-weight: bold;
`;

const ColorPicker = ({ colorList, onActiveCallback }) => {
  const [active, setActive] = useState();

  const onActive = (color) => {
    setActive(color);
    onActiveCallback(color);
  };

  const colorSet = [...new Set(colorList)];

  return (
    <div>
      {colorSet.length > 0 && <Label>Select a color:</Label>}
      <div data-testid="color-list">
        {colorSet.map((color) => (
          <Color
            key={color}
            bgColor={color}
            isActive={color === active}
            onActive={onActive}
          />
        ))}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  /** Available color list */
  colorList: t.arrayOf(t.string).isRequired,
  /** onClick callback */
  onActiveCallback: t.func,
};

ColorPicker.defaultProps = {
  onActiveCallback: Function.prototype,
};

export default ColorPicker;

import React, { useState } from 'react';
import t from 'prop-types';
import { Color } from './components/Color';

const ColorPicker = ({ colorList, onActiveCallback }) => {
  const [active, setActive] = useState();

  const onActive = (color) => {
    setActive(color);
    onActiveCallback(color);
  };

  const colorSet = [...new Set(colorList)];

  return (
    <div>
      {colorSet && colorSet.length && (
        <p data-testid="color-paragraph">Select a color:</p>
      )}
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
  onActiveCallback: t.func,
};

ColorPicker.defaultProps = {
  onActiveCallback: (color) => console.log(color),
};

export default ColorPicker;

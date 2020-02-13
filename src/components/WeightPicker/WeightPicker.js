import React, { useState } from 'react';
import t from 'prop-types';
import { Line } from './components/Line';

const WeightPicker = ({ weightList, onActiveCallback }) => {
  const [active, setActive] = useState();

  const onActive = (weight) => {
    setActive(weight);
    onActiveCallback(weight);
  };

  const weightSet = [...new Set(weightList)];

  return (
    <div>
      {weightSet.length > 0 && (
        <p data-testid="weight-paragraph">
          <strong>Select a Weight:</strong>
        </p>
      )}
      <div data-testid="weight-list">
        {weightSet.map((weight) => (
          <Line
            key={weight}
            weight={weight}
            isActive={weight === active}
            onActive={onActive}
          />
        ))}
      </div>
    </div>
  );
};

WeightPicker.propTypes = {
  /** Available weight list */
  weightList: t.arrayOf(t.number).isRequired,
  onActiveCallback: t.func,
};

WeightPicker.defaultProps = {
  onActiveCallback: Function.prototype,
};

export default WeightPicker;

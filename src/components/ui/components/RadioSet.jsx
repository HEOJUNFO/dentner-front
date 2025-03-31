import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BaseInput } from '@components/common';

const RadioSet = ({ className = 'radioSet', items, groupName, valueName, titleName, checkValue, onChange }) => {
  // <input type="checkbox" id={id} checked={value} onChange={onChange} />
  // <label htmlFor={id}>{label}</label>

  return (
    <>
      {items.map((el, idx) => (
        <span key={`groupName_${groupName}_${el[valueName]}_${idx}`} className={el.className || className}>
          <BaseInput
            type="radio"
            id={`groupName_${groupName}_${el[valueName]}_${idx}`}
            name={groupName}
            value={el[valueName]}
            label={el[titleName]}
            checked={checkValue == el[valueName]}
            onChange={onChange}
          />
        </span>
      ))}
    </>
  );
};

// RadioSet.propTypes = {
//   id: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   label: PropTypes.node.isRequired,
//   value: PropTypes.bool.isRequired,
// };

RadioSet.defaultProps = {
  items: [],
  titleName: 'title',
  valueName: 'value',
};

export default RadioSet;

import React, { useState } from 'react';
import { BaseInput } from '@components/common';

const SortingStatus = ({ items, groupName, valueName = 'value', titleName = 'name', checkValue, onChange }) => {
  return (
    <div className="sorting sts">
      {items.map((el, idx) => {
        return (
          <span key={`status_${el[valueName]}_${idx}`}>
            <BaseInput type="radio" id={`status_${el[valueName]}_${idx}`} name={groupName} value={el[valueName]} label={el[titleName]} checked={checkValue == el[valueName]} onChange={onChange} />
          </span>
        );
      })}
    </div>
  );
};

export default SortingStatus;

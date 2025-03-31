import React, { useEffect, useState } from 'react';
import { RadioFilter } from '@components/ui';
import useFieldSelection from '../hooks/useFieldSelection';

const FieldSelection = ({ onChange, params }) => {
  const { codeParentNo, items } = useFieldSelection();


  return (
    <div>
      {codeParentNo.map((el, idx) => (
        <RadioFilter
          key={`FieldSelection_${idx}`}
          title={items[el.value].name}
          items={items[el.value].value}
          groupName={el.id}
          titleName={'codeName'}
          valueName={'codeNo'}
          checkValue={params[el.id]}
          onClick={(e) => {
            onChange(el.id, params[el.id] === e.target.value ? '' : e.target.value);
          }}
        />
      ))}
    </div>
  );
};

export default FieldSelection;

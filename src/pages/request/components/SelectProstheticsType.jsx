import React from 'react';
import { BaseInput, BaseSelect } from '@components/common';
import { useSelectProstheticsType } from '../hooks/useSelectProstheticsType';

const SelectProstheticsType = ({ checkValues = [], onChange }) => {
  const { code } = useSelectProstheticsType();

  return (
    <>
      <dd className="itemSelect">
        {code.map((el, idx) => {
          return (
            <span className="checkSet" key={`SelectProstheticsType_${idx}`}>
              <BaseInput
                type="checkbox"
                id={`checkbox_${el.teethTypeNo}_${idx}`}
                value={el.teethTypeNo.toString()}
                label={el.typeName}
                checked={checkValues.includes(el.teethTypeNo.toString())}
                onChange={onChange}
              />
            </span>
          );
        })}
      </dd>
      {/* 
      <dd className="itemMSelect">
          <BaseSelect items={way} placeholder={'크라운'} onChange={(e) => console.log(e)} />
          <input type="text" placeholder="보철종류 입력하세요" />
      </dd> 모바일 대응 : 개발 필요*/}
    </>
  );
};

export default SelectProstheticsType;

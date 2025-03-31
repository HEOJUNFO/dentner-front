import React, { useEffect, useState } from 'react';
import { BaseInput, BaseButton } from '@components/common';
import useProstheticsPrice from '../hooks/useProstheticsPrice';
import { useTranslation } from 'react-i18next';

const ProstheticsPrice = ({ code, onClick, maxCnt = 0, currCnt = 0 }) => {
  const { t, i18n } = useTranslation();
  const { params, selectedCode, isEnd, upperCode, handleUpperClick, middleCode, handleMiddleClick, handleChange, handleSubmit } = useProstheticsPrice();

  return (
    <div className="prostheticsType">
      {upperCode.map((ucode, idx) => (
        <div key={`${ucode.teethTypeNo}_${idx}`} className={`${selectedCode.upperCode.value === ucode.teethTypeNo ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleUpperClick(ucode)}>{ucode.typeName}</strong>

          <div className="itemData">
            <div>
              <ul>
                {middleCode.map((mcode, idxx) => (
                  <li key={`${mcode.teethTypeNo}_${idx}`} className={`noDeph ${selectedCode.middleCode.value === mcode.teethTypeNo ? 'on' : ''}`} onClick={(e) => handleMiddleClick(e, mcode)}>
                    <span>{mcode.typeName}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              <span className="left">
                {selectedCode.upperCode.name}
                {selectedCode.middleCode.name && !selectedCode.middleCode.edit && <>&gt; {selectedCode.middleCode.name}</>}
                {selectedCode.middleCode.edit && (
                  <>
                    &gt;{' '}
                    <BaseInput
                      type="text"
                      error={selectedCode.middleCode?.error}
                      placeholder={selectedCode.middleCode?.placeholder}
                      value={selectedCode.middleCode.name}
                      onChange={(e) => handleChange('middleCode', e.target.value)}
                      isError={false}
                    />
                  </>
                )}
              </span>
              {isEnd && (
                <span className="priceUnit">
                  <span className="unit">
                    <span>단가</span>
                    {/* <input type="text" defaultValue="0" /> */}
                    <BaseInput
                      type="text"
                      // placeholder={params.typeAmount.placeholder}
                      id="typeAmount"
                      value={params.typeAmount.value}
                      error={params.typeAmount.error}
                      maxLength={params.typeAmount.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                    <em>원</em>
                  </span>
                  <BaseButton label={t('version2_2.text16')} className="btnB" onClick={handleSubmit} />
                </span>
              )}
              {/* <BaseButton label={`추가하기 (${currCnt}/${maxCnt})`} className="btnB ss" onClick={handleAdd} /> */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProstheticsPrice;

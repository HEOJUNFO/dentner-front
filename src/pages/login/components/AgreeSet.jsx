import React, { useEffect, useRef, useState, useCallback } from 'react';
import Agree from './Agree';
import { useAgreeSet } from '../hooks/useClient';
import { useTranslation } from 'react-i18next';

const AgreeSet = ({ items = [], titleName = 'title', onChange }) => {
  const { onChangeRefs, checkedItems, handleCheck, handleAllCheck, allchecked } = useAgreeSet({ items, onChange });
  const { t } = useTranslation();

  return (
    <dl>
      <dt>
        {/* 약관동의 */}
        {t('version2_1.text56')}
        <sup>
          {/* 필수항목 */}
          {t('base.required')}
        </sup>
      </dt>
      <dd className="agreeSet">
        <span className="checkSet totalCase">
          <input type="checkbox" id="allcheckbox" checked={allchecked} onChange={handleAllCheck} />
          <label htmlFor="allcheckbox">
            {/* 모두 동의합니다. */}
            {t('version2_1.text57')}
          </label>
        </span>
        <ul>
          {items.map((el, idx) => {
            // onChange => items onChange 없는 경우 AgreeSet onChange 사용
            return (
              <Agree
                key={`Agree_${idx}`}
                title={el[titleName]}
                checked={checkedItems[idx]}
                {...el}
                onChange={(e) => {
                  if (el.onChange) {
                    el.onChange(el?.keyName, e);
                  } else {
                    onChange(el?.keyName, e);
                  }
                  handleCheck(e, idx);
                }}
                ref={(ref) => (onChangeRefs.current[idx] = ref?.onChange)} // ref에 핸들러 저장
              />
            );
          })}
        </ul>
      </dd>
    </dl>
  );
};

export default AgreeSet;

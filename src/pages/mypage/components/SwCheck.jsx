import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseButton, BaseInput } from '@components/common';
import useSwCheck from '../hooks/useSwCheck';

const SwCheck = ({ swNo, swEtc, onChange, onTextChange, onReset, swEtcDisabled }) => {
  const { t } = useTranslation();
  const { code } = useSwCheck();

  return (
    <dl>
      <dt>
        {t('base.prefer')} CAD S/W
        <sup>필수항목</sup>
      </dt>
      <dd>
        <ul>
          {code.map((el, idx) => {
            if (el.value?.length > 1) {
              const childValue = el.value.map((el) => el.codeNo);
              const checked = childValue.filter((v) => swNo.includes(v.toString())).length > 0 ? true : false;

              return (
                <li key={`SwCheck_${idx}`}>
                  <span className="checkSet">
                    <BaseInput type="checkbox" id={`Swcheck_${el.name}_${idx}`} value={childValue.join(',')} label={el.name} checked={checked} onChange={onReset} />
                  </span>
                  <div>
                    {el.value.map((ele, idxx) => {
                      return (
                        <span className="radioSet" key={`SwCheck_radioSet_${idx}_${idxx}`}>
                          <BaseInput
                            type="radio"
                            id={`Swcheck_${ele.codeNo}_${idxx}`}
                            name={el.name}
                            value={ele.codeNo}
                            label={ele.codeDesc}
                            checked={swNo.includes(ele.codeNo.toString())}
                            onChange={onChange}
                          />
                        </span>
                      );
                    })}
                  </div>
                </li>
              );
            }
            return (
              <li key={`SwCheck_${idx}`}>
                <span className="checkSet">
                  <BaseInput type="checkbox" id={`${el.value[0].codeNo}`} value={el.value[0].codeNo} label={el.name} checked={swNo.includes(el?.value[0]?.codeNo.toString())} onChange={onChange} />
                </span>
                {el.value[0].codeEditYn === 'Y' && <BaseInput type="text" placeholder={t('base.input_manually')} disabled={swEtcDisabled} value={swEtc} onChange={onTextChange} />}
              </li>
            );
          })}

          {/* <li>
            <span className="checkSet">
              <input type="checkbox" id="checkbox3" />
              <label htmlFor="checkbox3">기타</label>
            </span>
            <BaseInput type="text" placeholder="직접입력" />
          </li> */}
        </ul>
      </dd>
    </dl>
  );
};

export default SwCheck;

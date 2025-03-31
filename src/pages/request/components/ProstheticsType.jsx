import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BaseInput, BaseButton, BaseSelect } from '@components/common';
import { useProstheticsType } from '../hooks/useProstheticsType';
import { useTranslation } from 'react-i18next';

const DirectInput = forwardRef(({ onChange, value, maskingValue, error, disabled }, ref) => {
  const { t, i18n } = useTranslation();
  const parts = value?.split(/(\(.*?\))/); // 괄호로 묶인 부분을 찾음

  return (
    <React.Fragment>
      {parts.map((part, idx) =>
        // 괄호 안의 내용일 경우 DirectInput으로 대체
        /\(.*?\)/.test(part) ? (
          <BaseInput 
            ref={ref} 
            key={`part_${idx}`} 
            type="text" 
            placeholder={t('version2_4.text111')} 
            value={maskingValue} 
            onChange={onChange} 
            error={error} 
            isError={false} 
            maxLength={5} 
            disabled={disabled}
          />
        ) : (
          <>{idx === 0 ? '(' : ')'}</>
        )
      )}
    </React.Fragment>
  );
});

/**
 * @param {Object} props - The properties object.
 * @param {array} props.code - 보철코드.
 * @param {number} props.currCnt - 현재선택  개수.
 * @param {number} props.maxCnt - 최대선택 개수.
 * @param {function} props.onClick - 코드 선택 이벤트.
 * @returns {JSX.Element} 보철종류 컴포넌트.
 */
const ProstheticsType = ({ activeIndex, params, code, onClick, maxCnt = 0, currCnt = 0 , viewMode = false}) => {
  const { t } = useTranslation();
  const {
    init,
    selectedCode,
    upperCode,
    handleUpperClick,
    middleCode,
    handleMiddleClick,
    lowerCode,
    handleLowerClick,
    checkCode,
    handleChecked,
    handleChange,
    handleAdd,
    handleDirectInputChange,
    refCodeDirectInput,
    refLowerDirectInput,
    codeDirectInputError,
    lowerDirectInputError,
  } = useProstheticsType({
    code,
    onClick,
    maxCnt,
    currCnt,
    activeIndex,
    params,
  });

  // Create conditional click handlers that only work when not in viewMode
  const conditionalUpperClick = (ucode) => {
    if (!viewMode) handleUpperClick(ucode);
  };

  const conditionalMiddleClick = (e, mcode) => {
    if (!viewMode) handleMiddleClick(e, mcode);
  };

  const conditionalLowerClick = (e, lcode) => {
    if (!viewMode) handleLowerClick(e, lcode);
  };

  const conditionalChecked = (e, ccode) => {
    if (!viewMode) handleChecked(e, ccode);
  };

  const conditionalChange = (type, value) => {
    if (!viewMode) handleChange(type, value);
  };

  const conditionalDirectInputChange = (e, idx, parts, type) => {
    if (!viewMode) handleDirectInputChange(e, idx, parts, type);
  };

  return (
    <>
      <div className="prostheticsType">
        {upperCode.map((ucode, idx) => (
          <div key={`${ucode.teethTypeNo}_${idx}`} className={`${selectedCode.upperCode.value === ucode.teethTypeNo ? 'listItem on' : 'listItem'}`}>
            <strong 
              onClick={() => conditionalUpperClick(ucode)}
              style={viewMode ? { cursor: 'default' } : {}}
            >
              {ucode.typeName}
            </strong>

            <div className="itemData">
              <div>
                <ul>
                  {middleCode.map((mcode, idxx) => (
                    <li
                      key={`${mcode.teethTypeNo}_${idx}`}
                      className={`${mcode.childCnt === 0 ? 'noDeph' : ''} ${selectedCode.middleCode.value === mcode.teethTypeNo ? 'on' : ''}`}
                      onClick={(e) => conditionalMiddleClick(e, mcode)}
                      style={viewMode ? { cursor: 'default' } : {}}
                    >
                      <span>{mcode.typeName}</span>
                    </li>
                  ))}
                </ul>
                <ol className={`${selectedCode.middleCode.value === '' && middleCode.length > 0 ? 'precCategory' : ''}`}>
                  {selectedCode.middleCode.value === '' && middleCode.length > 0 && <li>{t('version2_2.text87')}</li>}
                  {lowerCode.map((lcode, idxx) => (
                    <li
                      key={`${lcode.teethTypeNo}_${idx}`}
                      className={`${lcode.childCnt === 0 ? 'noDeph' : ''} ${selectedCode.lowerCode.value === lcode.teethTypeNo ? 'on' : ''}`}
                      onClick={(e) => conditionalLowerClick(e, lcode)}
                      style={viewMode ? { cursor: 'default' } : {}}
                    >
                      <span>{lcode.typeName}</span>
                    </li>
                  ))}
                </ol>
                {/* DEPTH_3 */}
                <ol className={`${selectedCode.lowerCode.value === '' && lowerCode.length > 0 ? 'precCategory noDeph' : 'noDeph'}`} onClick={(e) => e.stopPropagation()}>
                  {selectedCode.lowerCode.value === '' && lowerCode.length > 0 && <li>{t('version2_2.text87')}</li>}
                  {checkCode.map((ccode, idxx) => {
                    return (
                      <li
                        key={`${ccode.teethTypeNo}_${idx}`}
                        onClickCapture={(e) => {
                          // Empty handler kept for compatibility
                        }}
                      >
                        <span className="checkSet">
                          <BaseInput
                            type="checkbox"
                            id={`checkbox_${ccode.teethTypeNo}`}
                            name={`checkbox_${ccode.teethTypeNo}`}
                            value={ccode.teethTypeNo}
                            label={ccode.typeName}
                            checked={selectedCode.code.value.includes(ccode.teethTypeNo)}
                            onClick={(e) => conditionalChecked(e, ccode)}
                            disabled={viewMode}
                          />
                        </span>
                      </li>
                    );
                  })}
                </ol>
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
                        onChange={(e) => conditionalChange('middleCode', e.target.value)}
                        maxLength={8}
                        isError={false}
                        disabled={viewMode}
                      />
                    </>
                  )}
                  {selectedCode.lowerCode.name && !selectedCode.lowerCode.edit && <> &gt; {selectedCode.lowerCode.name}</>}
                  {selectedCode.lowerCode.edit && (
                    <>
                      &gt;{' '}
                      {(() => {
                        if ([90, 88].includes(selectedCode.lowerCode.value)) {
                          // 괄호로 묶인 부분을 찾음
                          const parts = selectedCode.lowerCode.placeholder.split(/(\(.*?\))/);

                          return parts.map((part, i) =>
                            /\(.*?\)/.test(part) ? (
                              <DirectInput
                                ref={refLowerDirectInput}
                                error={lowerDirectInputError}
                                maskingValue={selectedCode.lowerCode.direct || ''}
                                value={part}
                                onChange={(e) => conditionalDirectInputChange(e, idx, parts[0], 'lowerCode')}
                                disabled={viewMode}
                              />
                            ) : (
                              <>{part}</>
                            )
                          );
                        } else {
                          return (
                            <BaseInput
                              type="text"
                              error={selectedCode.lowerCode?.error}
                              placeholder={selectedCode.lowerCode?.placeholder}
                              value={selectedCode.lowerCode.name}
                              onChange={(e) => conditionalChange('lowerCode', e.target.value)}
                              maxLength={8}
                              isError={false}
                              disabled={viewMode}
                            />
                          );
                        }
                      })()}
                    </>
                  )}
                  {selectedCode.code.name.length > 0 && !selectedCode.code.edit?.includes('Y') && <>&gt; {selectedCode.code.name.join(' / ')}</>}
                  {selectedCode.code.name.length > 0 && selectedCode.code.edit?.includes('Y') && (
                    <>
                      &gt;{' '}
                      {selectedCode.code.name.map((n, idx) => {
                        const parts = n.split(/(\(.*?\))/);

                        return (
                          <React.Fragment key={`selectedCode.code.name_${idx}`}>
                            {parts.map((part, i) =>
                              // 괄호 안의 내용일 경우 DirectInput으로 대체
                              /\(.*?\)/.test(part) ? (
                                <DirectInput
                                  ref={refCodeDirectInput}
                                  maskingValue={selectedCode.code?.direct || ''}
                                  value={part}
                                  error={codeDirectInputError}
                                  onChange={(e) => conditionalDirectInputChange(e, idx, parts[0])}
                                  disabled={viewMode}
                                />
                              ) : (
                                <>{part}</>
                              )
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  )}
                </span>
                {!viewMode && <BaseButton label={`${t('version2_2.text88')} (${currCnt}/${maxCnt})`} className="btnB ss" onClick={handleAdd} />}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="prostheticsMType">
        <BaseSelect
          items={upperCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text112')}
          disabled={upperCode?.length <= 0 || viewMode}
          init={init}
          onChange={(e) => !viewMode && handleUpperClick(e)}
        />
        <BaseSelect
          items={middleCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text113')}
          disabled={middleCode?.length <= 0 || viewMode}
          init={init}
          onChange={(e) => !viewMode && handleMiddleClick(undefined, e)}
          input={true}
          inputValue={selectedCode.middleCode.name}
          valueChange={(e) => !viewMode && handleChange('middleCode', e.target.value)}
        />
        <BaseSelect
          items={lowerCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text114')}
          disabled={lowerCode?.length <= 0 || viewMode}
          init={init}
          onChange={(e) => !viewMode && handleLowerClick(undefined, e)}
          input={true}
          inputValue={selectedCode.lowerCode.name}
          valueChange={(e) => !viewMode && handleChange('lowerCode', e.target.value)}
        />
        <BaseSelect
          items={checkCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text115')}
          disabled={checkCode?.length <= 0 || viewMode}
          init={init}
          onChange={(e) => !viewMode && handleChecked(undefined, e)}
        />
      </div>
    </>
  );
};

export default ProstheticsType;
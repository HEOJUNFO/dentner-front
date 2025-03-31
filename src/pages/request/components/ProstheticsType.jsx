import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BaseInput, BaseButton, BaseSelect } from '@components/common';
import { useProstheticsType } from '../hooks/useProstheticsType';
import { useTranslation } from 'react-i18next';

const DirectInput = forwardRef(({ onChange, value, maskingValue, error }, ref) => {
  const { t, i18n } = useTranslation();
  const parts = value?.split(/(\(.*?\))/); // 괄호로 묶인 부분을 찾음
  // useImperativeHandle(ref, () => ({
  //   setError(newError) {
  //     setInternalError(newError);
  //   },
  //   focus() {
  //     inputRef.current.focus();
  //   },
  // }));
  return (
    <React.Fragment>
      {parts.map((part, idx) =>
        // 괄호 안의 내용일 경우 DirectInput으로 대체
        /\(.*?\)/.test(part) ? (
          <BaseInput ref={ref} key={`part_${idx}`} type="text" placeholder={t('version2_4.text111')} value={maskingValue} onChange={onChange} error={error} isError={false} maxLength={5} />
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

  return (
    <>
      <div className="prostheticsType">
        {upperCode.map((ucode, idx) => (
          <div key={`${ucode.teethTypeNo}_${idx}`} className={`${selectedCode.upperCode.value === ucode.teethTypeNo ? 'listItem on' : 'listItem'}`}>
            <strong onClick={() => handleUpperClick(ucode)}>{ucode.typeName}</strong>

            <div className="itemData">
              <div>
                <ul>
                  {middleCode.map((mcode, idxx) => (
                    <li
                      key={`${mcode.teethTypeNo}_${idx}`}
                      className={`${mcode.childCnt === 0 ? 'noDeph' : ''} ${selectedCode.middleCode.value === mcode.teethTypeNo ? 'on' : ''}`}
                      onClick={(e) => handleMiddleClick(e, mcode)}
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
                      onClick={(e) => handleLowerClick(e, lcode)}
                    >
                      <span>{lcode.typeName}</span>
                    </li>
                  ))}
                </ol>
                {/* DEPTH_3 */}
                <ol className={`${selectedCode.lowerCode.value === '' && lowerCode.length > 0 ? 'precCategory noDeph' : 'noDeph'}`} onClick={(e) => e.stopPropagation()}>
                  {selectedCode.lowerCode.value === '' && lowerCode.length > 0 && <li>{t('version2_2.text87')}</li>}
                  {checkCode.map((ccode, idxx) => {
                    // console.log(ccode)
                    return (
                      // <>
                      //   {
                      //     selectedCode.lowerCode.value === 91 ?
                      //       <li
                      //         key={`${ccode.teethTypeNo}_${idx}`}
                      //         className={`${selectedCode.code.value.includes(ccode.teethTypeNo) ? 'on' : ''}`}
                      //         onClick={(e) => handleChecked(e, ccode)}
                      //       >
                      //         <span >
                      //           {ccode.typeName}
                      //         </span>
                      //       </li>
                      //       :
                      //       <li
                      //         key={`${ccode.teethTypeNo}_${idx}`}
                      //         onClickCapture={(e) => {
                      //           // e.preventDefault();
                      //           // e.stopPropagation();
                      //           // handleChecked(e, ccode);
                      //         }}
                      //       >
                      //         <span className="checkSet">
                      //           <BaseInput
                      //             type="checkbox"
                      //             id={`checkbox_${ccode.teethTypeNo}`}
                      //             name={`checkbox_${ccode.teethTypeNo}`}
                      //             value={ccode.teethTypeNo}
                      //             label={ccode.typeName}
                      //             checked={selectedCode.code.value.includes(ccode.teethTypeNo)}
                      //             onClick={(e) => handleChecked(e, ccode)}
                      //           // onChange={handleChecked}
                      //           />
                      //         </span>
                      //       </li>
                      //   }
                      // </>
                      <li
                        key={`${ccode.teethTypeNo}_${idx}`}
                        onClickCapture={(e) => {
                          // e.preventDefault();
                          // e.stopPropagation();
                          // handleChecked(e, ccode);
                        }}
                      >
                        <span className="checkSet">
                          <BaseInput
                            type="checkbox"
                            id={`checkbox_${ccode.teethTypeNo}`}
                            name={`checkbox_${ccode.teethTypeNo}`}
                            value={ccode.teethTypeNo}
                            // label={(ccode.typeEditYn === 'Y' && selectedCode.code.value.includes(ccode.teethTypeNo)) ?
                            //   <BaseInput type={`text`} placeholder={ccode.typeName} value={selectedCode.code.name[0]} onChange={(e) => handleChange('code', e.target.value)} />
                            //   : ccode.typeName}
                            label={ccode.typeName}
                            checked={selectedCode.code.value.includes(ccode.teethTypeNo)}
                            onClick={(e) => handleChecked(e, ccode)}
                            // onChange={handleChecked}
                          />
                        </span>
                        {}
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
                        onChange={(e) => handleChange('middleCode', e.target.value)}
                        maxLength={8}
                        isError={false}
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
                                onChange={(e) => handleDirectInputChange(e, idx, parts[0], 'lowerCode')}
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
                              onChange={(e) => handleChange('lowerCode', e.target.value)}
                              maxLength={8}
                              isError={false}
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
                                  onChange={(e) => handleDirectInputChange(e, idx, parts[0])}
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
                {!viewMode &&  <BaseButton label={`${t('version2_2.text88')} (${currCnt}/${maxCnt})`} className="btnB ss" onClick={handleAdd} />}
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
          disabled={upperCode?.length <= 0}
          init={init}
          onChange={(e) => handleUpperClick(e)}
        />
        <BaseSelect
          items={middleCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text113')}
          disabled={middleCode?.length <= 0}
          init={init}
          onChange={(e) => handleMiddleClick(undefined, e)}
          input={true}
          inputValue={selectedCode.middleCode.name}
          valueChange={(e) => handleChange('middleCode', e.target.value)}
        />
        <BaseSelect
          items={lowerCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text114')}
          disabled={lowerCode?.length <= 0}
          init={init}
          onChange={(e) => handleLowerClick(undefined, e)}
          input={true}
          inputValue={selectedCode.lowerCode.name}
          valueChange={(e) => handleChange('lowerCode', e.target.value)}
        />
        <BaseSelect
          items={checkCode}
          titleName={'typeName'}
          valueName={'teethTypeNo'}
          placeholder={t('version2_4.text115')}
          disabled={checkCode?.length <= 0}
          init={init}
          onChange={(e) => handleChecked(undefined, e)}
        />
      </div>
    </>
  );
};

export default ProstheticsType;

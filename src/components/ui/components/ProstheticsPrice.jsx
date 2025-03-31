import React, { useEffect, useState } from 'react';
import {BaseInput, BaseButton, BaseSelect, ModalPresent} from '@components/common';
import { withCommas } from '@utils/common';
import useProstheticsPrice from '../../hooks/useProstheticsPrice';
import { useTranslation } from 'react-i18next';
import ItemTypeModal from "@modal/ItemTypeModal.jsx";
import AmountAlert from "@modal/AmountAlert.jsx";

const ProstheticsPrice = ({ type = 'view', typeList = [], isDollar }) => {
  const { t } = useTranslation();
  const { handleRefetch, modal, setModal, addAmountParams, setAddAmountParams, params, selectedCode, isEnd, upperCode, handleUpperClick, middleCode, handleMiddleClick, handleChange, handleSubmit } = useProstheticsPrice();

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
                    <li key={`${mcode.teethTypeNo}_${idx}`} className={`noDeph ${selectedCode.middleCode.value === mcode.teethTypeNo ? 'on' : ''}`} onClick={(e) => handleMiddleClick(e, mcode)}>
                      <span>{mcode.typeName}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                {type === 'view' && (
                  <span className="left">
                    {selectedCode.upperCode.name}
                    {selectedCode.middleCode.name && !selectedCode.middleCode.edit && <>&gt; {selectedCode.middleCode.name}</>}
                    <span>
                      {typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value) && (
                        <>
                          <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAmount)}</em> <>원</>
                          <> / </>
                          <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeDollarAmount)}</em> <>달러</>

                            {/*{*/}
                            {/*    typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddAmount &&*/}
                            {/*    <>*/}
                            {/*        <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddAmount)}</em> <>원</>*/}
                            {/*    </>*/}
                            {/*}*/}
                            {/*<> / </>*/}
                            {/*{*/}
                            {/*    typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddDollarAmount &&*/}
                            {/*    <>*/}
                            {/*        <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddDollarAmount)}</em> <>달러</>*/}
                            {/*    </>*/}
                            {/*}*/}


                        </>
                      )}
                    </span>

                      <span>
                      {typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value) && (
                          <>
                              {
                                  typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddAmount &&
                                  <>
                                      <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddAmount)}</em> <>원</>
                                  </>
                              }
                              <> / </>
                              {
                                  typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddDollarAmount &&
                                  <>
                                      <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAddDollarAmount)}</em> <>달러</>
                                  </>
                              }
                          </>
                      )}
                    </span>
                  </span>
                )}

                {type === 'write' && (
                  <>
                    <span className="left">
                      {selectedCode.upperCode.name}
                      {selectedCode.middleCode.name && <>&gt; {selectedCode.middleCode.name}</>}
                    </span>
                    {isEnd && (
                      <span className={isDollar ? "priceUnit dollar" : "priceUnit"} style={{width: 350}}>

                        <span className="unit">
                          <span>{t('version2_2.text90')}</span>
                          {/* <input type="text" defaultValue="0" /> */}
                          <BaseInput
                            type="text"
                            // placeholder={params.typeAmount.placeholder}
                            id={isDollar ? "typeDollarAmount" : "typeAmount"}
                            value={isDollar ? params.typeDollarAmount.value : params.typeAmount.value}
                            error={isDollar ? params.typeDollarAmount.error : params.typeAmount.error}
                            isError={false}
                            maxLength={isDollar ? params.typeDollarAmount.maxLength : params.typeAmount.maxLength}
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
                          />
                          <em>{isDollar ? t('version2_3.text39') : t('base.won')}</em>
                        </span>
                        <BaseButton label={t('version2_2.text16')} className="btnB" onClick={()=>handleSubmit(isDollar ? "typeDollarAmount" : "typeAmount")} />
                          {
                              (selectedCode?.middleCode?.baseCnt && Number(selectedCode?.middleCode?.baseCnt) > 0) ?
                              <BaseButton  label={t('추가금')} className="btnB" onClick={()=> {
                                  console.log(params)
                                  setAddAmountParams(params)
                              }} />
                                  : <></>
                          }
                      </span>
                    )}
                  </>
                )}
                {/* <BaseButton label={`추가하기 (${currCnt}/${maxCnt})`} className="btnB ss" onClick={handleAdd} /> */}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="prostheticsMType">
        <BaseSelect items={upperCode} titleName={'typeName'} valueName={'teethTypeNo'} placeholder={t('version2_4.text112')} onChange={(e) => handleUpperClick(e)} />
        <BaseSelect items={middleCode} titleName={'typeName'} valueName={'teethTypeNo'} placeholder={t('version2_4.text113')} onChange={(e) => handleMiddleClick(undefined, e)}/>
        {selectedCode.upperCode.name &&
        <>
        <div className='priceBox'>
          <div>
            <span>
                {selectedCode.upperCode.name}
                {selectedCode.middleCode.name && !selectedCode.middleCode.edit && <>&gt; {selectedCode.middleCode.name}</>}
            </span>
            <strong className='right'>
                <span>
                  {typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value) && (
                    <>
                      <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeAmount)}</em> <>원</>
                      <> / </>
                      <em>{withCommas(typeList.find((el) => el.memberMiddleValue === selectedCode.middleCode.value)?.typeDollarAmount)}</em> <>달러</>
                    </>
                  )}
                </span>
            </strong>
          </div>
        </div>
        </>
        }
        {type === 'write' && (
          <>
            {isEnd && (
              <span className={isDollar ? "priceUnit dollar" : "priceUnit"} style={{gap: 10}}>
                <span className="unit">
                  <span>{t('version2_2.text90')}</span>
                  {/* <input type="text" defaultValue="0" /> */}
                  <BaseInput
                    type="text"
                    // placeholder={params.typeAmount.placeholder}
                    id={isDollar ? "typeDollarAmount" : "typeAmount"}
                    value={isDollar ? params.typeDollarAmount.value : params.typeAmount.value}
                    error={isDollar ? params.typeDollarAmount.error : params.typeAmount.error}
                    isError={false}
                    maxLength={isDollar ? params.typeDollarAmount.maxLength : params.typeAmount.maxLength}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                  <em>{isDollar ? t('version2_3.text39') : t('base.won')}</em>
                </span>
                <BaseButton
                    /* style={{
                      width: 50,
                      height: 50,
                      color: '#FFFFFF',
                      backgroundColor: '#4b72fe',
                    }} */
                    label={t('version2_2.text16')}
                    className={'btnB ss'}
                    onClick={() => handleSubmit(isDollar ? "typeDollarAmount" : "typeAmount")}
                  />
              </span>
            )}
          </>
        )}
      </div>

        {modal && (
            <ModalPresent>
                <AmountAlert
                    selectedCode={selectedCode}
                    params={addAmountParams}
                    isDollar={isDollar}
                   // request={request}
                   // prosthetics={prosthetics}
                    onClose={() => {
                        setAddAmountParams(null)
                    }}
                    onRefetch={() => {
                        setAddAmountParams(null)
                        handleRefetch();
                    }}
                />
            </ModalPresent>
        )}
    </>  
  );
};

export default ProstheticsPrice;

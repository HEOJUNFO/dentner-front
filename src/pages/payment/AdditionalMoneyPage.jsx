import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, BaseTextArea } from '@components/common';
import { FileUpload, CADFileUpload, RadioSet } from '@components/ui';
import { DragDropImage } from '@components/common';
import useAdditionalMoneyPage from './hooks/useAdditionalMoneyPage';
import { useTranslation } from 'react-i18next';

/**
 * path: /payment/charges/:id
 * 추가금 수정
 * @returns
 */
const AdditionalMoneyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, rework, items, params, handleChange, files, setFiles, delFiles, setDelFiles, handleSubmit, requestPaySe, requestPayUnit } = useAdditionalMoneyPage();

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{rework && '재제작'} {`${t('version2_2.text91')}${t('version2_2.text2')}`}</h2>
        <div className="writeBox">
          <div className="tws">
            <div className="detail">
              <dl>
                <dt style={{ paddingBottom: 0 }}>
                  {t('version2_2.text91')}
                  <sup>필수항목</sup>
                </dt>
                <dd className="addPayArea">
                  {/* <div>
                      <RadioSet items={requestPaySe} groupName={'requestPaySe'} checkValue={params.requestPaySe.value} onChange={(e) => handleChange('requestPaySe', e.target.value)} />
                    </div> */}
                  <div className="addPaySet">
                    <span className="moneyChoice">
                      <RadioSet items={requestPayUnit} groupName={'requestPayUnit'} checkValue={params.requestPayUnit.value} onChange={(e) => handleChange('requestPayUnit', e.target.value)} />
                    </span>
                    <span className="unit">
                      <BaseInput
                        type="text"
                        id="requestPayAmount"
                        placeholder={params.requestPayAmount.placeholder}
                        value={params.requestPayAmount.value}
                        error={params.requestPayAmount.error}
                        isError={false}
                        maxLength={params.requestPayAmount.maxLength}
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                          handleChange(e.target.id, e.target.value);
                        }}
                      />
                      <em>P(￦)</em>
                    </span>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('transaction.add_reason')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseTextArea
                    id="requestPayCn"
                    error={params.requestPayCn.error}
                    //isError={false}
                    value={params.requestPayCn.value}
                    placeholder={params.requestPayCn.placeholder}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </dd>
              </dl>
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_2.text35')}
                    <sup>필수항목</sup>
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/10)
                  </em>
                </dt>
                <dd>
                  <FileUpload fileList={files} setFileList={setFiles} delFileList={delFiles} setDelFileList={setDelFiles} />
                </dd>
              </dl>
            </div>
            <div className="btnArea">
              <BaseButton label={`${t('version2_2.text91')}${t('base.mutate')}`} className={'btnB'} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdditionalMoneyPage;

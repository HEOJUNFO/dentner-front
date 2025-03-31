import React from 'react';

import { BaseButton, BaseInput, BaseTextArea } from '@components/common';
import { CADFileUpload, FileUpload, RadioSet, RequestMiniInfo } from '@components/ui';

import { Link, useNavigate } from 'react-router-dom';
import useCADUploadPage from './hooks/useCADUploadPage';
import { useTranslation } from 'react-i18next';
/**
 * path: /payment/reqeust/{requestFormNo}/cad
 * CAD 파일 업로드
 * @returns
 */
const CADUploadPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, isRework, isClick, items, params, handleChange, handleCADFileUpload, handleSubmit, cadFiles, docFiles, setDocFiles, requestPaySe, requestPayUnit } = useCADUploadPage();

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            {t('base.back')}
          </Link>
        </div>
        <h2>{t('version2_2.text97')}</h2>
        <div className="writeBox">
          <div className="tws">
            <h3 className="pt0">{t('version2_1.text27')}</h3>
            <div className="cadDownload">
              <ul>
                {items.map((item, idx) => {
                  return (
                    <li key={`CADUploadItem_${idx}`}>
                      <RequestMiniInfo type={1} sw={item.requestDocName} reqTitle={item.requestNumber} reqDesc={item.requestDocDesc} registerDt={item.registerDt} reqNo={item.requestDocgroupNo} />
                      <CADFileUpload
                        index={idx}
                        fileTypes={['pdf', 'jpg', 'png', 'zip', 'stl', 'obj', 'ply', 'dcm']}
                        fileList={cadFiles[idx] || []}
                        maxSize={500}
                        setFileList={(files) => handleCADFileUpload(idx, files)}
                        label={
                          <>
                            <span>
                              <span>{t('version2_2.text99')}</span> {t('version2_2.text98')}
                            </span>{' '}
                            <em>{`(zip${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}</em>
                          </>
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <h3>
              {isRework && <>{t('transaction.remake')}</>} {`${t('version2_2.text91')} ${t('version2_2.text100')}`}
            </h3>
            <div className="detail">
              <dl>
                <dt>
                  {isRework && <>{t('transaction.remake')}</>} {t('version2_2.text91')}
                  <sup>필수항목</sup>
                </dt>
                <dd className="addPayArea">
                  <div>
                    <RadioSet items={requestPaySe} groupName={'requestPaySe'} checkValue={params.requestPaySe.value} onChange={(e) => handleChange('requestPaySe', e.target.value)} />
                  </div>
                  {params.requestPaySe.value === 'Y' && (
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
                        {params.requestPayUnit.value === 'A' && <em>P(￦)</em>}
                        {params.requestPayUnit.value === 'B' && <em>P($)</em>}
                      </span>
                    </div>
                  )}
                </dd>
              </dl>
              {params.requestPaySe.value === 'Y' && (
                <>
                  <dl>
                    <dt>
                      {t('transaction.add_reason')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      {/* <textarea placeholder="추가금 요청사유를 작성해주세요 (최대 300자)"></textarea> */}
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
                        (<strong>{docFiles.length}</strong>/10)
                      </em>
                    </dt>
                    <dd>
                      <FileUpload fileList={docFiles} setFileList={setDocFiles} />
                    </dd>
                  </dl>
                </>
              )}
            </div>

            {isClick && (
              <div className="btnArea">
                <BaseButton label={t('version2_2.text101')} className={'btnB'} onClick={handleSubmit} />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CADUploadPage;

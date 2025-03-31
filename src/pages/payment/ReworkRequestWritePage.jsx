import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseButton, BaseTextArea, BaseSelect } from '@components/common';
import { RadioSet, FileUpload } from '@components/ui';
import useReworkRequestWritePage from './hooks/useReworkRequestWritePage';
import { useTranslation } from 'react-i18next';

/**
 * 재제작 요청 화면
 * path: /payment/reqeust/rework/{}
 * @returns
 */
const ReworkRequestWritePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, code, params, files, setFiles, isValid, handleChange, handleSumbit } = useReworkRequestWritePage();

  if (isLoading) return <></>;
  if (error) return <>{error}</>;
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{t('transaction.request_remake')}</h2>
        <div className="writeBox withInfo">
          <div className="tws">
            <form>
              <div className="infoNotes">
                <dl>
                  <dt>{t('version2_2.text134')}</dt>
                  <dd>
                    <span>{`▪️ [${t('version2_2.text135')}] :`} </span>
                    {t('version2_2.text137')}
                    <br />
                    <span>{`▪️ [${t('version2_2.text136')}] :`} </span>
                    {t('version2_2.text138')}
                  </dd>
                </dl>
              </div>
              <div className="detail mt40">
                <dl>
                  <dt>
                    {t('transaction.remake_reason')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="addWhySelect">
                    <RadioSet
                      items={code}
                      groupName={'remakingSe'}
                      valueName={'codeNo'}
                      titleName={'codeName'}
                      checkValue={params.remakingSe.value}
                      onChange={(e) => handleChange('remakingSe', e.target.value, 1)}
                    />
                  </dd>
                  <dd className="addWhySelect mCase">
                    <BaseSelect items={code} titleName={'codeName'} valueName={'codeNo'} placeholder={t('version2_2.text139')} onChange={(e) => handleChange('remakingSe', e?.codeNo, 1)} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('version2_2.text140')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    {/* <textarea placeholder="요청/수정사항을 작성해주세요. (최대 300자)"></textarea> */}
                    <BaseTextArea
                      id="remakingDc"
                      error={params.remakingDc.error}
                      isError={false}
                      value={params.remakingDc.value}
                      placeholder={params.remakingDc.placeholder}
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
                    <FileUpload
                      guide={
                        <em className="guide">
                          {`[${t('version2_2.text42')}]`} <i>jpg, png, zip </i>
                          <span>{`| zip${t('version2_2.text36')} (500MB ${t('version2_2.text37')})`}</span>
                        </em>
                      }
                      label={
                        <label className='inq' style={{ fontWeight: '600', color: '#4B72FE' }}>
                          {t('version2_1.text27')} <span style={{ fontWeight: '400', color: '#4B72FE' }}>{`(zip${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}</span>
                        </label>
                      }
                      fileList={files}
                      setFileList={setFiles}
                      isMust={true}
                      fileTypes={['pdf', 'jpg', 'png', 'zip']}
                    />
                  </dd>
                </dl>
              </div>
              <div className="btnArea">
                <BaseButton label={t('version2_2.text141')} className={'btnB'} disabled={!isValid} onClick={handleSumbit} />
                {/* <Link to="/reRequestView" className="btnB">
                  재제작 요청하기
                </Link> */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReworkRequestWritePage;

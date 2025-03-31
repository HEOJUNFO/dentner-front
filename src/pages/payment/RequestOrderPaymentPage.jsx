import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ItemTag, BaseButton, BaseTextArea, ModalPresent, ModalAlertPresent } from '@components/common';
import { CheckSet, PayModal, PayFailAlert } from '@components/ui';

import useRequestOrderPaymentPage from './hooks/useRequestOrderPaymentPage';
import Invoice from './components/Invoice';
import { useTranslation } from 'react-i18next';

/**
 * path: /payment/reqeust/{}
 * 의뢰서 결제
 * @returns
 */
const RequestOrderPaymentPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, data, params, isActive, handleNav, isModal, setIsModal, isModal2, setIsModal2, handleChange, handleCheck, handleValid, handleSubmit, id } = useRequestOrderPaymentPage();

  if (isLoading) return <></>;

  // console.log(params)

  const { title, desc, sw, registerDt, typeList, estimateAmount } = data;
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{t('status.request_payment')}</h2>
        <div className="viewBox subView line">
          <div className="tvs">
            <article>
              <div className="detail">
                <h4 className="noLine">
                  <strong>
                  {t('base.request')} <strong>{`(${t('version2_2.text119')})`}</strong>
                  </strong>
                </h4>
                {/* <textarea defaultValue={'치자이너에게 요청할 사항을 작성해주세요. (최대 200자)'}></textarea> */}
                <BaseTextArea
                  style={{minHeight: 418}}
                  readOnly={!isActive}
                  id="requestFormPayDc"
                  error={params.requestFormPayDc.error}
                  value={params.requestFormPayDc.value}
                  placeholder={params.requestFormPayDc.placeholder}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                  maxLength={params.requestFormPayDc.maxLength}
                />
              </div>

              <h3 className="pt60 lineCase">{t('version2_2.text115')}</h3>
              <div className="detail reQMinInfo">
                <div className="left">
                  <ItemTag items={sw} className="itemTag" />
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
                <div className="right">
                  <strong className="time">
                    {registerDt.split(' ')[0]} <strong>{registerDt.split(' ')[1].substring(0, 5)}</strong>
                  </strong>
                  <Link className="bMR enCase" to={`/request/view/${id}`}>
                    <span>
                      <em>{t('version2_2.text52')}</em> {t('version2_2.text53')}
                    </span>
                  </Link>
                </div>
              </div>

              <Invoice items={typeList} amount={estimateAmount} />

              <div className="infoNotes">
                <dl>
                  <dt>{t('version2_2.text120')}</dt>
                  <dd>
                    {t('version2_2.text121')} <br />
                    {t('version2_2.text122')} <br />
                    &nbsp;&nbsp;&nbsp;{t('version2_2.text123')} <br />{t('version2_2.text124')}
                  </dd>
                </dl>
                {isActive && (
                  <CheckSet
                    id={'isConfirm'}
                    onChange={handleCheck}
                    value={params.isConfirm.value}
                    label={
                      <>
                        <sup>필수항목</sup> {t('version2_2.text125')}
                      </>
                    }
                  />
                )}
              </div>
              {isActive && (
                <div className="btnArea pb0">
                  <BaseButton label={t('version2_2.text126')} className={'btnB'} onClick={handleSubmit} />
                  {/* disabled={!params.isConfirm.value} */}
                  {/* <BaseButton label={'결제하기'} className={'btnB'} onClick={() => setIsModal(true)} /> */}
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {isModal && (
        <ModalPresent>
          <PayModal
            left={estimateAmount}
            onSubmit={() => handleNav('/payment')}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal2 && (
        <ModalAlertPresent>
          <PayFailAlert
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default RequestOrderPaymentPage;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, BaseButton, BaseTextArea, BaseDatePicker } from '@components/common';
import { RequestTimePicker } from '@components/ui';
import { withCommas, strToLength } from '@utils/common';
import { useRequestEstimatedPage } from './hooks/useRequestEstimatedPage';
import RequestEstimate from './components/RequestEstimate';
import { useTranslation } from 'react-i18next';

/**
 * path: /request/estimated
 * 견적서 작성 페이지
 * @returns
 */
const RequestEstimatedPage = () => {
  const { t } = useTranslation();
  const { isLoading, params, data, handleAmountChange, handleChange, handleSubmit, id } = useRequestEstimatedPage();

  if (isLoading) return <></>;

  const { title, desc, sw, registerDt } = data;
  return (
    <>
      <section>
        <h2>
          <strong>{t('service_page.term_quote_form')}</strong> {t('request_target.write')}
        </h2>
        <div className="writeBox estimateWrite">
          <div className="tvs">
            <article>
              <h3>{t('version2_2.text51')}</h3>
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
            </article>
          </div>
          <div className="tws">
            <form>
              <div className="detail">
                <dl>
                  <dt>
                    {t('version2_2.text54')}{' '}
                    <strong>
                      {t('version2_2.text55')}
                      <sup>필수항목</sup>
                    </strong>
                  </dt>
                  <dd>
                    <div className="itemList">
                      <ul>
                        {params.typeList.value.map((item, idx) => (
                          <RequestEstimate key={`RequestEstimate__${idx}`} {...item} index={idx} onChange={handleAmountChange} />
                        ))}
                      </ul>
                    </div>
                    <div className="priceSet">
                      <span>{t('version2_2.text56')}</span>
                      <strong className="right">
                        <em>{withCommas(params.estimateAmount.value)}</em> <strong>{data?.typeUnit === 'B' ? 'P($)' : 'P(￦)'}</strong>
                      </strong>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('version2_2.text57')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <span className="calUnit ">
                      <em>{t('base.date')}</em>
                      <BaseDatePicker value={params.estimateDate.value} onChange={(date) => handleChange('estimateDate', date)} />
                    </span>
                    <span className="calUnit time">
                      <em>{t('base.time')}</em>
                      <RequestTimePicker id={'estimateTime'} date={params.estimateDate.value} defaultTime={params.estimateTime.value} onSelected={(time) => handleChange('estimateTime', time)} />
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>{t('mileage.detail')}</dt>
                  <dd>
                    <BaseTextArea
                      id="estimateCn"
                      error={params.estimateCn.error}
                      isError={false}
                      value={params.estimateCn.value}
                      placeholder={params.estimateCn.placeholder}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                  </dd>
                </dl>
              </div>
              <div className="btnArea">
                <BaseButton label={t('version2_2.text58')} className={'btnB'} onClick={handleSubmit} />
                {/* disabled={strToLength(params.estimateCn.value) === 0} */}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestEstimatedPage;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseInput, BaseTextArea, ItemTag, BaseButton, BaseSelect, ModalPresent, BaseDatePicker } from '@components/common';
import { RequestTimePicker } from '@components/ui';
import ReqAddModal from '../../components/ui/modal/ReqAddModal';
import { usePublicRequestWritePage } from './hooks/usePublicRequestWritePage';
import { SelectRequest, SelectProstheticsType } from './components';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../components/hooks/useWindowSize';

/**
 * 공개요청서 작성
 * @returns
 */
const PublicRequestWritePage = () => {
  const { t } = useTranslation();
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const reqMax = 10;
  const {
    params,
    cads,
    isModal,
    setIsModal,
    handleChange,
    handleReqAdd,
    handleReqDel,
    handleTypeChange,
    handleSumbit,
    isError,
    setDeadlineT,
    setDeadlineM,
    handleDeadLineMobile,
    deadlineObj,
    visibleM,
    setVisibleM,
    setExpireT,
    setExpireM,
    handleExpireMobile,
    expireObj,
    visibleM2,
    setVisibleM2,
  } = usePublicRequestWritePage();

  const hour = [
    { name: '00', value: '00' },
    { name: '01', value: '01' },
    { name: '02', value: '02' },
    { name: '03', value: '03' },
    { name: '04', value: '04' },
    { name: '05', value: '05' },
    { name: '06', value: '06' },
    { name: '07', value: '07' },
    { name: '08', value: '08' },
    { name: '09', value: '09' },
    { name: '10', value: '10' },
    { name: '11', value: '11' },
    { name: '12', value: '12' },
    { name: '13', value: '13' },
    { name: '14', value: '14' },
    { name: '15', value: '15' },
    { name: '16', value: '16' },
    { name: '17', value: '17' },
    { name: '18', value: '18' },
    { name: '19', value: '19' },
    { name: '20', value: '20' },
    { name: '21', value: '21' },
    { name: '22', value: '22' },
    { name: '23', value: '23' },
  ];
  const minute10 = [
    { name: '00', value: '00' },
    { name: '10', value: '10' },
    { name: '20', value: '20' },
    { name: '30', value: '30' },
    { name: '40', value: '40' },
    { name: '50', value: '50' },
  ];

  const minute30 = [
    { name: '00', value: '00' },
    { name: '30', value: '30' },
  ];

  return (
    <>
      <section>
        <div className="writeBox">
          <h2>
            <strong>{t('request_target.public')}</strong> {t('request_target.write')}
          </h2>
          <div className="tws">
            <form>
              <div className="detail">
                {/* 의뢰서 추가 */}
                <SelectRequest
                  onAddClick={() => {
                    isMobile ? navigate('/request/add', { state: { selectedReqs: params.requestDocGroupsNo.value, type: 'A', params: { ...params } } }) : setIsModal(true);
                  }}
                  onDelClick={(req) => handleReqDel(req)}
                  max={reqMax}
                  items={params.requestDocGroupsNo.value}
                />
                {params.requestDocGroupsNo.error && <p className="errorP">{params.requestDocGroupsNo.error}</p>}
                <dl>
                  <dt>
                    {t('base.title')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      type="text"
                      id="requestFormSj"
                      placeholder={params.requestFormSj.placeholder}
                      value={params.requestFormSj.value}
                      error={params.requestFormSj.error}
                      maxLength={params.requestFormSj.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                    <p className="guide">{`[${t('base.ex')}] ${t('request_target.crown')} 3 ${t('request_target.inlay')} 5 / ${t('request_target.mandibular_frame')}`}</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('request_target.included')}
                    <strong>
                      {t('request_target.select_all')} <sup>필수항목</sup>
                    </strong>
                  </dt>
                  <SelectProstheticsType checkValues={params.requestFormType.value} onChange={handleTypeChange} />
                  {params.requestFormType.error && <p className="errorP">{params.requestFormType.error}</p>}
                </dl>
                <dl>
                  <dt>
                    {t('request_target.deadline')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <span className="calUnit ">
                      <em>{t('base.date')}</em>
                      <BaseDatePicker value={params.requestExpireDate.value} onChange={(date) => handleChange('requestExpireDate', date)} />
                    </span>
                    <span className="calUnit time pCase">
                      <em>{t('base.time')}</em>
                      <RequestTimePicker
                        id={'requestExpireTime'}
                        date={params.requestExpireDate.value}
                        defaultTime={params.requestExpireTime.value}
                        onSelected={(time) => handleChange('requestExpireTime', time)}
                      />
                    </span>

                    {/* TODO PC 모바일 겹칠듯 확인해야함  */}
                    <span className="calUnit time mCase">
                      <em>{t('base.time')}</em>
                      <input type="text" key={params.requestExpireTime.value} defaultValue={params.requestExpireTime.value} readOnly onClick={() => setVisibleM(!visibleM)} />
                      <div className="mTimeChoice" style={{ display: `${visibleM ? 'flex' : 'none'}` }}>
                        <div className="basicPop">
                          <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => setVisibleM(!visibleM)} />
                          <h1 className="pt">{t('request_target.select_deadline')}</h1>
                          <div style={{ paddingBottom: 30, position: 'relative' }}>
                            <div className="pBack" style={{ paddingBottom: 0 }}>
                              <BaseSelect items={hour} placeholder={t('request_target.select_time')} onChange={(e) => setExpireT(e?.value)} />
                              <BaseSelect items={minute30} placeholder={t('request_target.select_minute')} onChange={(e) => setExpireM(e?.value)} />
                            </div>
                            {expireObj?.error && (
                              <p className="errorP" style={{ position: 'absolute' }}>
                                {expireObj?.msg}
                              </p>
                            )}
                          </div>
                          <div className="pBtn">
                            <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => setVisibleM(!visibleM)} />
                            <BaseButton label={t('base.confirm')} className={'btnB'} onClick={handleExpireMobile} />
                          </div>
                        </div>
                      </div>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('request_target.delivery_deadline')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <span className="calUnit ">
                      <em>{t('base.date')}</em>
                      <BaseDatePicker value={params.requestDeadlineDate.value} minDate={params.requestExpireDate.value} onChange={(date) => handleChange('requestDeadlineDate', date)} />
                    </span>
                    <span className="calUnit time pCase">
                      <em>{t('base.time')}</em>
                      <RequestTimePicker
                        id={'requestDeadlineTime'}
                        date={params.requestDeadlineDate.value}
                        defaultTime={params.requestDeadlineTime.value}
                        onSelected={(time) => handleChange('requestDeadlineTime', time)}
                      />
                    </span>
                    <span className="calUnit time mCase">
                      <em>{t('base.time')}</em>
                      <input type="text" key={params.requestDeadlineTime.value} defaultValue={params.requestDeadlineTime.value} readOnly onClick={() => setVisibleM2(!visibleM2)} />
                      <div className="mTimeChoice" style={{ display: `${visibleM2 ? 'flex' : 'none'}` }}>
                        <div className="basicPop">
                          <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => setVisibleM2(!visibleM2)} />
                          <h1 className="pt">{'납품 마감시간 선택하기'}</h1>
                          <div style={{ paddingBottom: 30, position: 'relative' }}>
                            <div className="pBack" style={{ paddingBottom: 0 }}>
                              <BaseSelect items={hour} placeholder={t('request_target.select_time')} onChange={(e) => setDeadlineT(e?.value)} />
                              <BaseSelect items={minute10} placeholder={t('request_target.select_minute')} onChange={(e) => setDeadlineM(e?.value)} />
                            </div>
                            {deadlineObj?.error && (
                              <p className="errorP" style={{ position: 'absolute' }}>
                                {deadlineObj?.msg}
                              </p>
                            )}
                          </div>
                          <div className="pBtn">
                            <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => setVisibleM2(!visibleM2)} />
                            <BaseButton label={t('base.confirm')} className={'btnB'} onClick={handleDeadLineMobile} />
                          </div>
                        </div>
                      </div>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('base.prefer')} CAD S/W
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <ItemTag items={cads} className="itemTag" />
                    <p className="guide">{`${t('base.prefer')} CAD S/W${t('request_target.mutate')}`}</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('base.request')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseTextArea
                      id="requestFormDc"
                      isError={false}
                      error={params.requestFormDc.error}
                      value={params.requestFormDc.value}
                      placeholder={params.requestFormDc.placeholder}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                  </dd>
                </dl>
              </div>
              <div className="btnArea">
                <BaseButton label={t('base.completed')} className={'btnB'} disabled={isMobile ? isError : false} onClick={handleSumbit} />
              </div>
            </form>
          </div>
        </div>
      </section>

      {isModal && (
        <ModalPresent>
          <ReqAddModal
            onClose={() => {
              setIsModal(false);
            }}
            onAdd={handleReqAdd}
            selectedReqs={params.requestDocGroupsNo.value}
            max={reqMax}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default PublicRequestWritePage;

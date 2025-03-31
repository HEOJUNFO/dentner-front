import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, BaseTextArea, ModalPresent, BaseDatePicker, BaseSelect } from '@components/common';
import { RequestTimePicker } from '@components/ui';
import ReqAddModal from '../../components/ui/modal/ReqAddModal';
import DesignerChoiceModal from '../../components/ui/modal/DesignerChoiceModal';
import { SelectRequest, SelectProstheticsType } from './components';
import { useTargetRequestWritePage } from './hooks/useTargetRequestWritePage';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../components/hooks/useWindowSize';

/**
 * 지정요청서 작성
 * @returns
 */
const TargetRequestWritePage = () => {
  const { t } = useTranslation();
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const reqMax = 10;
  const {
    params,
    cads,
    price,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    handleChange,
    handleReqAdd,
    handleDesiAdd,
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
  } = useTargetRequestWritePage();

  const hour10 = [
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


  return (
    <>
      <section>
        <div className="writeBox">
          <h2>
            <strong>{t('request_target.designation_form')}</strong> {t('request_target.write')}
          </h2>
          <div className="tws">
            <div className="detail">
              <dl>
                <dt>
                  {t('request_target.select_dental_designer')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <span className="ipBBtn">
                    <BaseInput
                      type="text"
                      id="requestDesignerNo"
                      placeholder={t('version2_17.target_request_write_holder1')}
                      value={params.requestDesignerNo.maskingValue}
                      error={params.requestDesignerNo.error}
                      isError={false}
                      readOnly
                    />
                    <BaseButton
                      label={t('request_target.select_designate')}
                      onClick={() => {
                        isMobile ? navigate('/request/designerChoice', { state: { selectedDesigner: { memberNo: params.requestDesignerNo.value }, params: { ...params } } }) : setIsModal2(true);
                      }}
                    />
                  </span>
                </dd>
              </dl>
              <SelectRequest
                type={'target'}
                price={price}
                onAddClick={() => {
                  isMobile ? navigate('/request/add', { state: { selectedReqs: params.requestDocGroupsNo.value, type: 'B', params: { ...params } } }) : setIsModal(true);
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
                    placeholder={t('version2_4.text72')}
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
                  {t('request_target.delivery_deadline')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <span className="calUnit ">
                    <em>{t('base.date')}</em>
                    <BaseDatePicker value={params.requestDeadlineDate.value} onChange={(date) => handleChange('requestDeadlineDate', date)} />
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
                    <input type="text" key={params.requestDeadlineTime.value} defaultValue={params.requestDeadlineTime.value} readOnly onClick={() => setVisibleM(!visibleM)} />
                    <div className="mTimeChoice" style={{ display: `${visibleM ? 'flex' : 'none'}` }}>
                      <div className="basicPop">
                        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => setVisibleM(!visibleM)} />
                        <h1 className="pt">{'납품 마감시간 선택하기'}</h1>
                        <div style={{ paddingBottom: 30, position: 'relative' }}>
                          <div className="pBack" style={{ paddingBottom: 0 }}>
                            <BaseSelect items={hour10} placeholder={t('request_target.select_time')} onChange={(e) => setDeadlineT(e?.value)} />
                            <BaseSelect items={minute10} placeholder={t('request_target.select_minute')} onChange={(e) => setDeadlineM(e?.value)} />
                          </div>
                          {deadlineObj?.error && (
                            <p className="errorP" style={{ position: 'absolute' }}>
                              {deadlineObj?.msg}
                            </p>
                          )}
                        </div>
                        <div className="pBtn">
                          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => setVisibleM(!visibleM)} />
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
                    error={params.requestFormDc.error}
                    value={params.requestFormDc.value}
                    placeholder={t('version2_17.target_request_write_holder3')}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </dd>
              </dl>
            </div>
            <div className="btnArea">
              <BaseButton label={t('base.completed')} className={'btnB'} disabled={isMobile ? isError : false} onClick={handleSumbit} />
            </div>
          </div>
        </div>
      </section>

      {/* 의뢰서 추가 모달 */}
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

      {/* 치자이너 선택 모달 */}
      {isModal2 && (
        <ModalPresent>
          <DesignerChoiceModal
            selectedDesigner={{ memberNo: params.requestDesignerNo.value }}
            onSelected={handleDesiAdd}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default TargetRequestWritePage;

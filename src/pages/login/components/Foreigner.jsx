import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '@constants/code';
import { BaseInput, BaseButton, BaseSelect, ModalPresent } from '@components/common';
import { SmsVerify, FileUpload, PasswordCheck, NotiTalkSetting } from '@components/ui';
import DaumPostModal from '@components/ui/modal/DaumPostModal';
import { useForeigner, useValid } from '../hooks';
import AgreeSet from './AgreeSet';
import { useTranslation } from 'react-i18next';

const Foreigner = forwardRef((props, ref) => {
  const { alarmType, setAlarmType, params, setParams, agreeSet, isPostModal, setIsPostModal, gmtCodes, businessFileList, setBusinessFileList, handleCheck, handleSmsVerify, handleNotiTalk, handleChange, handleSubmit } =
    useForeigner();
  const { handleEmailFocus, handlePassword, handleVerifyClick, handleEmailBlur, handleDupClick } = useValid({ params, setParams });
  const { t, i18n } = useTranslation();

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));
  return (
    <>
      {/* 약관동의 */}
      <AgreeSet items={agreeSet} onChange={handleCheck} />
      <dl>
        <dt>
          {t('login.email')}
          <sup>{t('base.required')}</sup>
        </dt>
        <dd>
          <BaseInput
            type="text"
            id="memberEmail"
            placeholder={params.memberEmail.placeholder}
            value={params.memberEmail.value}
            error={params.memberEmail.error}
            maxLength={params.memberEmail.maxLength}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            onBlur={handleEmailBlur}
            onFocus={handleEmailFocus}
            disabled={params.memberEmail.disabled}
          />
        </dd>
      </dl>
      {params.memberPassword.visible && (
        <dl>
          <dt>
            {t('login.password')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <PasswordCheck onPassword={handlePassword} err={params.memberPassword.error} />
          </dd>
        </dl>
      )}

      <div className="joinType">
        {/* 휴대폰 인증 */}
        <SmsVerify type={2} certification="C" onVerifyClick={handleVerifyClick} err={params.memberHp.error} onChange={handleSmsVerify} />

        {/* 알림톡 선택 */}
        <NotiTalkSetting onChange={handleNotiTalk} />
        {params.memberAlarmSe.error && <p className="errorP">{params.memberAlarmSe.error}</p>}
        <dl>
          <dt>
            {t('login.first_name')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              id="memberFirstName"
              placeholder={params.memberFirstName.placeholder}
              value={params.memberFirstName.value}
              error={params.memberFirstName.error}
              maxLength={params.memberFirstName.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.last_name')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              id="memberLastName"
              placeholder={params.memberLastName.placeholder}
              value={params.memberLastName.value}
              error={params.memberLastName.error}
              maxLength={params.memberLastName.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.nickname')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              placeholder={params.memberNickName.placeholder}
              id="memberNickName"
              value={params.memberNickName.value}
              error={params.memberNickName.error}
              maxLength={params.memberNickName.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
            {Boolean(Number(params.memberNickName.success)) && <p className="notiP"> {t('notify.usable_nickname')}</p>}
            <BaseButton type="button" className={'btnB sm mt10'} label={t('version2_1.text58')} onClick={handleDupClick} disabled={!params.memberNickName.value} />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.select_job')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseSelect id="memberJobSe" items={jobs[i18n.language]} placeholder={params.memberJobSe.placeholder} onChange={(e) => handleChange(e.pid, e.value)} />
            {params.memberJobSe.error && <p className="errorP">{params.memberJobSe.error}</p>}
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.business_name')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              placeholder={params.memberBusinessName.placeholder}
              id="memberBusinessName"
              value={params.memberBusinessName.value}
              error={params.memberBusinessName.error}
              maxLength={params.memberBusinessName.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.business_number')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              placeholder={params.memberBusinessNumber.placeholder}
              id="memberBusinessNumber"
              value={params.memberBusinessNumber.value}
              error={params.memberBusinessNumber.error}
              maxLength={params.memberBusinessNumber.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.business_address')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd className="addressInput">
            <BaseInput
              type="text"
              className={params.memberAddress.error ? 'mt10' : ''}
              placeholder={params.memberAddress.placeholder}
              id="memberAddress"
              value={params.memberAddress.value}
              error={params.memberAddress.error}
              maxLength={params.memberAddress.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              // onClick={() => setIsPostModal(true)}
              // readOnly
            />
            <BaseInput
              className="mt10"
              type="text"
              placeholder={params.memberDetailAddress.placeholder}
              id="memberDetailAddress"
              value={params.memberDetailAddress.value}
              error={params.memberDetailAddress.error}
              maxLength={params.memberDetailAddress.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.business_registration')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <div className="fileSet">
              <FileUpload fileList={businessFileList} setFileList={setBusinessFileList} maxFile={1} />
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            Timezone
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseSelect
              id="memberTimezoneNo"
              items={gmtCodes}
              titleName={'codeName'}
              valueName={'codeNo'}
              placeholder={params.memberTimezoneNo.placeholder}
              onChange={(e) => {
                handleChange(e.pid, e.codeNo);
              }}
            />
            {params.memberTimezoneNo.error && <p className="errorP">{params.memberTimezoneNo.error}</p>}
          </dd>
        </dl>
      </div>

      {isPostModal && (
        <ModalPresent>
          <DaumPostModal onClose={() => setIsPostModal(false)} onClick={(value) => handleChange('memberAddress', value?.address)} />
        </ModalPresent>
      )}
    </>
  );
});

export default Foreigner;

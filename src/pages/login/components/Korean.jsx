import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { BaseInput, BaseButton, ModalPresent } from '@components/common';
import { SmsVerify, FileUpload, PasswordCheck } from '@components/ui';
import DaumPostModal from '@components/ui/modal/DaumPostModal';
import { useKorean, useValid } from '../hooks';
import AgreeSet from './AgreeSet';
import { useTranslation } from 'react-i18next';

/**
 * 내국인 회원가입
 * @param {*} param0
 * @returns
 */
const Korean = forwardRef((props, ref) => {
  const {
    params,
    setParams,
    agreeSet,
    isPostModal,
    setIsPostModal,
    licenseFileList,
    setLicenseFileList,
    businessFileList,
    setBusinessFileList,
    handleCheck,
    handleChange,
    handleSmsVerify,
    handleSubmit,
    alarmType, setAlarmType, handleAlarmSet
  } = useKorean();
  const { handleEmailFocus, handlePassword, handleVerifyClick, handleEmailBlur, handleDupClick } = useValid({ params, setParams });
  const { t } = useTranslation();

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
            {/* {params.memberPassword.error && <p className="errorP">{params.memberPassword.error}</p>} */}
          </dd>
        </dl>
      )}
      <div className="joinType">
        <dl>
          <dt>
            {t('login.last_name')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              id="memberName"
              placeholder={params.memberName.placeholder}
              value={params.memberName.value}
              error={params.memberName.error}
              maxLength={params.memberName.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        {/* 휴대폰인증 */}
        <SmsVerify certification="C" onVerifyClick={handleVerifyClick} err={params.memberHp.error} onChange={handleSmsVerify} />
        <dl>
          <dt>
            {t('mypage.talk')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd className="typeChoice">
            <BaseButton className={`${alarmType?.includes('2') ? 'on' : ''}`} label={t('mypage.kakao')} onClick={() => handleAlarmSet('2')} />
            <BaseButton className={`${alarmType?.includes('1')  ? 'on' : ''}`} label={t('mobile App')} onClick={() => handleAlarmSet('1')} />
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
            {Boolean(Number(params.memberNickName.success)) && <p className="notiP">{t('notify.usable_nickname')}</p>}
            <BaseButton
              type="button"
              className={'btnB sm mt10'}
              label={t('version2_1.text58')}
              onClick={handleDupClick}
              disabled={!params.memberNickName.value || params.memberNickName.value.length <= 1}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.dentist_license')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <div className="fileSet">
              <FileUpload fileList={licenseFileList} setFileList={setLicenseFileList} maxFile={1} />
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.license_number')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd>
            <BaseInput
              type="text"
              placeholder={params.memberLicenseNumber.placeholder}
              id="memberLicenseNumber"
              value={params.memberLicenseNumber.value}
              error={params.memberLicenseNumber.error}
              maxLength={params.memberLicenseNumber.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            {t('login.dental_name')}
            <sup>{t('base.required')}</sup>
          </dt>
          <dd className="officeName">
            <em>{t('error.cannot_input_dentalLab')}</em>
            <BaseInput
              type="text"
              placeholder={params.memberDentistryName.placeholder}
              id="memberDentistryName"
              value={params.memberDentistryName.value}
              error={params.memberDentistryName.error}
              maxLength={params.memberDentistryName.maxLength}
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
              onClick={() => setIsPostModal(true)}
              readOnly
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
      </div>
      {isPostModal && (
        <ModalPresent>
          <DaumPostModal onClose={() => setIsPostModal(false)} onClick={(value) => handleChange('memberAddress', value?.address)} />
        </ModalPresent>
      )}
    </>
  );
});

export default Korean;

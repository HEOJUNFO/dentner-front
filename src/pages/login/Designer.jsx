import React from 'react';
import { BaseInput, BaseSelect, BaseButton, ModalPresent } from '@components/common';
import { SmsVerify, FileUpload, PasswordCheck } from '@components/ui';
import DaumPostModal from '@components/ui/modal/DaumPostModal';
import { useDesigner, useValid } from './hooks';
import AgreeSet from './components/AgreeSet';
import { useTranslation } from 'react-i18next';

const Designer = () => {
  const {
    params,
    setParams,
    agreeSet,
    bankCode,
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
    handleAgreeCheck,
    handleAccCheck,
    isAccount,
    setAccount,
    alarmType, setAlarmType, handleAlarmSet
  } = useDesigner();
  const { handleEmailFocus, handlePassword, handleVerifyClick, handleEmailBlur, handleDupClick } = useValid({ params, setParams });
  const { t } = useTranslation();

  return (
    <>
      <div className={`memberLayout`}>
        <div className="joinStep2">
          <h2>{t('join.email')}</h2>

          <div className="tws">
            <AgreeSet items={agreeSet} onChange={handleCheck} />
            <dl>
              <dt>
                {/* 이메일 주소 */}
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
                <BaseButton type="button" className={'btnB sm mt10'} label={t('version2_1.text58')} onClick={handleDupClick} disabled={!params.memberNickName.value} />
              </dd>
            </dl>
            <dl>
              <dt>
                {/* 치과기공사 면허증 첨부 */}
                {t('login.dental_lab_license')}
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
                {/* 면허번호 */}
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
                {/* 상호 명 */}
                {t('login.company_name')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
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
                {/* 대표자 명 */}
                {t('login.representative_name')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
                <BaseInput
                  type="text"
                  placeholder={params.memberRepresentativeName.placeholder}
                  id="memberRepresentativeName"
                  value={params.memberRepresentativeName.value}
                  error={params.memberRepresentativeName.error}
                  maxLength={params.memberRepresentativeName.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                {/* 사업자 등록번호 */}
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
                {/* 사업장 주소 */}
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
                {/* 사업자 등록증 첨부 */}
                {t('login.business_registration')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
                <div className="fileSet">
                  <FileUpload fileList={businessFileList} setFileList={setBusinessFileList} maxFile={1} />
                </div>
              </dd>
            </dl>
            <div className="joinGuide">
              <div className="back">
                <p>
                  <em>
                    {/* 치과기공소 통장 정보를 기입해주세요! */}
                    {t('version2_1.text104')}
                  </em>
                  {/* 등록한 사업자등록증의 대표자와 예금주가 다를 경우, 서비스 이용이 불가능합니다. */}
                  {t('version2_1.text105')}
                </p>
                <div>
                  <span>
                    <em>&#91;{t('version2_1.text106')}&#93;</em>
                    <br />
                    <i>{t('version2_1.text107')}</i>
                    <br />
                    {t('version2_1.text108')}
                    <br />
                    {t('version2_1.text109')}
                  </span>
                  <span>
                    <em>&#91;{t('version2_1.text111')}&#93;</em>
                    <br />
                    <i>{t('version2_1.text107')}</i>
                    <br />
                    {t('version2_1.text108')}
                    <br />
                    <strong>{t('version2_1.text110')}</strong>
                  </span>
                </div>
              </div>
            </div>
            <dl>
              <dt>
                {/* 은행 명 */}
                {t('login.bank_name')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
                <BaseSelect
                  items={bankCode.value}
                  placeholder={params.memberBankNo.placeholder}
                  titleName={'codeName'}
                  valueName={'codeNo'}
                  onChange={(e) => {
                    handleChange('memberBankNo', e.codeNo);
                    handleChange('memberAccountBankNo', e.codeDesc);
                    setAccount(false);
                  }}
                />
                {params.memberBankNo.error && <p className="errorP">{params.memberBankNo.error}</p>}
              </dd>
            </dl>
            <dl>
              <dt>
                {/* 예금주 */}
                {t('login.depositor')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
                <BaseInput
                  type="text"
                  placeholder={params.memberAccountName.placeholder}
                  id="memberAccountName"
                  value={params.memberAccountName.value}
                  error={params.memberAccountName.error}
                  maxLength={params.memberAccountName.maxLength}
                  onChange={(e) => {
                    handleChange(e.target.id, e.target.value);
                    setAccount(false);
                  }}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                {/* 계좌번호 */}
                {t('login.bank_account')}
                <sup>{t('base.required')}</sup>
              </dt>
              <dd>
                <BaseInput
                  type="text"
                  placeholder={params.memberAccountNumber.placeholder}
                  id="memberAccountNumber"
                  value={params.memberAccountNumber.value}
                  error={params.memberAccountNumber.error}
                  maxLength={params.memberAccountNumber.maxLength}
                  onChange={(e) => {
                    handleChange(e.target.id, e.target.value);
                    setAccount(false);
                  }}
                />
                <input type="button" className="btnB sm mt10" value={t('version2_1.text103')} onClick={handleAccCheck} />
                {isAccount && (
                  <p className="notiP">
                    {/* 예금주 확인되었습니다. */}
                    {t('version2_1.text102')}
                  </p>
                )}
              </dd>
            </dl>
            <div className="invoiceAgree">
              <span className="checkSet">
                <input type="checkbox" id="isConfirm" onChange={handleAgreeCheck} value={params.isConfirm.value} />
                <label htmlFor="isConfirm">
                  *{/* CAD 디자인 용역 시, 전자계산서 발행은 필수입니다. */}
                  {t('version2_1.text75')}
                </label>
              </span>
            </div>
          </div>

          <BaseButton className={'btnB mt50'} label={t('join.do_join')} onClick={handleSubmit} />
        </div>
      </div>

      {isPostModal && (
        <ModalPresent>
          <DaumPostModal onClose={() => setIsPostModal(false)} onClick={(value) => handleChange('memberAddress', value?.address)} />
        </ModalPresent>
      )}
    </>
  );
};

export default Designer;

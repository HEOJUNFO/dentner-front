import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BaseInput, BaseSelect, BaseButton, ModalPresent } from '@components/common';
import { SmsVerify, FileUpload, PasswordCheck } from '@components/ui';
import DaumPostModal from '@components/ui/modal/DaumPostModal';
import { useOffice, useValid } from '../hooks';
import AgreeSet from '../components/AgreeSet';
import { useTranslation } from 'react-i18next';

// 사용안함 삭제 예정
const OfficePage = () => {
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
  } = useOffice();
  const { handleEmailFocus, handlePassword, handleVerifyClick, handleEmailBlur, handleDupClick } = useValid({ params, setParams });
  const { t } = useTranslation();

  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {
    //console.log(imgFileList);
  }, [imgFileList]);

  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(false);
  const banks = [
    { name: `${t('base.bank')} 1`, value: 0 },
    { name: `${t('base.bank')} 2`, value: 1 },
  ];

  return (
    <>
      <div className={`memberLayout`}>
        <div className="joinStep2">
          <h2>{t('join.email')}</h2>

          <div className="tws">
            <AgreeSet items={agreeSet} onChange={handleCheck} />
            <dl>
              <dt>
                {t('login.email')}
                <sup>필수항목</sup>
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
                />
              </dd>
            </dl>
            <dl>
              <dt>
                {t('login.password')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                <PasswordCheck onPassword={handlePassword} err={params.memberPassword.error} />
              </dd>
            </dl>

            {/* 휴대폰인증 */}
            <SmsVerify certification="C" onVerifyClick={handleVerifyClick} err={params.memberHp.error} onChange={handleSmsVerify} />

            <dl>
              <dt>
                {t('login.nickname')}
                <sup>필수항목</sup>
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
                <BaseButton type="button" className={'btnB sm mt10'} label={'중복 확인'} onClick={handleDupClick} disabled={!params.memberNickName.value} />
              </dd>
            </dl>
            <dl>
              <dt>
                {t('login.dentist_license')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                <div className="fileSet">
                  <FileUpload fileList={licenseFileList} setFileList={setLicenseFileList} />
                </div>
              </dd>
            </dl>
            <dl>
              <dt>
                {t('login.license_number')}
                <sup>필수항목</sup>
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
                {t('login.company_name')}
                <sup>필수항목</sup>
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
                {t('login.representative_name')}
                <sup>필수항목</sup>
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
                {t('login.business_number')}
                <sup>필수항목</sup>
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
                <sup>필수항목</sup>
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
                <sup>필수항목</sup>
              </dt>
              <dd>
                <div className="fileSet">
                  <FileUpload fileList={businessFileList} setFileList={setBusinessFileList} />
                </div>
              </dd>
            </dl>
            <div className="joinGuide">
              <div className="back">
                <p>
                  <em>{t('error.fill_passbook')}</em>
                  {t('error.unmatch_representative')}
                </p>
              </div>
            </div>
            <dl>
              <dt>
                {t('login.bank_name')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                <BaseSelect items={bankCode.value} placeholder={params.memberBankNo.placeholder} titleName={'codeName'} valueName={'codeNo'} onChange={(e) => handleChange('memberBankNo', e.codeNo)} />
              </dd>
            </dl>
            <dl>
              <dt>
                {t('login.depositor')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                {/* <input type="text" placeholder="예금주를 입력하세요." /> */}
                <BaseInput
                  type="text"
                  placeholder={params.memberAccountName.placeholder}
                  id="memberAccountName"
                  value={params.memberAccountName.value}
                  error={params.memberAccountName.error}
                  maxLength={params.memberAccountName.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                {t('login.bank_account')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                {/* <input type="text" placeholder="계좌번호를 입력하세요." /> */}
                <BaseInput
                  type="text"
                  placeholder={params.memberAccountNumber.placeholder}
                  id="memberAccountNumber"
                  value={params.memberAccountNumber.value}
                  error={params.memberAccountNumber.error}
                  maxLength={params.memberAccountNumber.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
                <input type="button" className="btnB sm mt10" value={t('login.auth_self')} />
              </dd>
            </dl>
            <div className="invoiceAgree">
              <span className="checkSet">
                <input type="checkbox" id="cad" />
                <label htmlFor="cad">* {t('error.invoice_required')}</label>
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

export default OfficePage;

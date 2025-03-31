import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent, ModalPresent } from '@components/common';
import { useNav } from '@components/hooks';
import { ConfirmModal, FileUpload, PasswordModal } from '@components/ui';
import React, { useEffect, useState } from 'react';
import useMyPageInfo from './hooks/useMyPageInfo';

import DaumPostModal from '@components/ui/modal/DaumPostModal';
import { apps, jobs, notis } from '@constants/code';
import { getByteSize } from '@utils/common';
import PhoneModal from '../../components/ui/modal/PhoneModal';

const MyPageInfo = () => {
  const {
    t,
    i18n,
    isLoading,
    user,
    logout,
    params,
    isPostModal,
    setIsPostModal,
    licenseFileList,
    setLicenseFileList,
    businessFileList,
    setBusinessFileList,
    handleChange,
    handleSubmit,
    delFiles,
    setDelFiles,
    handleSecession,
    isConModal,
    gmtCodes,
    bankCode,
    handleAccCheck,
    isAccount,
    setAccount,
    handleAgreeCheck,
    currentBankName,
  } = useMyPageInfo();

  const [isModal, setIsModal] = useState(false);
  const [isPhoneModal, setIsPhoneModal] = useState(false);

  const { handleNav } = useNav();

  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {
    //console.log(imgFileList);
  }, [imgFileList]);

  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(true);
  const [talkOk, setTalkOk] = useState(true);

  // const [jTab, setJoinTab] = useState(1);
  // const handleJoinTab = (jTab) => {
  //   setJoinTab(jTab);
  // };

  const items = [
    { name: 'GMT - 00:00', value: 0 },
    { name: 'GMT - 01:00', value: 1 },
  ];

  const ituts = [
    { name: '+82', value: 0 },
    { name: '+80', value: 1 },
  ];

  // const jobs = [
  //   { name: '직업 1', value: 0 },
  //   { name: '직업 2', value: 1 },
  // ];

  if (isLoading) return <></>;
  return (
    <>
      <article>
        <div className="mypageBox">
          <div className="listTit">
            <h3>{t('mypage.personal_info')}</h3>
          </div>
          <div className="myInfoModify">
            <span className="postEdit">
              <BaseButton
                label={t('base.logout')}
                onClick={() => {
                  logout();
                  handleNav('/');
                }}
              />
              <span>
                <BaseButton label={t('base.withdrawal')} onClick={handleSecession} />
              </span>
            </span>
            <div className="memberLayout">
              <form>
                <div className="tws">
                  <dl>
                    <dt>
                      {t('login.email')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      <BaseInput type="text" value={user.memberEmail} disabled={true} />
                    </dd>
                  </dl>
                  {/** 소셜로그인일 경우 비밀번호 수정 없음 */}
                  {!user.socialSe && (
                    <dl>
                      <input type="button" className="btnB sm" value={t('mypage.mutate_pw')} onClick={() => setIsModal(true)} />
                    </dl>
                  )}

                  {user.memberTp === 'A' && (
                    <div className="joinType">
                      {user.memberName && (
                        <dl>
                          <dt>
                            {t('login.last_name')}
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" value={user.memberName} disabled={true} />
                          </dd>
                        </dl>
                      )}
                      <dl>
                        <dt>
                          {t('version2_4.text3')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseInput type="text" value={user.memberHp} disabled={true} />
                        </dd>
                      </dl>
                      <dl>
                        <input type="button" className="btnB sm" value={t('mypage.mutate_phone')} onClick={() => setIsPhoneModal(true)} />
                      </dl>
                      {/* <dl>
                        <dt>
                          휴대폰 인증
                          <sup>필수항목</sup>
                        </dt>
                        <dd className="phoneCertify">
                          <span className="certifySet">
                            <input type="text" placeholder="휴대전화번호를 입력하세요." defaultValue={'01012345678'} />
                            <em>00:55</em>
                          </span>
                          <input type="button" className="btnB sm" value="인증번호 전송" />
                          <p className="notiP">인증 번호를 전송하였습니다.</p>
                          <input type="text" placeholder="인증번호를 입력하세요." defaultValue={'45644'} />
                          <input type="button" className="btnB sm" value="인증 확인" />
                          <p className="errorP">인증번호가 일치하지 않습니다.</p>
                        </dd>
                      </dl> */}
                      <dl>
                        <dt>
                          {user.memberSe === 'A' ? t('login.dentist_license') : t('login.dental_lab_license')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <span className="fileLoad disabled">
                            <span>
                              {licenseFileList?.fileName}
                              <em>{getByteSize(licenseFileList?.fileSize)}</em>
                            </span>
                          </span>
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          {t('login.license_number')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseInput type="text" value={user.memberLicenseNumber} disabled={true} />
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          {user.memberSe === 'A' ? t('login.dental_name') : t('login.company_name')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd className="officeName">
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
                      {user.memberSe !== 'A' && (
                        <dl>
                          <dt>
                            {t('login.representative_name')}
                            <sup>필수항목</sup>
                          </dt>
                          <dd className="officeName">
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
                      )}
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
                            <FileUpload
                              label={<label>{t('version2_1.text27')}</label>}
                              fileList={businessFileList}
                              setFileList={setBusinessFileList}
                              delFileList={delFiles}
                              setDelFileList={setDelFiles}
                              maxFile={1}
                            />
                          </div>
                        </dd>
                      </dl>
                      {user.memberSe === 'B' && (
                        <div className="joinGuide">
                          <div className="back">
                            <p>
                              <em>{t('version2_1.text78')}</em>
                              {t('version2_1.text77')}
                            </p>
                          </div>
                        </div>
                      )}
                      {user.memberSe === 'C' && (
                        <div className="joinGuide">
                          <div className="back">
                            <p>
                              <em>{t('version2_1.text78')}</em>
                              {t('version2_1.text77')}
                            </p>
                            <div>
                              <span>
                                <em>&#91;가입 가능&#93;</em>
                                <br />
                                <i>가입자 이름 : 홍길동</i>
                                <br />
                                대표자 : 김철수
                                <br />
                                예금주 : 김철수
                              </span>
                              <span>
                                <em>&#91;가입 불가&#93;</em>
                                <br />
                                <i>가입자 이름 : 홍길동</i>
                                <br />
                                대표자 : 김철수
                                <br />
                                <strong>예금주 : 홍길동</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      {user.memberSe !== 'A' && (
                        <>
                          <dl>
                            <dt>
                              {t('login.bank_name')}
                              <sup>필수항목</sup>
                            </dt>
                            <dd>
                              <BaseSelect
                                items={bankCode.value}
                                placeholder={currentBankName || params.memberBankNo.placeholder}
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
                              {t('login.depositor')}
                              <sup>필수항목</sup>
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
                              <input type="button" className="btnB sm mt10" value={user.memberSe === 'B' ? t('login.auth_self') : t('version2_1.text103')} onClick={handleAccCheck} />
                              {isAccount && <p className="notiP">{t('version2_1.text102')}</p>}
                            </dd>
                          </dl>
                          <dl>
                            <dt>
                              {t('login.bank_account')}
                              <sup>필수항목</sup>
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
                            </dd>
                          </dl>
                          <div className="invoiceAgree">
                            <span className="checkSet">
                              <input type="checkbox" id="isConfirm" onChange={handleAgreeCheck} value={params.isConfirm.value} />
                              <label htmlFor="isConfirm">{t('version2_2.text158')}</label>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {user.memberTp === 'B' && (
                    <div className="joinType">
                      <dl>
                        <dt>
                          {t('version2_4.text3')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseInput type="text" value={user.memberHp} disabled={true} />
                        </dd>
                      </dl>
                      <dl>
                        {/* <dd className="phoneCertify">
                          <BaseSelect items={ituts} placeholder={'+82'} onChange={(e) => console.log(e)} />
                          <span className="certifySet">
                            <input type="text" placeholder={t('placeholder.enter_phone')} defaultValue={'01012345678'} />
                            <em>00:55</em>
                          </span>
                          <input type="button" className="btnB sm" value="인증번호 전송" />
                          <p className="notiP">{t('notify.sent_cert')}</p>
                          <input type="text" placeholder={t('placeholder.enter_credential')} defaultValue={'45644'} />
                          <input type="button" className="btnB sm" value="인증 확인" />
                        </dd> */}

                        <input type="button" className="btnB sm" value={t('mypage.mutate_phone')} onClick={() => setIsPhoneModal(true)} />
                      </dl>
                      <dl>
                        <dt>
                          {t('mypage.talk_set')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd className="talkChoice">
                          <em>
                            {t('mypage.email_talk')}
                            <br />
                            {t('mypage.etc')}
                          </em>
                          <span className="talkSet">
                            {notis[i18n.language].map((el, idx) => (
                              <span key={`notis${idx}`}>
                                <BaseInput
                                  type="radio"
                                  defaultChecked={params.memberAlarmAt.value === el.value}
                                  name="memberAlarmAt"
                                  id={`memberAlarmAt${idx}`}
                                  label={el.name}
                                  value={el.value}
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </span>
                            ))}
                          </span>
                        </dd>
                      </dl>
                      <dl style={{ display: `${params.memberAlarmAt.value === 'Y' ? 'block' : 'none'}` }}>
                        <dt>
                          {t('mypage.talk')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd className="talkChoice">
                          <em>{t('mypage.email_talk')}</em>
                          <span className="talkSet short">
                            {apps[i18n.language].map((el, idx) => (
                              <span key={`apps${idx}`}>
                                <BaseInput
                                  type="radio"
                                  defaultChecked={params.memberAlarmSe.value === el.value}
                                  name="memberAlarmSe"
                                  id={`memberAlarmSe${idx}`}
                                  label={el.name}
                                  value={el.value}
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                />
                              </span>
                            ))}
                          </span>
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          {t('login.first_name')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseInput type="text" placeholder={t('version2_5.text8')} value={user?.memberFirstName} disabled={true} />
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          {t('login.last_name')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseInput type="text" placeholder={t('version2_1.text98')} value={user?.memberLastName} disabled={true} />
                        </dd>
                      </dl>
                      {/* <dl>
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
                          {Boolean(Number(params.memberNickName.success)) && <p className="notiP"> {t('notify.usable_nickname')}</p>}
                          <BaseButton type="button" className={'btnB sm mt10'} label={'중복 확인'} onClick={handleDupClick} disabled={!params.memberNickName.value} />
                        </dd>
                      </dl> */}
                      <dl>
                        <dt>
                          {t('login.select_job')}
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseSelect
                            items={jobs[i18n.language]}
                            id="memberJobSe"
                            placeholder={params.memberJobSe.placeholder}
                            selectedValue={params.memberJobSe.value}
                            onChange={(e) => handleChange('memberJobSe', e.value)}
                          />
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          {t('login.business_name')}
                          <sup>필수항목</sup>
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
                            onChange={(e) => handleChange(e.target.id, e.target.value)}
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
                            <FileUpload
                              label={<label>{t('version2_1.text27')}</label>}
                              fileList={businessFileList}
                              setFileList={setBusinessFileList}
                              delFileList={delFiles}
                              setDelFileList={setDelFiles}
                              maxFile={1}
                            />
                          </div>
                        </dd>
                      </dl>
                      <dl>
                        <dt>
                          Timezone
                          <sup>필수항목</sup>
                        </dt>
                        <dd>
                          <BaseSelect
                            items={gmtCodes}
                            titleName={'codeName'}
                            valueName={'codeNo'}
                            id="memberTimezoneNo"
                            placeholder={params.memberTimezoneNo.placeholder}
                            selectedValue={params.memberTimezoneNo.value}
                            onChange={(e) => {
                              handleChange('memberTimezoneNo', e.codeNo);
                            }}
                          />
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
                <BaseButton className={'btnB mt50'} label={t('base.mutate')} onClick={handleSubmit} />
                {/* <Link to="" className="btnB mt50">
                  수정하기{' '}
                </Link> */}
              </form>
            </div>
          </div>
        </div>
      </article>

      {isPostModal && (
        <ModalPresent>
          <DaumPostModal onClose={() => setIsPostModal(false)} onClick={(value) => handleChange('memberAddress', value?.address)} />
        </ModalPresent>
      )}

      {isModal && (
        <ModalPresent>
          <PasswordModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
      {isPhoneModal && (
        <ModalPresent>
          <PhoneModal
            certification={'C'}
            memberTp={user.memberTp}
            onClose={() => {
              setIsPhoneModal(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 탈퇴모달 */}
      {isConModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal {...isConModal.value} />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default MyPageInfo;

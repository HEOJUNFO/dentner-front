import { postMileageCard } from '@api/Mileage';
import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent } from '@components/common';
import { useNav, useSnack } from '@components/hooks';
import { strToLength } from '@utils/common';
import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useValid } from '../../../pages/login/hooks';
import PasswordCheck from '../components/PasswordCheck';
import { putPassword } from '@api/Mypage';
import { useTranslation } from 'react-i18next';
// import { putPassword } from '@api/MyPage';
/**
 * 패스워드 변경
 * @param {*} param0
 * @returns
 */
const PasswordModal = ({ onClose }) => {
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [pwVisible, setPwVisible] = useState(false);
  // const [pwVisible2, setPwVisible2] = useState(true);
  // const [pwVisible3, setPwVisible3] = useState(true);
  // const [error, setError] = useState('');

  // const [isModal, setIsModal] = useState(false);
  // const [isModal2, setIsModal2] = useState(false);

  // const [selectedItem, setSelectedItem] = useState(0);
  const { t } = useTranslation();

  const [body, setBody] = useState({
    oldPassword: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: t('placeholder.current_enter_password') },
    password: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '새 비밀번호를 입력하세요.' },
    // cardNumber: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '카드번호를 입력하세요.' },
  });

  const { handleModalPassword } = useValid({ params: body, setParams: setBody });

  const handleChange = (name, value, success = 0, error = '') => {
    setBody((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  useEffect(() => {
    console.log(body);
  }, [body]);

  const handleSubmit = async () => {
    const requestParam = { password: body.password.value, oldPassword: body.oldPassword.value };
    try {
      const r = await putPassword(requestParam);
      console.log('r', r);
      if (r.statusCode !== 200) return;
      showSnackbar(t('version2_3.text62'));
      onClose();
    } catch (e) {
      showWarnSnackbar(t('version2_3.text63'));
      console.log('e', e);
    }
  };

  return (
    <>
      <div className="basicPop cardPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text64')}</h1>
        <div className="pBack">
          <div className="tws">
            <dl>
              <dt>
                {t('version2_3.text65')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                <BaseInput
                  type="password"
                  id="oldPassword"
                  placeholder={body.oldPassword?.placeholder}
                  value={body.oldPassword?.value}
                  error={body.oldPassword?.error}
                  maxLength={body.oldPassword?.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </dd>
            </dl>
            <dl>
              <dt>
                {t('version2_3.text66')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                  <PasswordCheck onPassword={handleModalPassword} err={body.password.error} />
                </span>
              </dd>
            </dl>
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_3.text67')} className={'btnB'} onClick={handleSubmit} />
        </div>
      </div>

      {/* {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">알림</h1>
            <div className="pBack">잘못된 정보로 카드 등록에 실패하였습니다.</div>
            <div className="pBtn">
              <BaseButton
                label={'확인'}
                className={'btnB'}
                onClick={() => {
                  setIsModal(false);
                  setIsModal2(true);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}
      {isModal2 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">알림</h1>
            <div className="pBack">카드 정보가 등록되었습니다.</div>
            <div className="pBtn">
              <BaseButton
                label={'확인'}
                className={'btnB'}
                onClick={() => {
                  setIsModal2(false);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )} */}
    </>
  );
};

export default PasswordModal;

import { postMileageCard, putMileageCard, getMileageCard } from '@api/Mileage';
import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent } from '@components/common';
import { useSnack } from '@components/hooks';
import { CheckSet } from '@components/ui';
import UserStore from '@store/UserStore';
import { strToLength } from '@utils/common';
import CryptoJS from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * 카드정보 등록/수정
 * @param {*} param0
 * @returns
 */
const CardModal = ({ onChange, onClose, prev }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = UserStore();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);

  const [mode, setMode] = useState();

  const items = [
    { name: t('card_modal.social_security'), value: 0 },
    { name: t('card_modal.business_license'), value: 1 },
  ];
  const [selectedItem, setSelectedItem] = useState(0);

  const [body, setBody] = useState({
    cardNumber: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '카드번호를 입력하세요.' },
    idNum: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 6, placeholder: '앞 6자리', emptyMessage: '인증번호 입력하세요.' },
    cardPassword: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 2, placeholder: '비밀번호 앞 두자리', emptyMessage: '비밀번호 앞 두자리를 입력하세요.' },
    cardExpire: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: 'MM/YY.', maxLength: 5, emptyMessage: '유효기간을 입력하세요.' },
    email: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: '이메일을 입력하세요.', maxLength: 20 },
  });

  const [agree, setAgree] = useState({
    modal_isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
    isTemp: { value: true, type: 'boolean', isRequired: true, error: '', check: 1, success: 1, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
  });

  const [cardNum1, setCardNum1] = useState('');
  const [cardNum2, setCardNum2] = useState('');
  const [cardNum3, setCardNum3] = useState('');
  const [cardNum4, setCardNum4] = useState('');

  useEffect(() => {
    if (strToLength(cardNum1) !== 0 && strToLength(cardNum2) !== 0 && strToLength(cardNum3) !== 0 && strToLength(cardNum4) !== 0) {
      setBody((prev) => ({
        ...prev,
        ['cardNumber']: { ...prev['cardNumber'], error: '' },
      }));
    }
  }, [cardNum1, cardNum2, cardNum3, cardNum4]);

  const cardNum1Ref = useRef(null);
  const cardNum2Ref = useRef(null);
  const cardNum3Ref = useRef(null);
  const cardNum4Ref = useRef(null);

  const [bisNum1, setBisNum1] = useState('');
  const [bisNum2, setBisNum2] = useState('');
  const [bisNum3, setBisNum3] = useState('');
  const [bisError, setBisError] = useState('');

  const bisNum1Ref = useRef(null);
  const bisNum2Ref = useRef(null);
  const bisNum3Ref = useRef(null);

  const handleInputChange = (e, nextRef) => {
    const { value, maxLength } = e.target;
    if (value.length === maxLength && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleKeyDown = (e, prevRef) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      if (prevRef) {
        prevRef.current.focus();
      }
    }
  };

  const handleChange = (name, value, success = 0, error = '') => {
    setBody((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;

    setAgree((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: checked, success: checked ? 1 : 0 },
    }));
  };

  const handleSubmit = async () => {
    let errorMsg = '';
    let inProgress = true;

    const p = { ...body };
    const b = {};
    for (const key in p) {
      if (p[key].isRequired) {
        if (key === 'cardNumber') {
          if (strToLength(cardNum1) === 0 || strToLength(cardNum2) === 0 || strToLength(cardNum3) === 0 || strToLength(cardNum4) === 0) {
            inProgress = false;
            handleChange(key, '', 0, p[key].emptyMessage || p[key].placeholder);
          } else {
            b[key] = cardNum1 + '-' + cardNum2 + '-' + cardNum3 + '-' + cardNum4;
          }
        } else {
          if (key === 'idNum') {
            if (selectedItem == '0') {
              if (strToLength(p[key].value) === 0) {
                inProgress = false;
                handleChange(key, '', 0, p[key].emptyMessage || p[key].placeholder);
              } else {
                b[key] = p[key].value;
              }
            }
          } else {
            if (strToLength(p[key].value) === 0) {
              inProgress = false;
              handleChange(key, '', 0, p[key].emptyMessage || p[key].placeholder);
            } else {
              b[key] = p[key].value;
            }
          }
        }
      }
    }

    if (selectedItem === 1) {
      if (strToLength(bisNum1) === 0 || strToLength(bisNum2) === 0 || strToLength(bisNum3) === 0) {
        inProgress = false;
        setBisError(t('version2_3.text27'));
      } else {
        b['idNum'] = bisNum1 + '-' + bisNum2 + '-' + bisNum3;
      }
    }

    if (!inProgress) {
      return;
    }

    if (!agree.modal_isConfirm.value) {
      showWarnSnackbar(t('charge_modal.check_note'));
      return;
    }

    b['idNumType'] = selectedItem;
    b['buyerName'] = user.memberName; // 이름
    b['userEmail'] = user.memberEmail; // 이메일

    const secretKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY_IV);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(b), secretKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const result = encrypted.toString();
    if (mode === 'modify') {
      try {
        const r = await putMileageCard(encodeURIComponent(result));
        const { data } = r;

        if (Boolean(Number(data))) {
          if (onChange) {
            onChange();
          } else {
            setIsModal2(true);
          }
        } else {
        }
      } catch (e) {
        // console.log(e.response.data);
        setIsModal(true);
      }
    } else {
      try {
        const r = await postMileageCard(encodeURIComponent(result));
        const { data } = r;

        if (Boolean(Number(data))) {
          if (onChange) {
            onChange();
          } else {
            setIsModal2(true);
          }
        } else {
        }
      } catch (e) {
        // console.log(e.response.data);
        setIsModal(true);
      }
    }
  };

  const fetchCard = async () => {
    const r = await getMileageCard();
    const { data } = r;

    if (data) {
      setMode('modify');

      const idNumType = Number(data.idNumType);
      setSelectedItem(idNumType);
      if (idNumType === 1) {
        const idNum = data?.idNum.split('-');
        setBisNum1(idNum[0]);
        setBisNum2(idNum[1]);
        setBisNum3(idNum[2]);
      }
      setBody((prev) => {
        const idNum = idNumType === 0 ? { ...prev['idNum'], value: data.idNum } : { ...prev['idNum'] };
        return {
          ...prev,
          ['cardPassword']: { ...prev['cardPassword'], value: data.cardPassword },
          ['cardExpire']: { ...prev['cardExpire'], value: data.cardMonth + '/' + data.cardYear },
          ['idNum']: idNum,
        };
      });

      const card = data?.cardNumber.split('-');
      setCardNum1(card[0]);
      setCardNum2(card[1]);
      setCardNum3(card[2]);
      setCardNum4(card[3]);
    }
  };

  useEffect(() => {
    fetchCard();
  }, []);

  return (
    <>
      <div className="basicPop cardPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('card_modal.info_register')}</h1>
        <div className="pBack">
          <div className="tws">
            {/* <dl>
                <dt>카드사</dt>
                <dd>
                  <BaseSelect items={cards} placeholder={'카드사를 선택해주세요.'} onChange={(e) => console.log(e)} />
                </dd>
              </dl> */}
            {/* <dl>
              <dt>
                휴대폰번호<sup>필수항목</sup>
              </dt>
              <dd>
                <BaseInput
                  type="text"
                  id="phone"
                  placeholder={body.phone.placeholder}
                  value={body.phone.value}
                  error={body.phone.error}
                  maxLength={body.phone.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </dd>
            </dl> */}
            <dl>
              <dt>
                {t('card_modal.number')}
                <sup>필수항목</sup>
              </dt>
              <dd>
                {/* body.cardNumber.error */}
                <div className="cardNum">
                  <BaseInput
                    type="text"
                    id="cardNum1"
                    placeholder={'0000'}
                    value={cardNum1}
                    maxLength={4}
                    onChange={(e) => {
                      setCardNum1(e.target.value);
                      handleInputChange(e, cardNum2Ref);
                    }}
                    ref={cardNum1Ref}
                  />
                  <em>-</em>
                  <BaseInput
                    type="password"
                    id="cardNum2"
                    placeholder={'0000'}
                    value={cardNum2}
                    maxLength={4}
                    onChange={(e) => {
                      setCardNum2(e.target.value);
                      handleInputChange(e, cardNum3Ref);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, cardNum1Ref)}
                    ref={cardNum2Ref}
                  />
                  <em>-</em>
                  <BaseInput
                    type="password"
                    id="cardNum3"
                    placeholder={'0000'}
                    value={cardNum3}
                    maxLength={4}
                    onChange={(e) => {
                      setCardNum3(e.target.value);
                      handleInputChange(e, cardNum4Ref);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, cardNum2Ref)}
                    ref={cardNum3Ref}
                  />
                  <em>-</em>
                  <BaseInput
                    type="text"
                    id="cardNum4"
                    placeholder={'0000'}
                    value={cardNum4}
                    maxLength={4}
                    onChange={(e) => {
                      setCardNum4(e.target.value);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, cardNum3Ref)}
                    ref={cardNum4Ref}
                  />
                </div>
                {body.cardNumber.error && <p className="errorP">{body.cardNumber.error}</p>}
              </dd>
            </dl>

            <div>
              {/* <dl>
                <dt>CVC번호</dt>
                <dd>
                  <BaseInput
                    type="text"
                    id="cardCvc"
                    placeholder={body.cardCvc.placeholder}
                    value={body.cardCvc.value}
                    error={body.cardCvc.error}
                    maxLength={body.cardCvc.maxLength}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </dd>
              </dl> */}
              <dl>
                <dt>
                  {t('card_modal.card_pw')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseInput
                    type="password"
                    id="cardPassword"
                    placeholder={body.cardPassword.placeholder}
                    value={body.cardPassword.value}
                    error={body.cardPassword.error}
                    maxLength={body.cardPassword.maxLength}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('card_modal.validation')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseInput
                    type="text"
                    id="cardExpire"
                    placeholder={body.cardExpire.placeholder}
                    value={body.cardExpire.value}
                    error={body.cardExpire.error}
                    maxLength={body.cardExpire.maxLength}
                    onChange={(e) => {
                      let input = e.target.value.replace(/\D/g, '');

                      if (input.length > 2) {
                        input = input.slice(0, 2) + '/' + input.slice(2);
                      }
                      handleChange(e.target.id, input);
                    }}
                  />
                </dd>
              </dl>
            </div>

            {/* <div>
              <dl>
                <dt>카드 비밀번호</dt>
                <dd>
                  <BaseInput type="text" placeholder="비밀번호 앞 두자리" />
                </dd>
              </dl>
              <dl>
                <dt>이름</dt>
                <dd>
                  <BaseInput type="text" placeholder="카드 소유자명" />
                </dd>
              </dl>
            </div> */}

            <div>
              <dl>
                <dt>
                  {t('card_modal.auth_type')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseSelect items={items} selectedValue={selectedItem} onChange={(e) => setSelectedItem(e.value)} />
                </dd>
              </dl>
              {selectedItem === 0 && (
                <dl>
                  <dt>
                    {t('card_modal.social_security')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      type="text"
                      id="idNum"
                      placeholder={body.idNum.placeholder}
                      value={body.idNum.value}
                      error={body.idNum.error}
                      maxLength={body.idNum.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                  </dd>
                </dl>
              )}
              {selectedItem === 1 && (
                <dl>
                  <dt>
                    {t('card_modal.business_license')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="cardNum">
                      <BaseInput
                        type="text"
                        id="bisNum1"
                        placeholder={'000'}
                        value={bisNum1}
                        maxLength={3}
                        onChange={(e) => {
                          setBisNum1(e.target.value);
                          handleInputChange(e, bisNum2Ref);
                        }}
                        ref={bisNum1Ref}
                      />
                      <em>-</em>
                      <BaseInput
                        type="text"
                        id="cardNum2"
                        placeholder={'00'}
                        value={bisNum2}
                        maxLength={2}
                        onChange={(e) => {
                          setBisNum2(e.target.value);
                          handleInputChange(e, bisNum3Ref);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, bisNum1Ref)}
                        ref={bisNum2Ref}
                      />
                      <em>-</em>
                      <BaseInput
                        type="text"
                        id="cardNum3"
                        placeholder={'00000'}
                        value={bisNum3}
                        maxLength={5}
                        onChange={(e) => {
                          setBisNum3(e.target.value);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, bisNum2Ref)}
                        ref={bisNum3Ref}
                      />
                    </div>
                    {bisError && <p className="errorP">{bisError}</p>}
                  </dd>
                </dl>
              )}
            </div>
            {/* <dl>
              <dt>이메일</dt>
              <dd>
                <BaseInput
                  type="text"
                  id="email"
                  placeholder={body.email.placeholder}
                  value={body.email.value}
                  error={body.email.error}
                  maxLength={body.email.maxLength}
                  onChange={(e) => handleChange(e.target.id, e.target.value)}
                />
              </dd>
            </dl> */}
          </div>
          <span className="checkBack">
            <CheckSet id={'modal_isConfirm'} onChange={handleCheck} value={agree.modal_isConfirm.value} label={t('card_modal.agree')} />

            <input type="button" value="more" className="more" />
          </span>
        </div>
        <div className="pBtn">
          <BaseButton label={mode === 'modify' ? t('base.mutate') : t('mileage.register')} className={'btnB'} onClick={handleSubmit} />
          {/* <BaseButton label={'등록하기'} className={'btnB'} onClick={() => setIsModal(true)} /> */}
        </div>
      </div>

      {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">{t('card_modal.fail')}</div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  setIsModal(false);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}

      {isModal2 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">{t('notify.card_registered')}</div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  setIsModal2(false);
                  if (prev) navigate(prev);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}
    </>
  );
};

export default CardModal;

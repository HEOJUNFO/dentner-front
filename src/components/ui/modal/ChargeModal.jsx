import { getMileage, getMileageCard, postMileageCharge, postEPAY, postEPAYEnd, postPaypalPAY, postPaypalPAYEnd } from '@api/Mileage';
import UserStore from '@store/UserStore';
import { useSnack } from '@components/hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton, BaseInput, ModalAlertPresent, ModalPresent } from '@components/common';
import { CardModal, CheckSet } from '@components/ui';
import { withCommas, maskCardNumber } from '@utils/common';
import CryptoJS from 'crypto-js';
import PolicyModal from './PolicyModal';
import Terms1 from './Terms_1';
import Terms2 from './Terms_2';
import Terms3 from './Terms_3';
import * as PortOne from '@portone/browser-sdk/v2';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';

const ChargeModal = ({ onCharge, onClose }) => {
  const { user, mileage, setMileage } = UserStore();
  const navigate = useNavigate();
  const isMobile = useWindowSize();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const { t, i18n } = useTranslation();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setIsModal4] = useState(false); // 등록카드 없음 모달
  const [isModal7, setIsModal7] = useState(false); // 등록카드 완료 모달
  const [isModal8, setIsModal8] = useState(false); // 이용약관 모달

  const [agree, setAgree] = useState({
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
    isTemp: { value: true, type: 'boolean', isRequired: true, error: '', check: 1, success: 1, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
  });

  const [card, setCard] = useState();

  const [selectedMileage, setSelectedMileage] = useState(0);
  const [direct, setDirect] = useState(false);
  const [chargeMileage, setChargeMileage] = useState([]);

  const [isDisabled, setDisabled] = useState(false);
  const [chargeType, setChargeType] = useState('A'); // 일반결제, 간편결제 내국인
  const [chargeForeignerType, setChargeForeignerType] = useState('A'); // 카드결제, 페이팔결제 외국인
  const [paypalReq, setPaypalReq] = useState();
  const [isPaypal, setPaypal] = useState(false);

  const charging = () => {
    if (user?.memberTp === 'B') {
      return {
        ko: [
          {
            name: 'charging',
            title: '10',
            value: 10,
            label: (
              <>
                <em>10</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '30',
            value: 30,
            label: (
              <>
                <em>30</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '50',
            value: 50,
            label: (
              <>
                <em>50</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '100',
            value: 100,
            label: (
              <>
                <em>100</em> P($)
              </>
            ),
          },
        ],
        en: [
          {
            name: 'charging',
            title: '10',
            value: 10,
            label: (
              <>
                <em>10</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '30',
            value: 30,
            label: (
              <>
                <em>30</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '50',
            value: 50,
            label: (
              <>
                <em>50</em> P($)
              </>
            ),
          },
          {
            name: 'charging',
            title: '100,000',
            value: 100,
            label: (
              <>
                <em>100</em> P($)
              </>
            ),
          },
        ],
      };
    }
    return {
      ko: [
        {
          name: 'charging',
          title: '10,000',
          value: 10000,
          label: (
            <>
              <em>10,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '30,000',
          value: 30000,
          label: (
            <>
              <em>30,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '50,000',
          value: 50000,
          label: (
            <>
              <em>50,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '100,000',
          value: 100000,
          label: (
            <>
              <em>100,000</em> P(￦)
            </>
          ),
        },
      ],
      en: [
        {
          name: 'charging',
          title: '10,000',
          value: 10000,
          label: (
            <>
              <em>10,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '30,000',
          value: 30000,
          label: (
            <>
              <em>30,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '50,000',
          value: 50000,
          label: (
            <>
              <em>50,000</em> P(￦)
            </>
          ),
        },
        {
          name: 'charging',
          title: '100,000',
          value: 100000,
          label: (
            <>
              <em>100,000</em> P(￦)
            </>
          ),
        },
      ],
    };
  };

  // 마일리지 충전
  // 마일리지 구분 (A:충전, B:결제, C:충전환불, D:결제환불)
  // 마일리지 단위(A:원화, B:달러)
  const handleSubmit = async () => {
    if (selectedMileage === 0 || !selectedMileage) {
      // 충전할 마일리지를 선택하세요.
      showWarnSnackbar(t('charge_modal.select_mileage'));
      return;
    }

    if (chargeType === 'A') {
      // 등록카드 결제
      if (!card?.cardNo) {
        // showWarnSnackbar('등록된 카드가 없습니다.');
        setIsModal4(true);
        return;
      }

      if (!agree.isConfirm.value) {
        showWarnSnackbar(t('charge_modal.check_note'));
        return;
      }

      const body = {
        mileageSe: 'A',
        mileageAmount: selectedMileage,
        mileageUnit: user.memberTp === 'A' ? 'A' : 'B',
        cardNo: card?.cardNo,
      };

      try {
        const r = await postMileageCharge(body);
        const { data } = r;
        if (Boolean(Number(data))) {
          fetchMileage();
          if (onCharge) {
            onCharge();
          } else {
            setIsModal2(true);
          }
        } else {
          setIsModal(true);
        }
      } catch (e) {
        console.log(e);
        setIsModal(true);
      }
    } else {
      // 간편결제

      if (!agree.isConfirm.value) {
        showWarnSnackbar(t('charge_modal.check_note'));
        return;
      }

      try {
        const r = await postEPAY(selectedMileage);
        const { data } = r;
        if (data?.moid) {
          innopay?.goPay({
            //// 필수 파라미터
            PayMethod: 'EPAY', // 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)
            // MID: 'testpay01m', // 가맹점 MID
            // MerchantKey: 'Ma29gyAFhvv/+e4/AHpV6pISQIvSKziLIbrNoXPbRS5nfTx2DOs8OJve+NzwyoaQ8p9Uy1AN4S1I0Um5v7oNUg==', // 가맹점 라이센스키
            MID: import.meta.env.VITE_PG_MID, // 가맹점 MID
            MerchantKey: import.meta.env.VITE_PG_MID_LICENSE_Key, // 가맹점 라이센스키
            GoodsName: `${t('version2_3.text13')} (${withCommas(selectedMileage)})`, // 상품명
            Amt: selectedMileage, // 결제금액(과세)
            BuyerName: user?.memberName, // 고객명
            BuyerTel: user?.memberHp, // 고객전화번호
            BuyerEmail: user?.memberEmail, // 고객이메일
            ResultYN: 'N', // 결제결과창 출력유뮤
            Moid: data?.moid, // 가맹점에서 생성한 주문번호 셋팅
            //// 선택 파라미터
            //ReturnURL: '', // 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)
            //			ArsConnType:'02', 							///* ARS 결제 연동시 필수 01:호전환, 02(가상번호), 03:대표번호 */
            //			FORWARD:'',									// 결제창 연동방식 (X:레이어, 기본값)
            //			GoodsCnt:'',									// 상품갯수 (가맹점 참고용)
            //			MallReserved:'',								// 가맹점 데이터
            //			OfferingPeriod:'',								// 제공기간
            //			DutyFreeAmt:'',								// 결제금액(복합과세/면세 가맹점의 경우 금액설정)
            //			EncodingType:'utf-8',						// 가맹점 서버 인코딩 타입 (utf-8, euc-kr)
            //			MallIP:'',											// 가맹점 서버 IP
            //			UserIP:'',											// 고객 PC IP
            //			mallUserID:'',									// 가맹점 고객ID
            //			User_ID:'',										// Innopay에 등록된 영업사원ID
            Currency: '', // 통화코드가 원화가 아닌 경우만 사용(KRW/USD)
          });
        } else {
          showWarnSnackbar('네트워크 오류');
        }
      } catch (e) {
        console.log(e);
        showWarnSnackbar('네트워크 오류');
      }
    }
  };

  const handleForeignerSubmit = async () => {
    if (selectedMileage === 0 || !selectedMileage) {
      // 충전할 마일리지를 선택하세요.
      showWarnSnackbar(t('charge_modal.select_mileage'));
      return;
    }

    if (chargeForeignerType === 'A') {
      if (!agree.isConfirm.value) {
        showWarnSnackbar(t('charge_modal.check_note'));
        return;
      }

      try {
        const r = await postEPAY(selectedMileage);
        const { data } = r;
        if (data?.moid) {
          const amt = Number(selectedMileage) * 100;
          innopay?.goPay({
            //// 필수 파라미터
            PayMethod: 'OPCARD', // 결제수단(CARD,BANK,VBANK,CARS,CSMS,DSMS,EPAY,EBANK)
            MID: import.meta.env.VITE_PG_FOREIGNER_MID, // 가맹점 MID
            MerchantKey: import.meta.env.VITE_PG_MID_LICENSE_FOREIGNER_Key, // 가맹점 라이센스키
            GoodsName: `${t('version2_3.text13')} (${withCommas(selectedMileage)})`, // 상품명
            Amt: amt.toString(), // 결제금액(과세)
            BuyerName: user?.memberName, // 고객명
            BuyerTel: user?.memberHp, // 고객전화번호
            // BuyerEmail: 'park6383@Naver.com', // 고객이메일
            BuyerEmail: user?.memberEmail, // 고객이메일
            ResultYN: 'N', // 결제결과창 출력유뮤
            Moid: data?.moid, // 가맹점에서 생성한 주문번호 셋팅
            ReturnURL: '',
            //// 선택 파라미터
            //ReturnURL: '', // 결제결과 전송 URL(없는 경우 아래 innopay_result 함수에 결제결과가 전송됨)
            //			ArsConnType:'02', 							///* ARS 결제 연동시 필수 01:호전환, 02(가상번호), 03:대표번호 */
            //			FORWARD:'',									// 결제창 연동방식 (X:레이어, 기본값)
            //			GoodsCnt:'',									// 상품갯수 (가맹점 참고용)
            //			MallReserved:'',								// 가맹점 데이터
            //			OfferingPeriod:'',								// 제공기간
            //			DutyFreeAmt:'',								// 결제금액(복합과세/면세 가맹점의 경우 금액설정)
            //			EncodingType:'utf-8',						// 가맹점 서버 인코딩 타입 (utf-8, euc-kr)
            //			MallIP:'',											// 가맹점 서버 IP
            //			UserIP:'',											// 고객 PC IP
            //			mallUserID:'',									// 가맹점 고객ID
            //			User_ID:'',										// Innopay에 등록된 영업사원ID
            Currency: 'USD', // 통화코드가 원화가 아닌 경우만 사용(KRW/USD)
          });
        } else {
          showWarnSnackbar('네트워크 오류');
        }
      } catch (e) {
        console.log(e);
        showWarnSnackbar('네트워크 오류');
      }
    } else {
      // 페이팔
      if (!agree.isConfirm.value) {
        showWarnSnackbar(t('charge_modal.check_note'));
        return;
      }

      try {
        const r = await postPaypalPAY(selectedMileage);
        const { data } = r;
        if (data?.moid) {
          const requestData = {
            uiType: 'PAYPAL_SPB',
            storeId: 'store-04e6db19-13a5-4c86-a3ff-ccc26cd5c442',
            channelKey: 'channel-key-2a0a9f35-6444-44ad-8b71-5846dcb67aa0',
            paymentId: `payment-${crypto.randomUUID()}`,
            orderName: `${t('version2_3.text13')} (${withCommas(selectedMileage)})`,
            totalAmount: selectedMileage * 100,
            currency: 'USD',
          };

          // PortOne.updateLoadPaymentUIRequest(requestData);

          const payEndSubmit = async (data) => {
            const secretKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY);
            const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY_IV);
            const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
              iv: iv,
              padding: CryptoJS.pad.Pkcs7,
              mode: CryptoJS.mode.CBC,
            });

            try {
              const result = encrypted.toString();

              const r = await postPaypalPAYEnd(encodeURIComponent(result));
              const { data } = r;
              if (Boolean(Number(data))) {
                fetchMileage();
                if (onCharge) {
                  onCharge();
                } else {
                  setIsModal2(true);
                }
              } else {
                showWarnSnackbar('네트워크 오류');
                // setIsModal(true);
              }
              // console.log(r);
            } catch (e) {
              console.log(e);
            }
          };

          const init = async (requestData, moid, selectedMileage) => {
            const response = await PortOne.loadPaymentUI(requestData, {
              onPaymentSuccess: (response) => {
                // setResult(response);
                // requestData.
                const r = { ...response, moId: moid, GoodsName: requestData.orderName, Amt: selectedMileage };
                payEndSubmit(r);
              },
              onPaymentFail: (error) => {
                // const r = {
                //   paymentId: '결제건 ID',
                //   transactionType: '결제 유형',
                //   txId: '결제건 포트원 내부 채번 ID',
                //   moId: moid,
                //   GoodsName: requestData.orderName,
                //   Amt: selectedMileage,
                // };
                // console.log(r);
                // payEndSubmit(r);
              },
            });
          };
          init(requestData, data?.moid, selectedMileage);

          setTimeout(() => {
            setPaypal(true);
          }, 500);
        }
      } catch (e) {
        showWarnSnackbar('네트워크 오류');
      }
    }
  };

  // 간편결제 완료시 이노페이에서 return 해주는 함수
  window.innopay_result = async (data) => {
    const secretKey = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY);
    const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_SECRET_KEY_IV);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    try {
      const result = encrypted.toString();

      const r = await postEPAYEnd(encodeURIComponent(result), user?.memberTp);
      const { data } = r;
      if (Boolean(Number(data))) {
        fetchMileage();
        if (onCharge) {
          onCharge();
        } else {
          setIsModal2(true);
        }
      } else {
        showWarnSnackbar('네트워크 오류');
        // setIsModal(true);
      }
      // console.log(r);
    } catch (e) {
      console.log(e);
    }
  };

  // 내 마일리지 조회
  const fetchMileage = async () => {
    const r = await getMileage();
    if (r?.data) {
      setMileage(r?.data);
    }
  };

  // 등록 카드 조회
  const fetchCard = async () => {
    const r = await getMileageCard();
    const { data } = r;
    if (data) {
      setCard(data);
    } else {
    }
  };

  // 카드등록 모달
  const handleCard = () => {
    if (isMobile) {
      navigate('/cardInfo', {state: {prev: '/mileageCharge'}})
    }
    setIsModal3(true);
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;

    setAgree((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: checked, success: checked ? 1 : 0 },
    }));
  };

  useEffect(() => {
    fetchMileage();
    fetchCard();
  }, []);

  useEffect(() => {
    if (user?.memberTp === 'B') {
      //해외결제
      //기존국내결제 스크립트가 존재시 삭제
      const isScript = document.querySelector(`script[src="https://pg.innopay.co.kr/ipay/js/innopay-2.0.js"]`);
      if (isScript) {
        document.body.removeChild(isScript);
      }

      if (document.querySelector(`script[src="https://pg.innopay.co.kr/ipay/js/innopay_overseas-2.0.js"]`)) {
        return;
      }

      // 스크립트를 동적으로 생성하여 추가
      const script = document.createElement('script');
      script.src = 'https://pg.innopay.co.kr/ipay/js/innopay_overseas-2.0.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Script loaded successfully.');
      };
    } else {
      const isScript = document.querySelector(`script[src="https://pg.innopay.co.kr/ipay/js/innopay_overseas-2.0.js"]`);
      if (isScript) {
        document.body.removeChild(isScript);
      }

      if (document.querySelector(`script[src="https://pg.innopay.co.kr/ipay/js/innopay-2.0.js"]`)) {
        return;
      }

      // 스크립트를 동적으로 생성하여 추가
      const script = document.createElement('script');
      script.src = 'https://pg.innopay.co.kr/ipay/js/innopay-2.0.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Script loaded successfully.');
      };
    }
  }, [user]);

  useEffect(() => {
    const c = charging();
    setChargeMileage(c[i18n.language]);
  }, [i18n.language]);

  return (
    <>
      <div className="basicPop chargePop" style={{ display: 'block' }}>
        {!isPaypal && <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />}
        <h1 className="pt">{t('charge_modal.title')}</h1>
        <div className="pBack">
          <div style={{ display: isPaypal ? 'none' : 'block' }}>
            <div className="have">
              {t('mileage.own_mileage')}
              <strong>
                {user.memberTp === 'A' && (
                  <>
                    <strong>{withCommas(mileage)}</strong>P(￦)
                  </>
                )}
                {user.memberTp === 'B' && (
                  <>
                    <strong>{withCommas(mileage)}</strong>P($)
                  </>
                )}
              </strong>
            </div>
            <div className="recharge">
              <h2>{t('charge_modal.mileage_tocharge')}</h2>
              <div>
                {chargeMileage.map((el, idx) => {
                  return (
                    <span className="checkSet" key={`recharge_radioSet_${idx}`}>
                      <BaseInput
                        type="radio"
                        id={`recharge_${el.title}_${idx}`}
                        name={el.name}
                        value={el.value}
                        label={el.label || el.title}
                        // checked={selectedMileage == el.value}
                        onChange={(e) => {
                          setSelectedMileage(e.target.value);
                          setDirect(false);
                        }}
                      />
                    </span>
                  );
                })}

                <span>
                  <span className="checkSet">
                    <input
                      type="radio"
                      id="checkbox5"
                      name="charging"
                      onChange={(e) => {
                        setSelectedMileage('');
                        setDirect(true);
                      }}
                    />
                    <label htmlFor="checkbox5">{t('base.input_manually')}</label>
                  </span>
                  <BaseInput
                    type="text"
                    value={selectedMileage}
                    maxLength={9}
                    onChange={(e) => {
                      if (!e.target.value.match(/\D/g)) setSelectedMileage(e.target.value);
                    }}
                    placeholder={t('mileage.manually')}
                    style={{ display: `${direct ? 'block' : 'none'}` }}
                  />
                </span>
              </div>
              <p>
                {t('base.pay_amount')}
                <span>
                  <strong>{withCommas(selectedMileage)}</strong>
                  {user?.memberTp === 'B' && <>$</>}
                  {user?.memberTp === 'A' && <>{t('base.won')} </>}
                </span>
              </p>
            </div>
            {user?.memberTp === 'A' && (
              <div className="cardInfo">
                <h2> {t('charge_modal.card_info')}</h2>
                <div className="cardChoice">
                  <button className={`choiceBtn ${chargeType === 'A' ? 'on' : ''}`} onClick={() => setChargeType('A')}>
                    {t('charge_modal.pay_normal_or')}
                  </button>
                  <button className={`choiceBtn ${chargeType === 'B' ? 'on' : ''}`} onClick={() => setChargeType('B')}>
                    {t('version2_3.text14')}
                  </button>
                  {/* <button className="pay naverCase">
                <em>Naver Pay</em>
              </button> */}
                  {/* <button className="pay kakaoCase">
                <em>Kakao Pay</em>
              </button> */}
                </div>
                <div className="myCardInfo">
                  <strong>
                    {t('mileage.mycard')}
                    {card && (
                      <span>
                        <i>{card?.cardCompanyNoName}</i>
                        <em>{maskCardNumber(card?.cardNumber || '')}</em>
                      </span>
                    )}
                    {!card && (
                      <span>
                        <em>{t('mileage.not_registered')}</em>
                      </span>
                    )}
                  </strong>
                  <BaseButton label={card ? t('mileage.change_card') : t('mileage.register')} className={card ? 'btnL ss' : 'btnB ss'} onClick={handleCard} />
                </div>
                <span className="checkBack">
                  <CheckSet id={'isConfirm'} onChange={handleCheck} value={agree.isConfirm.value} label={t('charge_modal.agree_payment')} />
                  <input type="button" value="more" className="more" onClick={() => setIsModal8(true)} />
                </span>
              </div>
            )}

            {card && user?.memberTp === 'A' && <p className="willyou">{t('charge_modal.contiunally_payment')}</p>}

            {/* 외국인 */}
            {user?.memberTp === 'B' && (
              <div className="cardInfo">
                <h2> {t('charge_modal.card_info')}</h2>
                <div className="cardChoice">
                  <button className={`choiceBtn ${chargeForeignerType === 'A' ? 'on' : ''}`} onClick={() => setChargeForeignerType('A')}>
                    {t('charge_modal.pay_normal_or')}
                  </button>
                  <button className={`choiceBtn ${chargeForeignerType === 'B' ? 'on' : ''}`} onClick={() => setChargeForeignerType('B')}>
                    {t('version2_3.text14')}
                  </button>
                </div>

                <span className="checkBack">
                  <CheckSet id={'isConfirm'} onChange={handleCheck} value={agree.isConfirm.value} label={t('charge_modal.agree_payment')} />
                  <input type="button" value="more" className="more" onClick={() => setIsModal8(true)} />
                </span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 10, display: isPaypal ? 'block' : 'none' }}>
            <div className="portone-ui-container"></div>
          </div>
        </div>
        {isPaypal && (
          <div className="pBtn">
            <BaseButton label={'취소'} className={'btnB'} onClick={() => setPaypal(false)} />
          </div>
        )}
        {!isPaypal && (
          <div className="pBtn">
            {user?.memberTp === 'A' && <BaseButton label={t('mileage.charge')} className={'btnB'} disabled={isDisabled} onClick={handleSubmit} />}
            {user?.memberTp === 'B' && <BaseButton label={t('mileage.charge')} className={'btnB'} onClick={handleForeignerSubmit} />}
            {/* <BaseButton label={'충전하기'} className={'btnB'} disabled={isDisabled} onClick={() => setIsModal(true)} /> */}
          </div>
        )}
      </div>

      {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">{t('error.try_again')}</div>
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
            <h1 className="pt">알림</h1>
            <div className="pBack">마일리지가 충전되었습니다.</div>
            <div className="pBtn">
              <BaseButton
                label={'확인'}
                className={'btnB'}
                onClick={() => {
                  setIsModal2(false);
                  navigate('/mileage');
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}

      {/* 카드등록 모달 */}
      {isModal3 && (
        <ModalPresent>
          <CardModal
            onChange={() => {
              fetchCard();
              setIsModal3(false);
              setIsModal7(true);
            }}
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 카드정보없는 경우 */}
      {isModal4 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">
              {t('charge_modal.not_registered_card')} <br />
              {t('charge_modal.register_card')}
            </div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  setIsModal4(false);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}

      {isModal7 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack"> {t('notify.card_registered')}</div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  setIsModal7(false);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}
      {isModal8 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <div className="basicPop policyePop" style={{ display: 'block' }}>
              <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => setIsModal8()} />
              <h1 className="pt">{t('footer.links.terms_of_service')}</h1>
              <div className="pBack">
                <div className="agreeDtBack" style={{ overflowX: 'scroll' }}>
                  <Terms1 />
                  <Terms2 />
                  <Terms3 />
                </div>
              </div>
              <div className="pBtn">
                <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => {}} />
              </div>
            </div>
          </div>
        </ModalAlertPresent>
      )}
    </>
  );
};

export default ChargeModal;

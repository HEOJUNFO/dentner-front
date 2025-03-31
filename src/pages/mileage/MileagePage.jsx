import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import ChargeModal from '../../components/ui/modal/ChargeModal';
import CardModal from '../../components/ui/modal/CardModal';
import PayRefundModal from '../../components/ui/modal/PayRefundModal';
import ChargeRefundModal from '../../components/ui/modal/ChargeRefundModal';
import HaveRefundModal from '../../components/ui/modal/HaveRefundModal';
import { ModalPresent } from '@components/common';
import { ModalAlertPresent } from '@components/common';
import ChargingDetail from './components/ChargingDetail';
import useMileagePage from './hooks/useMileagePage';
import { head } from 'lodash';
import PaymentDetail from './components/PaymentDetail';
import { withCommas, maskCardNumber } from '@utils/common';
import { useTranslation } from 'react-i18next';

const MileagePage = () => {
  const {
    isLoading,
    error,
    isMobile,
    refChargingDetail,
    user,
    mileage,
    card,
    fetchCard,
    handleCharge,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    isModal7,
    setIsModal7,
    navigate,
    isChargeRefundModal,
    setIsChargeRefundModal,
    isPayRefundModal,
    setIsPayRefundModal,
  } = useMileagePage();
  const { t } = useTranslation();

  const [isModal4, setIsModal4] = useState(false);
  const [isModal5, setIsModal5] = useState(false);
  const [isModal6, setIsModal6] = useState(false);

  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };

  return (
    <>
      <section>
        <h2>{t('mileage.title')}</h2>
        <div className="mileageWrap">
          <div className="mileageTop">
            <div className="mSummery">
              <div>
                <dl>
                  <dt>{t('mileage.own_mileage')}</dt>
                  <dd>
                    {user.memberTp === 'A' && (
                      <span>
                        <em>{withCommas(mileage)}</em>P(￦)
                      </span>
                    )}
                    {user.memberTp === 'B' && (
                      <span>
                        <em>{withCommas(mileage)}</em>P($)
                      </span>
                    )}
                  </dd>
                </dl>
                <span className="right">
                  <BaseButton label={t('mileage.charge')} className={'btnB ss'} onClick={handleCharge} />
                </span>
              </div>
              <div>
                {user?.memberTp === 'A' && (
                  <>
                    <dl>
                      <dt>{t('mileage.mycard')}</dt>
                      <dd>
                        {card && (
                          <span className="myCard">
                            <i>{card?.cardCompanyNoName}</i>
                            <em>{maskCardNumber(card?.cardNumber || '')}</em>
                          </span>
                        )}
                        {!card && (
                          <span>
                            <em>{t('mileage.not_registered')}</em>
                          </span>
                        )}
                      </dd>
                    </dl>
                    <span className="right">
                      <BaseButton
                        label={card ? t('mileage.change_card') : t('mileage.register')}
                        className={card ? 'btnL ss' : 'btnB ss'}
                        onClick={() => {
                          if (isMobile) {
                            navigate('/cardInfo', {state: {prev: '/mileage'}})
                          } else {
                            setIsModal3(true);
                          }
                        }}
                      />
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="infoNotes">
              <dl>
                <dt>{t('mileage.guide.title')}</dt>
                <dd>
                  <strong>{`[${t('mileage.guide.refund_charged')}]`}</strong>
                  {`[${t('mileage.guide.refundable')}]`} <span>{`(${t('mileage.guide.duedate')})`}</span>
                </dd>
                <dd>
                  <strong>{`[${t('mileage.guide.refund_own')}]`}</strong>
                  {t('mileage.guide.unable_partial')}
                </dd>
                <dd>
                  <strong>{`[${t('mileage.guide.refund_used')}]`}</strong>
                  {t('mileage.guide.cautiously_request')} <span>{`(${t('mileage.guide.partially_refundable')})`}</span>
                </dd>
              </dl>
            </div>
          </div>

          <div className="tabNav mileageTab">
            <nav className="center">
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>{t('mileage.charge_history')}</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>{t('mileage.pay_history')}</button>
                </li>
              </ul>
            </nav>
          </div>
          <article className={`${tab === 1 ? 'mOn' : ''}`}>
            {/* 마일리지 충전내역 */}
            <ChargingDetail ref={refChargingDetail} />
          </article>

          <article className={`${tab === 2 ? 'mOn' : ''}`}>
            {/* 마일리지 결제내역 */}
            <PaymentDetail />
          </article>
        </div>
      </section>

      {/* {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">알림</h1>
            <div className="pBack">
              등록된 카드 정보가 없습니다. <br />내 카드 정보를 등록해주세요.
            </div>
            <div className="pBtn">
              <BaseButton
                label={'확인'}
                className={'btnB'}
                onClick={() => {
                  setIsModal(false);
                  setIsModal3(true);
                  // setCardOn(true);
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )} */}

      {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">{t('notify.mileage_charged')}</div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  if (refChargingDetail.current) {
                    refChargingDetail.current.fetch();
                  }
                  setIsModal(false);
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
            <div className="pBack">{t('notify.card_registered')}</div>
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

      {/* 마일리지 충전 */}
      {isModal2 && (
        <ModalPresent>
          <ChargeModal
            onCharge={() => {
              setIsModal2(false);
              setIsModal(true);
              fetchCard();
            }}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 카드등록 */}
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

      {/* 밑으로 진행중 */}
      {isModal4 && (
        <ModalPresent>
          <PayRefundModal
            onClose={() => {
              setIsModal4(false);
            }}
          />
        </ModalPresent>
      )}

      {isModal5 && (
        <ModalPresent>
          <ChargeRefundModal
            onClose={() => {
              setIsModal5(false);
            }}
          />
        </ModalPresent>
      )}

      {isModal6 && (
        <ModalPresent>
          <HaveRefundModal
            onClose={() => {
              setIsModal6(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default MileagePage;

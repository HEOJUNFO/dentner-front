import React, { useEffect, useState } from 'react';
import { BaseButton } from '@components/common';
import { ModalAlertPresent } from '@components/common';
import useMileageOfficePage from '../../../pages/mileage/hooks/useMileageOfficePage';
import { withCommas } from '@utils/common';
import useHoldingModal from '../../../pages/mileage/hooks/useHoldingModal';

const HoldingModal = ({ onClose, onFetch }) => {
  const { amount } = useHoldingModal();
  const { handleSettleMileage, isModal3, setIsModal3 } = useMileageOfficePage();

  return (
    <>
      <div className="basicPop settlementPop" style={{ display: 'block' }}>
        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">보유 마일리지 잔액 정산하기</h1>
        <div className="pBack">
          <ul>
            <li>
              <strong>[국내] 원화 P(￦)</strong>
              <br />
              PG사 수수료 n.n%가 제외한 금액이 입금됩니다.
              <span>
                <em>&lt;정산식&gt;</em> 원화 마일리지 - PG수수료(PG부가세 포함) = 실 예정 정산금액 (원)
              </span>
            </li>
            <li>
              <strong>[국외] 달러 P($)</strong>
              <br />
              덴트너 수수료(PG사 수수료 포함) 10%를 차감한 금액이 입금됩니다.
              <span>
                <em>&lt;정산식&gt;</em> 달러 마일리지 x 90% x 환율 = 실 예정 정산금액 (원)
              </span>
            </li>
          </ul>
          <div className="amount">
            <dl>
              <dt>원화 마일리지</dt>
              <dd>
                <strong>{withCommas(amount?.mileageWon)}</strong>
                <em>P(￦)</em>
              </dd>
              <dt>달러 마일리지</dt>
              <dd>
                <strong>{withCommas(amount?.mileageDollar)}</strong>
                <em>P($)</em>
              </dd>
            </dl>
            <dl>
              <dt>총 정산금액</dt>
              <dd>
                <strong>{withCommas(amount?.totalAmount)}</strong>
                <em>원</em>
              </dd>
            </dl>
            <dl className="total">
              <dt>실 예정 정산금액</dt>
              <dd>
                <strong>{withCommas(amount?.expectedAmount)}</strong>
                <em>원</em>
              </dd>
            </dl>
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={'취소'} className={'btnW'} onClick={() => onClose()} />
          <BaseButton label={'정산 신청하기'} className={'btnB'} onClick={() => handleSettleMileage({ calculateAmount: amount?.expectedAmount, calculateSe: 'A' })} />
        </div>
      </div>
      {isModal3 && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">알림</h1>
            <div className="pBack">정산 신청이 접수되었습니다.</div>
            <div className="pBtn">
              <BaseButton
                label={'확인'}
                className={'btnB'}
                onClick={() => {
                  if (onFetch) onFetch();

                  setIsModal3(false);
                  onClose();
                }}
              />
            </div>
          </div>
        </ModalAlertPresent>
      )}
    </>
  );
};

export default HoldingModal;

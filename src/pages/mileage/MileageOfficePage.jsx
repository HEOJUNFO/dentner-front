import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import HoldingModal from '../../components/ui/modal/HoldingModal';
import SettlementModal from '../../components/ui/modal/SettlementModal';
import { ModalPresent } from '@components/common';
import useMileageOfficePage from './hooks/useMileageOfficePage';
import { withCommas } from '@utils/common';
import DepositDetail from './components/DepositDetail';
import SettleDetail from './components/SettleDetail';
import { useTranslation } from 'react-i18next';

const MileageOfficePage = () => {
  const { t } = useTranslation();
  const { user, mileage, desiMileage, settleMileage, isModal, setIsModal, tab, handleTab, fetchDesignerMileage, fetchSettleMileage, fetch } = useMileageOfficePage();

  return (
    <>
      <section>
        <h2>{t('mileage.title')}</h2>
        <div className="mileageWrap">
          <div className="mileageTop">
            <div className="mSummery officeCase">
              <div>
                <dl>
                  <dt>
                    {/* 정산 마일리지 */}
                    {t('version2_4.text18')}
                  </dt>
                  <dd>
                    <span>
                      <em>{withCommas(settleMileage?.mileageWon)}</em>P(￦)
                    </span>
                    <span>
                      <em>{withCommas(settleMileage?.mileageDollar)}</em>P($)
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <dl>
                  <dt>
                    {/* 보유 마일리지 */}
                    {t('version2_4.text19')}
                  </dt>
                  <dd>
                    <span>
                      <em>{withCommas(desiMileage?.mileageWon)}</em>P(￦)
                    </span>
                    <span>
                      <em>{withCommas(desiMileage?.mileageDollar)}</em>P($)
                    </span>
                  </dd>
                </dl>
                <span className="right">
                  <BaseButton label={'정산 요청'} className={'btnB ss'} onClick={() => setIsModal(true)} />
                </span>
              </div>
            </div>
            <div className="infoNotes">
              <dl>
                <dt>마일리지 정산안내</dt>
                <dd>
                  마일리지 정산은 당월 요청건에 한하여, 익월 영업일 기준 10일이내에 처리됩니다. <br />
                  정산 요청 시, 덴트너로 전자계산서 발행이 완료된 건에 한하여 정산이 가능합니다.
                </dd>
              </dl>
              <dl className="bill">
                <dt>[전자계산서 항목]</dt>
                <dd>
                  사업자등록번호 : 231-86-02630 <br />
                  상호 : 주식회사 덴트너 <br />
                  사업장 주소 : 광주광역시 북구 첨단과기로123, B동 501-5 <br />
                  업태 : 정보통신업 <br />
                  종목 : 응용소프트웨어 개발 및 공급 <br />
                  이메일 : support@dentner.com <br />
                  품목 : CAD file <br />
                  공급가액 : 실 예정 정산금액 <br />
                </dd>
              </dl>
              <p>
                <span>❗️ </span>의뢰인의 환불 요청이 들어온 거래의 경우, 치자이너와 덴트너의 승인이 필요합니다. 덴트너에게 연락주시길 바랍니다.
              </p>
            </div>
          </div>
          <div className="tabNav mileageTab">
            <nav className="center">
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>마일리지 입금내역</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>마일리지 정산내역</button>
                </li>
              </ul>
            </nav>
          </div>
          <article className={`${tab === 1 ? 'mOn' : ''}`}>
            <DepositDetail
              fetch={() => {
                fetchDesignerMileage();
                fetchSettleMileage();
              }}
            />
          </article>
          <article className={`${tab === 2 ? 'mOn' : ''}`}>
            <SettleDetail />
          </article>
        </div>
      </section>
      {isModal && (
        <ModalPresent>
          <HoldingModal
            onFetch={fetch}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default MileageOfficePage;

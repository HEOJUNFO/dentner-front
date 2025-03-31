import React, { useEffect, useState } from 'react';
import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent } from '@components/common';
import CodeStore from '@store/CodeStore';
import { postMileageRefund } from '@api/Mileage';
import { useNav, useSnack } from '@components/hooks';
import { withCommas, dateFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';

const ChargeRefundModal = ({ onClose, target }) => {
  console.log(target);
  const { t } = useTranslation();
  const { getters } = CodeStore();
  const { showWarnSnackbar, showSnackbar } = useSnack();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [cards, setCards] = useState([]);
  const [mileageRefundCodeNo, setMileageRefundCodeNo] = useState(0);
  const [mileageRefundCn, setMileageRefundCn] = useState('');

  const handleChange = (e) => {
    if (e.value !== 816) setMileageRefundCn('');

    if (mileageRefundCodeNo === e.value) return;
    setMileageRefundCodeNo(e.value);
  };

  const confirm = async () => {
    const { mileageNo, mileageSe } = target;

    if (!mileageRefundCodeNo) {
      showWarnSnackbar(t('version2_3.text28'));
      return;
    }

    if (mileageRefundCodeNo === 816 && !mileageRefundCn) {
      showWarnSnackbar(t('version2_3.text29'));
      return;
    }

    try {
      const body = { mileageNo, mileageRefundSe: mileageSe, mileageRefundCodeNo, mileageRefundCn };
      const r = await postMileageRefund(body);
      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal(true);
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (target) {
      const arr = getters.getFilterCode(760);
      // console.log(arr)
      setCards(arr.value.map((el) => ({ name: el.codeName, value: el.codeNo })));
    }
  }, [target]);

  return (
    <>
      <div className="basicPop refundPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text30')}</h1>
        <div className="pBack">
          <form>
            <div className="info">
              <div>
                {t('version2_3.text31')}
                <strong>
                  <strong>{withCommas(target?.mileageAmount)}</strong> P({target?.mileageUnit === 'B' ? '$' : '￦'})
                </strong>
              </div>
            </div>
            <div className="tws">
              <BaseSelect items={cards} placeholder={t('version2_3.text28')} onChange={(e) => handleChange(e)} />
              <textarea placeholder={t('version2_3.text29')} readOnly={mileageRefundCodeNo !== 816} onChange={(e) => setMileageRefundCn(e.target.value)} value={mileageRefundCn}></textarea>
            </div>
          </form>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('version2_3.text32')} className={'btnB'} onClick={() => confirm()} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <div className="alertPop" style={{ display: 'block' }}>
            <h1 className="pt">{t('base.noti')}</h1>
            <div className="pBack">{t('version2_3.text33')}</div>
            <div className="pBtn">
              <BaseButton
                label={t('base.confirm')}
                className={'btnB'}
                onClick={() => {
                  setIsModal(false);
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

export default ChargeRefundModal;

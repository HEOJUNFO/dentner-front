import { BaseButton, ModalAlertPresent } from '@components/common';
import UserStore from '@store/UserStore';
import { withCommas } from '@utils/common';
import { getMileage } from '@api/Mileage';
import React, { useEffect, useState } from 'react';
import PayFailAlert from './PayFailAlert';
import { useTranslation } from 'react-i18next';

const PayModal = ({ onClose, onSubmit, left = 0 }) => {
  const { t } = useTranslation();
  const { user, mileage, setMileage } = UserStore();

  const [isModal, setIsModal] = useState(false);

  const fetchMileage = async () => {
    const r = await getMileage();
    if (r.statusCode === 200) {
      setMileage(r.data);
    }
  };
  useEffect(() => {
    fetchMileage();
  }, []);

  //if (left === 0) return <></>;
  return (
    <>
      <div className="basicPop payPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text71')}</h1>
        <div className="pBack">
          <div>
            <dl>
              <dt>{t('version2_3.text72')}</dt>
              <dd>
                <strong>{withCommas(left)}</strong> P({user?.memberTp === 'B' ? '$' : '￦'})
              </dd>
            </dl>
            <dl>
              <dt>{t('version2_3.text73')}</dt>
              <dd>
                <strong>{withCommas(mileage)}</strong> P({user?.memberTp === 'B' ? '$' : '￦'})
              </dd>
            </dl>
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('base.confirm')} className={'btnB'} onClick={onSubmit} />
          {/* <BaseButton label={'확인'} className={'btnB'} onClick={onSubmit() => setIsModal(true)} /> */}
        </div>
      </div>

      {isModal && (
        <ModalAlertPresent>
          <PayFailAlert
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default PayModal;

import React, {useState} from 'react';
import { BaseButton } from '@components/common';
import {ModalAlertPresent} from '@components/common';
import useDepositDetail from '../../../pages/mileage/hooks/useDepositDetail';
import { withCommas } from '@utils/common';
import { useTranslation } from 'react-i18next';

const SettlementModal = ({onClose, item}) => {
    const { t } = useTranslation();
    const [isModal, setIsModal] = useState(false)
    const {
        handleSettleMileage,
      } = useDepositDetail();

    return (
        <>
        <div className='basicPop settlementPop' style={{display:'block'}}>
            <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>{t('version2_3.text96')}</h1>
            <div className='pBack'>
                <ul>
                    <li>
                        <strong>{`[${t('version2_3.text97')}] ${t('version2_3.text38')} P(￦)`}</strong><br/>{t('version2_3.text99')}
                        <span><em>&lt;{t('version2_3.text100')}&gt;</em> {t('version2_3.text101')}</span>
                    </li>
                    <li>
                        <strong>{`[${t('version2_3.text98')}] ${t('version2_3.text39')} P($)`}</strong><br/>{t('version2_3.text102')}
                        <span><em>&lt;{t('version2_3.text100')}&gt;</em> {t('version2_3.text103')}</span>
                    </li>
                </ul>
                <div className='amount'>
                    <dl>
                        <dt>{`${item?.mileageUnitName} ${t('mileage.title')}`}</dt>
                        <dd><strong>{withCommas(item?.mileageAmount)}</strong><em>{item?.mileageUnit === "A" ? 'P(￦)' : 'P($)'}</em></dd>
                    </dl>
                    <dl>
                        <dt>{t('version2_3.text104')}</dt>
                        <dd><strong>{withCommas(item?.mileageAmount)}</strong><em>{item?.mileageUnit === "A" ? '원' : '달러'}</em></dd>
                    </dl>
                    <dl className='total'>
                        <dt>{t('version2_3.text105')}</dt>
                        <dd><strong>{withCommas(item?.expectedAmount)}</strong><em>{item?.mileageUnit === "A" ? '원' : '달러'}</em></dd>
                    </dl>
                </div>
            </div>
            <div className='pBtn'>
                <BaseButton label={t('version2_1.text3')} className={'btnW'} onClick={() => onClose()} />
                <BaseButton label={t('version2_3.text106')} className={'btnB'} onClick={()=>handleSettleMileage(item, setIsModal)} />
            </div>
        </div>
        {isModal && 
            <ModalAlertPresent >
                <div className='alertPop' style={{display:'block'}}>
                    <h1 className='pt'>{t('base.noti')}</h1>
                    <div className='pBack'>
                        {t('version2_3.text107')}
                    </div>
                    <div className='pBtn'>
                        <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => {setIsModal(false); onClose();}} />
                    </div>
                </div>
            </ModalAlertPresent>
        }
        </>
    )
}

export default SettlementModal;

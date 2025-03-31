import React, { useEffect, useRef, useState } from 'react';
import { BaseButton, ModalAlertPresent } from '@components/common';
import { useNav, useSnack } from '@components/hooks';
import { getRequestOften, deleteRequestOften } from '@api/Request';
import OftenDTDoneAlert from './OftenDTDoneAlert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * 자주쓰는말 불러오기 모달
 * @param {*} param0
 * @returns
 */
const OftenDTModal = ({ onClose, onLoad, type, params }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isModal, setIsModal] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchRequestOften = async () => {
    const r = await getRequestOften();
    const dt = r?.data;
    if (dt) {
      setItems(dt);
    }
  };

  const handleDeleteClick = async (e) => {
    const r = await deleteRequestOften(selectedItem.oftenNo);
    const { data } = r;
    if (Boolean(Number(data))) {
      setSelectedItem(null);
      fetchRequestOften();
      setIsModal(false);
    }
  };

  const handleClick = (e, el) => {
    e.stopPropagation();
    setSelectedItem(el);
    setIsModal(true);
  };

  const handleLoadClick = (e) => {
    if (!selectedItem) {
      showWarnSnackbar(t('version2_3.text60'));
      return;
    }
    if (onLoad) onLoad(selectedItem?.oftenCn);
    if (onClose) {
      onClose();
    } else {
      if (type === 'A') navigate('/request/easymode', { state: { requestDc: selectedItem?.oftenCn, params } });
      if (type === 'B') navigate('/request/detailmode', { state: { requestDc: selectedItem?.oftenCn, params } });
    }
  };

  useEffect(() => {
    fetchRequestOften();
  }, []);

  return (
    <>
      <div className="basicPop oftenDTPop" style={{ display: 'block' }}>
        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text61')}</h1>
        <div className="pBack">
          <ul>
            {items.map((el, idx) => (
              <li key={`${el.oftenNo}_oftenDTPop_${idx}`} className={`${selectedItem?.oftenNo == el.oftenNo ? 'on' : ''}`} onClick={() => setSelectedItem(el)}>
                <div>{el.oftenCn}</div>
                <BaseButton label={t('version2_2.text3')} onClick={(e) => handleClick(e, el)} />
              </li>
            ))}

            {items.length === 0 && <li className="noList">{t('version2_3.text56')}</li>}
          </ul>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_2.text25')} disabled={!selectedItem} className={'btnB'} onClick={handleLoadClick} />
        </div>
      </div>

      {isModal && (
        <ModalAlertPresent>
          <OftenDTDoneAlert
            onDelete={handleDeleteClick}
            onClose={(e) => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default OftenDTModal;

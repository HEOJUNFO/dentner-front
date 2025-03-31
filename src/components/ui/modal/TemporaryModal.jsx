import React, { useEffect, useRef, useState } from 'react';
import { BaseButton } from '@components/common';
import { getRequestTemp } from '@api/Request';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
/**
 * 임시저장 의뢰서 불러오기
 * @param {*} param0
 * @returns
 */
const TemporaryModal = ({ onLoad, onClose, type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchRequestTemp = async () => {
    const r = await getRequestTemp(type);
    const { data } = r;
    setItems(data);
  };

  const handleLoadClick = () => {
    if (!selectedItem) {
      showWarnSnackbar('의뢰서 선택하세요.');
      return;
    }
    if (onLoad) onLoad(selectedItem?.requestDocGroupNo);
    if (onClose) {
      onClose();
    } else {
      if (type === 'A') navigate('/request/easymode', { state: { requestDocGroupNo: selectedItem?.requestDocGroupNo } });
      if (type === 'B') navigate('/request/detailmode', { state: { requestDocGroupNo: selectedItem?.requestDocGroupNo } });
    }
  };

  useEffect(() => {
    fetchRequestTemp();
  }, []);

  return (
    <>
      <div className="basicPop temporaryPop" style={{ display: 'block' }}>
        {/* <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => navigate(-1)} /> */}
        <BaseButton
          label={t('base.close')}
          className={'btnPClose'}
          onClick={() => {
            if (onClose) {
              onClose();
            } else {
              if (type === 'A') navigate('/request/easymode', { state: { requestDocGroupNo: selectedItem?.requestDocGroupNo } });
              if (type === 'B') navigate('/request/detailmode', { state: { requestDocGroupNo: selectedItem?.requestDocGroupNo } });
            }
          }}
        />
        <h1 className="pt">{t('version2_3.text108')}</h1>
        <div className="pBack">
          <ul>
            {items.map((el, idx) => {
              const datePart = el.registerDt ? el.registerDt.split(' ')[0] : '';
              const timePart = el.registerDt ? el.registerDt.split(' ')[1].substring(0, 5) : '';
              return (
                <li
                  key={`${el.requestDocGroupNo}_temporaryPop_${idx}`}
                  className={`reQMinInfo ${selectedItem?.requestDocGroupNo == el.requestDocGroupNo ? 'on' : ''}`}
                  onClick={() => setSelectedItem(el)}
                >
                  <div className="left">
                    <span className="itemTag">
                      <em>{el.requestDocName}</em>
                    </span>
                    <strong>{el.requestNumber}</strong>
                    <p>{el.requestDocDesc}</p>
                  </div>
                  <strong className="time">
                    {datePart} <strong>{timePart}</strong>
                  </strong>
                </li>
              );
            })}
            {items.length === 0 && <li className="noList">{t('version2_3.text109')}</li>}
          </ul>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_2.text25')} disabled={!selectedItem} className={'btnB'} onClick={handleLoadClick} />
        </div>
      </div>
    </>
  );
};

export default TemporaryModal;

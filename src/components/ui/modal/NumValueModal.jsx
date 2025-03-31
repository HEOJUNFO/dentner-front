import React, { useEffect, useRef, useState } from 'react';
import { useSnack } from '@components/hooks';
import { ModalAlertPresent, BaseButton } from '@components/common';
import { getRequestValueTitle, deleteRequestValueTitle } from '@api/Request';
import NumvalueDoneAlert from './NumValueDoneAlert';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NumValueModal = ({ onLoad, onClose, params }) => {
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  const fetchRequestValueTitle = async () => {
    try {
      const r = await getRequestValueTitle();

      const dt = r?.data;
      setItem({});
      setItems(dt);
    } catch (e) {
      console.log(e);
    }
  };

  // 선택
  const handleSelected = (el) => {
    setItem(el);
  };

  // 삭제
  const handleReomve = async () => {
    if (item?.valueNo) {
      const r = await deleteRequestValueTitle(item?.valueNo);

      if (Boolean(Number(r?.data))) {
        fetchRequestValueTitle();
        setModal(false);
        showSnackbar(t('version2_3.text59'));
      } else {
        showWarnSnackbar(t('version2_1.text86'));
      }
    }
  };

  // 불러오기
  const handleLoad = () => {
    if (item?.valueNo) {
      if (onLoad)
        onLoad({
          title: item?.valueCn,
          cementGapValue: item?.cementGapValue,
          extraGapValue: item?.extraGapValue,
          occlusalDistanceValue: item?.occlusalDistanceValue,
          approximalDistanceValue: item?.approximalDistanceValue,
          heightMinimalValue: item?.heightMinimalValue,
        });
      if (onClose) {
        onClose();
      } else {
        navigate('/request/detailmode', {
          state: {
            valueSj: item?.valueCn,
            cementGapValue: item?.cementGapValue,
            extraGapValue: item?.extraGapValue,
            occlusalDistanceValue: item?.occlusalDistanceValue,
            approximalDistanceValue: item?.approximalDistanceValue,
            heightMinimalValue: item?.heightMinimalValue,
            params,
          },
        });
      }
    } else {
      showWarnSnackbar(t('version2_3.text58'));
    }
  };

  useEffect(() => {
    fetchRequestValueTitle();
  }, []);

  return (
    <>
      <div className="basicPop numvaluePop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_2.text69')}</h1>
        <div className="pBack">
          <ul>
            {items.map((el, idx) => {
              return (
                <li key={`numvaluePop_${idx}`} className={el?.valueNo === item?.valueNo ? `on` : ''} onClick={() => handleSelected(el)}>
                  <div>{el.valueCn}</div>
                  <BaseButton label={t('version2_2.text3')} onClick={() => setModal(true)} />
                </li>
              );
            })}
            {items.length === 0 && <li className="noList">{t('version2_3.text56')}</li>}
          </ul>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_2.text25')} className={'btnB'} disabled={items.length === 0} onClick={handleLoad} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <NumvalueDoneAlert
            onRemove={handleReomve}
            onClose={() => {
              setModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default NumValueModal;

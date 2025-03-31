import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseButton } from '@components/common';
import { getRequestDoc } from '@api/Request';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * 요청서 작성 - 의뢰서 추가 모달
 * @param {*} param0
 * @returns
 */
const ReqAddModal = ({ onClose, onAdd, selectedReqs, max, type, params }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('A');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  const handleClick = (item) => {
    const isExist = selectedItems.findIndex((el) => el.requestDocGroupNo === item.requestDocGroupNo);
    if (isExist > -1) {
      const i = selectedItems.filter((el) => el.requestDocGroupNo !== item.requestDocGroupNo);
      setSelectedItems(i);
    } else {
      setSelectedItems((prev) => [...prev, { ...item }]);
    }
  };

  const fetchRequestDoc = async () => {
    const r = await getRequestDoc(tab);
    const { data, statusCode } = r;
    if (statusCode === 200) {
      if (data) {
        setItems(data);
      }
    }
  };

  useEffect(() => {
    setSelectedItems(selectedReqs);
  }, [selectedReqs]);

  useEffect(() => {
    fetchRequestDoc();
  }, [tab]);

  return (
    <>
      <div className="basicPop reqAddPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('request_target.add_request')}</h1>
        <div className="tabNav popCase">
          <nav>
            <ul>
              <li className={`${tab === 'A' ? 'on' : ''}`}>
                <BaseButton label={t('transaction.before_request')} onClick={() => setTab('A')} />
              </li>
              {/* <li className={`${tab === 'B' ? 'on' : ''}`}>
                <BaseButton label={'요청한 의뢰서'} onClick={() => setTab('B')} />
              </li> */}
            </ul>
          </nav>
        </div>
        <div>
          <div className="pBack">
            <ul>
              {items.length === 0 && <li className="noList">{t('version2_3.text94')}</li>}
              {items.map((item, idx) => {
                const isExist = selectedItems.findIndex((el) => el.requestDocGroupNo === item.requestDocGroupNo);
                return (
                  <li key={`reQMinInfo_${idx}_${item.requestDocGroupNo}`} className={`reQMinInfo ${isExist > -1 ? 'on' : ''}`} onClick={() => handleClick(item)}>
                    <div className="left">
                      <span className="itemTag">
                        <em>{item.requestDocName}</em>
                      </span>
                      <strong>{item.requestNumber}</strong>
                      <p>{item.requestDocDesc}</p>
                    </div>
                    <div className="right">
                      <strong className="time">
                        {item.registerDt.split(' ')[0]} <strong>{item.registerDt.split(' ')[1].substring(0, 5)}</strong>
                      </strong>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pBtn">
            <BaseButton label={`${t('version2_2.text88')} (${selectedItems.length}/${max})`} className={'btnB'} 
            onClick={() => {
              if (onAdd) {
                onAdd(selectedItems);
              } else {
                if (type === 'A') navigate('/request/public/write', {state: {selectedItems, params}});
                if (type === 'B') navigate('/request/target/write', {state: {selectedItems, params}});
              }
            }} />
          </div>
        </div>
      </div>
    </>
  );
};
ReqAddModal.displayName = 'ReqAddModal';

ReqAddModal.propTypes = {
  onClose: PropTypes.func,
  selectedReqArr: PropTypes.array,
  max: PropTypes.number,
};

ReqAddModal.defaultProps = {
  selectedReqArr: [],
  max: 10,
};

export default ReqAddModal;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton } from '@components/common';
import { getRequestTargetDesigner } from '@api/Request';
import sampleProfile from '@assets/images/no_user.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

/**
 * 지정요청서 - 치자이너 선택 모달
 * @param {*} param0
 * @returns
 */
const DesignerChoiceModal = ({ onClose, onSelected, selectedDesigner = {}, params }) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(selectedDesigner);
  const navigate = useNavigate();

  const fetchDesigner = async () => {
    const r = await getRequestTargetDesigner();
    const { data } = r;
    if (data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleSelected = (e) => {
    if (onSelected) {
      onSelected(selectedItem);
    } else {
      navigate('/request/target/write', {state: {desi: selectedItem, params}});
    }
  };

  useEffect(() => {
    fetchDesigner();
  }, []);
  if (isLoading) return <></>;
  return (
    <>
      <div className="basicPop dChoicePop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('request_target.select_designate')}</h1>
        <div className="pBack">
          <ul>
            {items.map((el, idx) => {
              return (
                <li key={`dChoicePop_${idx}`} className={selectedItem?.memberNo == el.memberNo ? 'on' : ''} onClick={() => handleClick(el)}>
                  <div>
                    <span className="profileImg">
                      <img src={el.memberProfileImage || sampleProfile} />
                    </span>
                    <span className="nick">
                      <span>{t('faq.dental_designer')}</span>
                      <strong>{el.memberNickName}</strong>
                    </span>
                  </div>
                  <Link className="bMR" to={`/designer/view/${el.memberNo}`}>
                    {t('base.view_profile')}
                  </Link>
                </li>
              );
            })}

            {items.length === 0 && (
              <li className="noList">
                {t('version2_3.text34')} <br />
                {t('version2_3.text35')}
              </li>
            )}
          </ul>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text11')} className={'btnB'} onClick={handleSelected} />
        </div>
      </div>
    </>
  );
};

export default DesignerChoiceModal;

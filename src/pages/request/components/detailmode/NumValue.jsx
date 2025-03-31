import React from 'react';
import { BaseButton, BaseInput, ModalPresent } from '@components/common';
import NumValueModal from '@components/ui/modal/NumValueModal';
import { withCommas } from '@utils/common';
import { useNumValue } from '../../hooks/detailmode/useNumValue';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../../components/hooks/useWindowSize';
import { useNavigate } from 'react-router-dom';

const NumValue = ({ values, params, activeIndex, onChange }) => {
  const isMobile = useWindowSize();
  const { isModal, setModal } = useNumValue();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="direct">
        <span className="ipBtn">
          <BaseInput
            type="text"
            id="valueSj"
            placeholder={params[activeIndex].valueSj.placeholder}
            value={params[activeIndex].valueSj.value}
            error={params[activeIndex].valueSj.error}
            maxLength={params[activeIndex].valueSj.maxLength}
            onChange={(e) => onChange(e.target.id, e.target.value)}
          />
          <BaseButton
            label={t('version2_2.text69')}
            onClick={() => {
              isMobile ? navigate('/request/numvalue', { state: { params } }) : setModal(true);
            }}
          />
        </span>
        <span className="checkSet">
          <input type="checkbox" id="interestYn" onChange={(e) => onChange(e.target.id, e.target.checked ? 'Y' : 'N')} />
          <label htmlFor="interestYn">{t('version2_2.text70')}</label>
        </span>

        <ul>
          {values.map((el, idx) => {
            return (
              <li key={idx}>
                <strong>{el.title}</strong>
                <span className="unit">
                  <BaseInput
                    type="text"
                    id={el.id}
                    placeholder={params[activeIndex][el.id].placeholder}
                    value={params[activeIndex][el.id].value}
                    error={params[activeIndex][el.id].error}
                    maxLength={params[activeIndex][el.id].maxLength}
                    onChange={(e) => onChange(e.target.id, e.target.value)}
                    em={'mm'}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {isModal && (
        <ModalPresent>
          <NumValueModal
            onLoad={({ title, cementGapValue, extraGapValue, occlusalDistanceValue, approximalDistanceValue, heightMinimalValue }) => {
              onChange('valueSj', title);
              onChange('cementGapValue', cementGapValue);
              onChange('extraGapValue', extraGapValue);
              onChange('occlusalDistanceValue', occlusalDistanceValue);
              onChange('approximalDistanceValue', approximalDistanceValue);
              onChange('heightMinimalValue', heightMinimalValue);
            }}
            onClose={() => {
              setModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default NumValue;

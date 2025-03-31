import React, { memo, forwardRef, useImperativeHandle } from 'react';
import { BaseButton } from '@components/common';

import toothU from '@assets/images/tooth_upper.png';
import toothL from '@assets/images/tooth_lower.png';

import { useTooths } from '../../hooks/detailmode/useTooths';
import { useTranslation } from 'react-i18next';

const Tooths = forwardRef(({ activeIndex, params, onChange , isViewMode=false}, ref) => {
  const { t } = useTranslation();
  const {
    upperTooths,
    upperBridge,
    lowerTooths,
    lowerBridge,
    setUpperTooths,
    setUpperBridge,
    setLowerTooths,
    setLowerBridge,
    handelUpperClick,
    handleUpperBridgeClick,
    handelLowerClick,
    handleLowerBridgeClick,
  } = useTooths({ activeIndex, params, onChange });

  useImperativeHandle(ref, () => ({
    setUpperTooths,
    setUpperBridge,
    setLowerTooths,
    setLowerBridge,
  }));

  return (
    <div className="toothSelectBack">
      <div className="toothSelect">
        <div className="tnb left">
          <BaseButton label={t('version2_2.text72')} className="btnB ss" disabled={upperTooths.findIndex((el) => el.selected) > -1 ? false : true} style={{cursor: 'initial'}}/>
          <div className="toothBack upper">
            <div className="toothNum">
              {upperTooths.map((el, idx) => {
                return (
                  <em key={`toothNum__${idx}`} className={el.selected ? 'on' : ''}>
                    {el.num}
                  </em>
                );
              })}
            </div>
            <div className="toothChoice">
              {upperTooths.map((el, idx) => {
                return (
                  <span key={`toothChoice__${idx}`} className={el.selected ? 'on' : ''} onClick={(e) => !isViewMode && handelUpperClick(el, idx)}>
                    {el.num}
                  </span>
                );
              })}
            </div>
            <div className="toothBridge">
              {upperBridge.map((el, idx) => {
                return (
                  <span key={`toothBridge__${idx}`} className={`${el.selected ? 'on' : ''} ${el.bridgSelected ? 'bridge' : ''}`} onClick={() => !isViewMode && handleUpperBridgeClick(el, idx)}>
                    {el.num}
                  </span>
                );
              })}
            </div>
            <div className="toothBase">
              <img src={toothU} />
            </div>
          </div>
        </div>

        <div className="tnb right">
          <BaseButton label={t('version2_2.text73')} className="btnB ss" disabled={lowerTooths.findIndex((el) => el.selected) > -1 ? false : true} style={{cursor: 'initial'}}/>
          <div className="toothBack lower">
            <div className="toothNum">
              {lowerTooths.map((el, idx) => {
                return (
                  <em key={`toothNum__${idx}`} className={el.selected ? 'on' : ''}>
                    {el.num}
                  </em>
                );
              })}
            </div>
            <div className="toothChoice">
              {lowerTooths.map((el, idx) => {
                return (
                  <span key={`toothChoice__${idx}`} className={el.selected ? 'on' : ''} onClick={() => !isViewMode && handelLowerClick(el, idx)}>
                    {el.num}
                  </span>
                );
              })}
            </div>
            <div className="toothBridge">
              {lowerBridge.map((el, idx) => {
                return (
                  <span key={`toothBridge__${idx}`} className={`${el.selected ? 'on' : ''} ${el.bridgSelected ? 'bridge' : ''}`} onClick={() => !isViewMode && handleLowerBridgeClick(el, idx)}>
                    {el.num}
                  </span>
                );
              })}
            </div>
            <div className="toothBase">
              <img src={toothL} />
            </div>
          </div>
        </div>
      </div>
      <div className="guide">
        <div>
          <p>
          {t('version2_2.text74')} <strong>shift</strong> {t('version2_2.text75')} <strong>{t('version2_2.text76')}</strong>{t('version2_2.text77')}
          </p>
          <p>
          {t('version2_2.text78')} <strong>{t('version2_2.text79')}</strong>{t('version2_2.text80')}
          </p>
          <p>
          {t('version2_2.text81')} <strong>{t('version2_2.text82')}</strong>{t('version2_2.text80')}
          </p>
        </div>
      </div>
    </div>
  );
});

export default memo(Tooths);

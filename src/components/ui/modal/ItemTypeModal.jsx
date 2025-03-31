import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';

const ItemTypeModal = ({ onClose, request = [], prosthetics = [] }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="basicPop itemTypePop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">
          {t('base.prosthesistype')} {t('base.view')}
        </h1>
        <div className="pBack">
          <ul>
            {request.map((el, idx) => (
              <li key={`Request_${idx}`}>
                <span>{el.requestDocName}</span>
                <em>{el.requestDocDesc}</em>
              </li>
            ))}
          </ul>
          <dl>
            <dt>
              <strong>
                {t('base.prosthesistype')}/{t('base.amount')}
              </strong>
            </dt>
            <dd className="itemList">
              {prosthetics.map((el, idx) => {
                const sdt = el.requestTypeName.split(' > ') || [];
                return (
                  <div key={`itemList_${idx}`}>
                    <strong>
                      {sdt.map((ele, idxx) => {
                        if (idxx === 0) {
                          return <strong key={`itemList___strong_${idx}_${idxx}`}>{ele} &gt; </strong>;
                        } else if (sdt.length - 1 === idxx) {
                          return ele;
                        } else {
                          return <React.Fragment key={`itemList__fragment_${idx}_${idxx}`}>{ele} &gt;</React.Fragment>;
                        }
                      })}
                    </strong>{' '}
                    <em>
                      {el.count}
                      {t('base.count')}
                    </em>
                  </div>
                );
              })}
              {/* <div>
                <strong>
                  <strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes
                </strong>{' '}
                <em>4개</em>
              </div> */}
            </dd>
          </dl>
        </div>
      </div>
    </>
  );
};

export default ItemTypeModal;

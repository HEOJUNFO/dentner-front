import React, { useEffect, useState } from 'react';
import { BaseInput, BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const SelectProsthetics = ({ element, placeholder, onChange, maxLength = 2, onDeleteClick, isEdit = true, isViewMode = false }) => {
  const { t, i18n } = useTranslation();
  return (
    <li>
      <strong>{element.requestTypeName}</strong>
      {isEdit && (
        <span>
          <span className="unit">
            <BaseInput type="text" placeholder={placeholder} isError={false} error={element?.error} value={element.typeCount} maxLength={maxLength} onChange={onChange} />
            <em>{t('base.count')}</em>
          </span>
            {
                !isViewMode && <BaseButton label="Del" className="bID ss" onClick={onDeleteClick} />
            }
        </span>
      )}
      {!isEdit && (
        <span className="edit">
          <em className="num">
            <i>{element.typeCount || 0}</i>
            {t('base.count')}
          </em>
            {
                !isViewMode && <BaseButton label="Del" className="bID ss" onClick={onDeleteClick} />
            }

        </span>
      )}
    </li>
  );
};

export default SelectProsthetics;

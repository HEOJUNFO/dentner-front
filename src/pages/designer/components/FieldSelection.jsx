import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInput } from '@components/common';
import useFieldSelection from '../hooks/useFieldSelection';

const FieldSelection = ({ onChange, params }) => {
  const { t } = useTranslation();
  const { filterOpt } = useFieldSelection();

  return (
    <div>
      <dl>
        <dt>{t('base.prosthesistype')}</dt>
        <dd>
          {filterOpt.map((el, idx) => (
            <span key={`groupName_${el['teethTypeNo']}_${idx}`}>
              <BaseInput
                type="checkbox"
                id={`groupName_${el['teethTypeNo']}_${idx}`}
                value={el['teethTypeNo']}
                label={el['typeName']}
                checked={params['prostheticsFilter'].includes(el['teethTypeNo'].toString())}
                onChange={onChange}
              />
            </span>
          ))}
        </dd>
      </dl>
    </div>
  );
};

export default FieldSelection;

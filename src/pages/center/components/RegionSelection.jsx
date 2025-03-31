import React, { useEffect, useState } from 'react';
import { RadioFilter } from '@components/ui';
import useRegionSelection from '../hooks/useRegionSelection';
import { useTranslation } from 'react-i18next';

const RegionSelection = ({ onChange, params }) => {
  const { items } = useRegionSelection();
  const { t } = useTranslation();

  return (
    <div>
      <RadioFilter
        title={t('base.location')}
        items={items}
        groupName={'memberAreaFilter'}
        titleName={'codeName'}
        valueName={'codeNo'}
        checkValue={params['memberAreaFilter']}
        onClick={(e) => {
          onChange('memberAreaFilter', params['memberAreaFilter'] === e.target.value ? '' : e.target.value);
        }}
      />
    </div>
  );
};

export default RegionSelection;

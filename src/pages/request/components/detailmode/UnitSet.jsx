import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const UnitSet = ({ activeIndex, params, setParams, onRemove , isViewMode = false }) => {
  const { t } = useTranslation();
  // tag A:개별, B:브릿지, C:상악묶음, D:하악묶음

  return (
    <dd className="dUnitSet">
      {params[activeIndex]?.selectedUpperTooths?.map((el, idx) => {
        const tag = el.tag === 'A' ? t('version2_2.text83') : el.tag === 'B' ? t('version2_2.text84') : t('version2_2.text85');
        if (el.visible)
          return (
            <span className="dUnit" key={`selectedUpperTooths_${activeIndex}_${idx}`}>
              {tag} <strong>{el.title}</strong>
              {!isViewMode && <BaseButton label="Del" className="bID ss" onClick={() => onRemove('upper', el)} />}
            </span>
          );
      })}
      {params[activeIndex]?.selectedLowerTooths?.map((el, idx) => {
        const tag = el.tag === 'A' ? t('version2_2.text83') : el.tag === 'B' ? t('version2_2.text84') : t('version2_2.text86');
        if (el.visible)
          return (
            <span className="dUnit" key={`selectedLowerTooths_${activeIndex}_${idx}`}>
              {tag} <strong>{el.title}</strong>
              {!isViewMode && <BaseButton label="Del" className="bID ss" onClick={() => onRemove('lower', el)} />}
            </span>
          );
      })}
      {/* <span className="dUnit">
        개별 <strong>26</strong> <BaseButton label="Del" className="bID ss" />
      </span>
      <span className="dUnit">
        개별 <strong>33</strong> <BaseButton label="Del" className="bID ss" />
      </span>
      <span className="dUnit">
        브릿지 <strong>33~34</strong> <BaseButton label="Del" className="bID ss" />
      </span>
      <span className="dUnit">
        (상악)묶음 <strong>26,27,28</strong> <BaseButton label="Del" className="bID ss" />
      </span>
      <span className="dUnit">
        (하악)묶음 <strong>26~33</strong> <BaseButton label="Del" className="bID ss" />
      </span> */}
    </dd>
  );
};

export default UnitSet;

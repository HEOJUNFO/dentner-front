import React from 'react';
import { DesignerInfo } from '@components/ui';
import { useTranslation } from 'react-i18next';

/**
 * 선택한 치자이너
 * @param {*} param0
 * @returns
 */
const DesignerChoice = ({ items = [] }) => {
  const { t } = useTranslation();
  return (
    <article>
      <div className="listBox">
        <div className="listTit pt0">
          <h3>
            {t('version2_2.text142')} ({items.length})
          </h3>
        </div>
        <div className="searchList choiceCase">
          <ul>
            {items.map((el, idx) => (
              <DesignerInfo key={`DesignerChoice_${idx}`} {...el} />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default DesignerChoice;

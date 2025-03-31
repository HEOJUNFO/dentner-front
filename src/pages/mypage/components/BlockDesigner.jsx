import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagenation, BaseButton } from '@components/common';
import useBlockDesigner from '../hooks/useBlockDesigner';

/**
 * 마이페이지 - 치자이너 관리 - 차단 치자이너
 * @returns
 */
const BlockDesigner = () => {
  const { t } = useTranslation();
  const { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError, handleUnblock } = useBlockDesigner();
  return (
    <>
      <div className="listTit">
        <h3>{t('designer.block')}</h3>
      </div>
      <div className={`${items.length > 0 ? 'searchList' : ''} blockCase`}>
        <ul>
          {items.map((el, idx) => {
            return (
              <li key={`BlockDesigner_${idx}`}>
                <span className="profileImg">
                  <img src={el.img} onError={handleImageError} />
                </span>
                <div className="listD">
                  <strong>{el.title}</strong>
                </div>
                <BaseButton className={'bBU'} label={t('base.non_block')} onClick={() => handleUnblock(el)} />
              </li>
            );
          })}
          {items.length === 0 && <li className="noList">{t('designer.empty_block_list')}</li>}
        </ul>
      </div>
      {items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
    </>
  );
};

export default BlockDesigner;

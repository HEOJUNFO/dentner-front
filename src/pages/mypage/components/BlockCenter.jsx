import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagenation, BaseButton } from '@components/common';
import useBlockCenter from '../hooks/useBlockCenter';

/**
 * 마이페이지 - 치기공소 관리 - 차단 치기공소
 * @returns
 */
const BlockCenter = () => {
  const { t } = useTranslation();
  const { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError, handleUnblock } = useBlockCenter();
  return (
    <>
      <div className="listTit">
        <h3>{t('center.block')}</h3>
      </div>
      <div className={`${items.length > 0 ? 'searchList' : ''} blockCase`}>
        <ul>
          {items.map((el) => {
            return (
              <li>
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
          {items.length === 0 && <li className="noList">{t('center.empty_block_list')}</li>}
        </ul>
      </div>
      {items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
    </>
  );
};

export default BlockCenter;

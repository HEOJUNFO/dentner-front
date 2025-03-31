import React from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseButton, PostsMore } from '@components/common';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import useBlockClient from '../hooks/useBlockClient';
import { useTranslation } from 'react-i18next';

const BlockClient = () => {
    const { t } = useTranslation();
    const { isLoading, items, total, perPage, currentPage, setCurrentPage, handleImageError, handleUnblock } = useBlockClient();
  
  return (
    <>
        <article>
            <div className='mypageBox'>
                <div className='listTit'>
                    <h3>{t('client.block')}</h3>
                </div>
                <div className={`${items.length > 0 ? 'searchList' : ''} blockCase`}>
                    <ul>
                        {items.map((el, idx) => {
                            return (
                            <li key={idx}>
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
                        {items.length === 0 && <li className="noList">{t('client.empty_block_list')}</li>}
                    </ul>
                </div>
                {items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
            </div>
        </article>
    </>
  );
};

export default BlockClient;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, BaseButton, ModalPresent, Pagenation } from '@components/common';
import useRequestBasket from './hooks/useRequestBasket';
import RequestBasketItem from './components/RequestBasketItem';
import { useTranslation } from 'react-i18next';

const RequestBasket = () => {
  const { handleNav, tab, setTab, tabItem, items, checkAll, handleCheckAll, handleCheck, checkedItems, handleRemove, total, perPage, currentPage, setCurrentPage } = useRequestBasket();
  const { t } = useTranslation();

  return (
    <>
      <section>
        <div className="titNbtn inqListCase">
          <div>
            <h2>{t('base.request_basket')}</h2>
            <span>
              <Link to="/request/easymode" className="btnL ss">
                {t('transaction.fill_easy_mode')}
              </Link>
              <Link to="/request/detailmode" className="btnL ss">
                {t('transaction.fill_detail_mode')}
              </Link>
            </span>
          </div>
        </div>
        <div className="tabNav">
          <nav>
            <ul>
              {tabItem.map((el, idx) => (
                <li key={el.id} className={`${tab === el.value ? 'on' : ''}`}>
                  <BaseButton type="button" label={el.title} onClick={() => setTab(el.value)} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <>
          <article>
            <div className="listTopSorting basketCase">
              {tab !== 'B' && (
                <div>
                  <span className="checkSet">
                    <BaseInput type="checkbox" id={`checkbox_all`} checked={checkAll} label={t('base.select_all')} onChange={handleCheckAll} />
                  </span>
                  <span className="postEdit">
                    <strong>
                      {t('base.select')} <em>{checkedItems.length}</em>
                      {t('base.count')}
                    </strong>
                    <span>
                      <Link to="" onClick={handleRemove}>
                        {t('transaction.delete_request')}
                      </Link>
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="listBox">
              <div className="inquireList">
                <ul>
                  {items.length > 0 && items.map((item, idx) => <RequestBasketItem key={`RequestBasketItem_${idx}`} item={item} onChange={handleCheck} checkedItems={checkedItems} tab={tab} />)}
                  {items.length == 0 && <li className="noList search">{t('base.empty_search_list')}</li>}

                  {/* <li className='noList search'>검색 결과가 없습니다.</li>
                        <li className='noList'>등록된 목록이 없습니다.</li> */}
                </ul>
              </div>

              {items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
            </div>

            {tab === 'A' && (
              <div className="inquireChoiced">
                <div className="listTit">
                  <h3> {t('base.total_count')}</h3>
                </div>
                <ol className="iChoicedList">
                  {checkedItems.map((item, idx) => (
                    <li key={`iChoicedList_child_${idx}`}>
                      <em>{item.requestDocName}</em>
                      <em>{item.requestNumber}</em>
                      <em>{item.requestDocDesc}</em>
                    </li>
                  ))}
                </ol>
                <div className="btnArea">
                  <BaseButton label={t('request.submit_target')} className={'btnL'} onClick={() => handleNav('/request/target/write', { checkedItems })} />
                  <BaseButton label={t('request.submit_public')} className={'btnB'} onClick={() => handleNav('/request/public/write', { checkedItems })} />
                </div>
              </div>
            )}
          </article>
        </>
      </section>
    </>
  );
};

export default RequestBasket;

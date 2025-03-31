import React from 'react';
import { useTranslation } from 'react-i18next';

const Tabs = ({ tabs = [], onAdd, onRemove, onActive }) => {
  const { t } = useTranslation();
  const name = ['a', 'b', 'c', 'd', 'e', 'f'];
  let i = -1;
  return (
    <div className="inquireTab">
      <nav>
        <ul>
          {tabs.map((tab, idx) => {
            if (tab.status !== 'D') {
              i++;
              return (
                <li
                  key={`tabs_${idx}`}
                  className={`${tab.active ? 'on' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();

                    onActive(idx);
                  }}
                >
                  <span>
                    {t('service_page.term_request_form')} <em>{name[i]}</em>
                  </span>
                  {idx !== 0 && (
                    <button
                      className="bTD"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(idx);
                      }}
                    >
                      {t('version2_2.text3')}
                    </button>
                  )}
                </li>
              );
            }
          })}

          {/* 6개 Full 이면 본 영역 삭제 */}
          {tabs?.filter((el) => el.status !== 'D').length < 6 && (
            <li className="add">
              {' '}
              <button className="bTA" onClick={onAdd}>
               {t('version2_2.text71')}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Tabs;

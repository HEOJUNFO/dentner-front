import React from 'react';
import { BaseButton } from '@components/common';
import { withCommas } from '@utils/common';
import { useTranslation } from 'react-i18next';
import UserStore from '@store/UserStore';

const SelectRequest = ({ onAddClick, onDelClick, max, items = [], type = 'public', price }) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  return (
    <dl>
      <dt className="etc">
        <span>
          {t('request_target.add_pre_saved')}
          <sup>필수항목</sup>
        </span>
        <em className="fileNum">
          (<strong>{items.length}</strong>/{max})
        </em>
      </dt>
      <dd>
        <BaseButton label={t('request_target.add_request')} className="bFl" onClick={onAddClick} />
        <ol className="reQfileLoad">
          {items.map((el, idx) => {
            return (
              <li key={`SelectRequest_${idx}`}>
                <span>
                  <em>{el.requestDocName}</em>
                  <em>{el.requestNumber}</em>
                  <em>{el.requestDocDesc}</em>
                </span>
                <BaseButton label="Del" className="bID" onClick={() => onDelClick(el)} />
              </li>
            );
          })}
        </ol>
        {type === 'target' && (
          <div className="priceSet">
            <span>{t('request_target.total')}</span>
            <strong className="right">
              <strong>{withCommas(price)}</strong>{' '}
              <em>
                P(
                {user?.memberTp === 'B' && <>$</>}
                {user?.memberTp === 'A' && <>￦</>})
              </em>
            </strong>
          </div>
        )}
      </dd>
    </dl>
  );
};

export default SelectRequest;

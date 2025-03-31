import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ItemTag, PostsMore, Pagenation } from '@components/common';
import UserStore from '@store/UserStore';
import DentalStudioInfo from './DentalStudioInfo';

const DentalStudio = ({ className, pagenation, items, type, total, perPage, currentPage, onPageChange }) => {
  const { t } = useTranslation();
  const { user } = UserStore();

  return (
    <>
      <div className={className}>
        <ul className={`${['C', 'B'].includes(user?.memberSe) ? 'office' : ''}`}>
          {items.length === 0 && (type === 0 ? <li className="noList search">{t('base.empty_search_list')}</li> : <li className="noList">{t('center.empty_interest_list')}</li>)}
          {items.map((el, idx) => (
            <DentalStudioInfo key={idx} {...el} />
          ))}
        </ul>
      </div>

      {pagenation && items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  );
};

DentalStudio.displayName = 'DentalStudio';

DentalStudio.propTypes = {
  className: PropTypes.string,
  pagenation: PropTypes.bool,
  items: PropTypes.array,
  type: PropTypes.oneOf([0, 1]),
};

DentalStudio.defaultProps = {
  className: 'searchList',
  pagenation: true,
  items: [],
  type: 1,
};

export default DentalStudio;

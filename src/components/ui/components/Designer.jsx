import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Pagenation } from '@components/common';
import UserStore from '@store/UserStore';
import DesignerInfo from './DesignerInfo';

/**
 * 치자이너 목록 컴포넌트
 * 마이페이지 - 치자이너 관리 - 관심 치자이너
 * 치자이너 찾기
 * @param {*} param0
 * @returns
 */
const Designer = ({ className, pagenation, items, type, total, perPage, currentPage, onPageChange }) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const empty = (type) => {
    if (type === 4) return <li className="noList">{t('designer.empty_interest_list')}</li>;
    else if (type === 5) return <li className="noList">{t('disigner.not_exist')}</li>;
    else return <li className="noList search">{t('base.empty_search_list')}</li>;
  };
  return (
    <>
      <div className={className}>
        <ul className={`${['C', 'B'].includes(user?.memberSe) ? 'office' : ''}`}>
          {items.length === 0 && empty(type)}
          {items.map((el, idx) => (
            <DesignerInfo key={idx} {...el} />
          ))}
        </ul>
      </div>

      {pagenation && items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  );
};

Designer.displayName = 'Designer';

// { name: '최신순', value: 0 },
// { name: '리뷰순', value: 1 },
// { name: '평점순', value: 2 },
// { name: '거래 총 금액순', value: 3 },
// { name: '관심 치자이너', value: 4 },
// { name: '견적 치자이너', value: 5 },
Designer.propTypes = {
  className: PropTypes.string,
  pagenation: PropTypes.bool,
  items: PropTypes.array,
  // type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
};

Designer.defaultProps = {
  className: 'searchList',
  pagenation: true,
  items: [],
  type: 1,
};

export default Designer;

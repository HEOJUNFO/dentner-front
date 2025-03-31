import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ItemTag, PostsMore, BaseInput, BaseButton } from '@components/common';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import useChat from '@components/hooks/useChat';

// TODO 이미지 없는 경우 기본이미지 필요
import sampleProfile from '@assets/images/no_user.png';

const DentalStudioInfo = ({ menu, memberNo, title, contents, img, detailUrl, local, skill, onInterest, onRemoveInterest, interest, moreItems }) => {
  const { t, i18n } = useTranslation();
  const { user } = UserStore();
  const { handleRoom } = useChat();

  const { handleNav } = useNav();
  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };
  const handleDetailClick = (e) => {
    if (menu !== 'mypage') return;
    handleNav(detailUrl);
  };

  return (
    <li>
      <span className="profileImg" style={{ cursor: menu === 'mypage' ? 'pointer' : '' }} onClick={handleDetailClick}>
        <img src={img || sampleProfile} onError={handleImageError} />
      </span>
      <div className="listD">
        <strong>{title}</strong>
        {menu !== 'mypage' && <ItemTag items={local} className={'localTag'} />}
        <p>{contents}</p>
        {menu !== 'mypage' && (
          <>
            <ItemTag items={skill} className={'itemTag'} />
            <div>
              {['A'].includes(user?.memberSe) && <BaseButton label={t('base.do_chat')} className={'bCG'} onClick={() => handleRoom(memberNo, 'B')} />}
              <Link className="bMR" to={detailUrl}>
                {/* 더 자세히보기 */}
                {t('base.do_detail')}
              </Link>
            </div>
          </>
        )}
      </div>

      <span className="right">
        {menu !== 'mypage' && ['A'].includes(user?.memberSe) && <BaseInput type="checkbox" className="likeSet" checked={interest} onChange={onInterest} />}
        {menu === 'mypage' && <BaseButton className={'bBU'} label={t('center.interest')} onClick={onRemoveInterest} />}
        {moreItems.length > 0 && user.memberNo !== memberNo && <PostsMore items={moreItems} />}
        {moreItems.length > 0 && user.memberNo === memberNo && (
          <BaseButton
            label={t('version2_3.text118')}
            className="bLink"
            onClick={() => {
              if (moreItems[0]?.onClick) moreItems[0]?.onClick();
            }}
          />
        )}
      </span>
    </li>
  );
};

DentalStudioInfo.displayName = 'DentalStudioInfo';

DentalStudioInfo.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.string,
  img: PropTypes.string,
  detailUrl: PropTypes.string,
  local: PropTypes.array,
  skill: PropTypes.array,
  onInterest: PropTypes.func,
  interest: PropTypes.bool,
  moreItems: PropTypes.array,
};

DentalStudioInfo.defaultProps = {
  detailUrl: '/centerView',
  local: [],
  skill: [],
  moreItems: [],
};

export default DentalStudioInfo;

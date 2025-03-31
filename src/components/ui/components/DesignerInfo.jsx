import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { ItemTag, PostsMore, BaseInput, BaseButton } from '@components/common';
import { withCommas } from '@utils/common';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import sampleProfile from '@assets/images/no_user.png';
import useChat from '@components/hooks/useChat';
/**
 *
 * @param {*} param0
 * @returns
 */
const DesignerInfo = ({
  menu,
  title,
  contents,
  img,
  reviewAvg,
  reviewCnt,
  wonPrice,
  dollarPrice,
  types,
  cads,
  detailUrl,
  onInterest,
  onRemoveInterest,
  interest,
  moreItems,
  onSelectedDesigner,
  state,
  memberNo,
  requestFormNo,
  requestEstimateNo,
}) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const { handleNav } = useNav();
  const { actions } = ModalStore();
  const { handleRoom } = useChat();

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };
  const handleDetailClick = (e) => {
    if (menu !== 'mypage') return;
    handleNav(detailUrl);
  };

  const handleIsInterest = (e) => {
    if (!interest) {
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text32'), btnName: t('base.confirm') });
      e.preventDefault();
    }
  };

  const isRating = ['designer', 'payment'];
  const isProsthetics = ['designer', 'payment'];
  const isCad = ['designer', 'payment'];
  return (
    <li>
      <span className="profileImg" style={{ cursor: menu === 'mypage' ? 'pointer' : '' }} onClick={handleDetailClick}>
        <img src={img || sampleProfile} onError={handleImageError} />
      </span>
      <div className="listD">
        <strong>{title}</strong>
        {isRating.includes(menu) && (
          <span className="dRating">
            <span>
              <i>{t('version2_1.text34')}</i>
              <em>{Number(reviewAvg) > 0 ? Number(reviewAvg).toFixed(1) : 0}</em>
            </span>
            <span>
              {t('disigner.review_num')}
              <em>
                {reviewCnt}
                {t('main_other.item_unit')}
              </em>
            </span>
            <span>
              {t('info_area.total_amount')}
              <em>
                {withCommas(wonPrice)} <em>P(￦)</em>
              </em>
              <em>
                {withCommas(dollarPrice)} <em>P($)</em>
              </em>
            </span>
            {/* <span>
              {t('info_area.total_amount')}
              <em>{withCommas(wonPrice)}원</em>
            </span> */}
          </span>
        )}
        <p>{contents}</p>

        {isProsthetics.includes(menu) && (
          <dl>
            <dt>{t('disigner.type')}</dt>
            <dd>
              <ItemTag items={types} className="itemTag" />
            </dd>
          </dl>
        )}

        {isCad.includes(menu) && (
          <dl>
            <dt>{t('base.prefer')} CAD</dt>
            <dd>
              <ItemTag items={cads} className="itemTag" />
            </dd>
          </dl>
        )}

        {menu === 'designer' && (
          <div className="designerPF">
            {user.memberSe === 'A' && (
              <span>
                <BaseButton label={t('base.do_chat')} className={'bCG'} onClick={() => handleRoom(memberNo, 'C')} />

                <Link to="/request/target/write" state={{ desi: { memberNo: memberNo, memberNickName: title } }} onClick={handleIsInterest} className="btnL sm">
                  {t('request.submit_target')}
                </Link>
              </span>
            )}
            <Link className="bMR" to={`${detailUrl}`}>
              {t('base.view_profile')}
            </Link>
          </div>
        )}

        {menu === 'payment' && (
          <div className="designerPF">
            <span>
              <Link to={`/payment/estimate/${requestEstimateNo}`} className="bEV">
                {t('version2_3.text119')}
              </Link>

              {state === 'ing' && (
                <Link to="" className="bDC" onClick={onSelectedDesigner}>
                  {t('status.select_dental')}
                </Link>
              )}
            </span>
            <Link className="bMR" to={`/designer/view/${memberNo}`}>
              {t('base.profile_detail')}
            </Link>
          </div>
        )}
      </div>

      <span className="right">
        {menu === 'designer' && user.memberSe === 'A' && <BaseInput type="checkbox" className="likeSet" checked={interest} onChange={onInterest} />}
        {menu === 'mypage' && <BaseButton className={'bBU'} label={t('designer.interest')} onClick={onRemoveInterest} />}
        {menu === 'payment' && <BaseButton label={t('base.do_chat')} className={'btnG'} onClick={() => handleRoom(memberNo, 'C')} />}
        {moreItems.length > 0 && user.memberNo !== memberNo && <PostsMore items={moreItems} />}
      </span>
    </li>
  );
};

DesignerInfo.displayName = 'DesignerInfo';

DesignerInfo.propTypes = {
  title: PropTypes.string,
  contents: PropTypes.string,
  img: PropTypes.string,
  reviewAvg: PropTypes.number,
  reviewCnt: PropTypes.number,
  wonPrice: PropTypes.number,
  dollarPrice: PropTypes.number,
  detailUrl: PropTypes.string,
  types: PropTypes.array,
  cads: PropTypes.array,
  onInterest: PropTypes.func,
  interest: PropTypes.bool,
  moreItems: PropTypes.array,
};

DesignerInfo.defaultProps = {
  detailUrl: '/designer/view',
  reviewAvg: 0,
  reviewCnt: 0,
  wonPrice: 0,
  dollarPrice: 0,
  types: [],
  cads: [],
  moreItems: [],
};

export default DesignerInfo;

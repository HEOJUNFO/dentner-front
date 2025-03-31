import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ItemTag } from '@components/common';
import { useTranslation } from 'react-i18next';
import {useNav} from "../../hooks/index.jsx";

/**
 * 의뢰서/요청서 정보
 * type 1 의뢰서, type 2 요청서
 * @param {*} param0
 * @returns
 */
const RequestMiniInfo = ({ type = 2, sw, reqTitle, reqDesc, registerDt, reqNo , requestSe}) => {
  const datePart = registerDt ? registerDt.split(' ')[0] : '';
  const timePart = registerDt ? registerDt.split(' ')[1].substring(0, 5) : '';
  const items = sw ? sw.split(',')?.map((el) => ({ name: el })) : [];
  const url = type === 2 ? `/request/view/${reqNo}` : `/request/view/doc/${reqNo}`;
  const { t } = useTranslation();

  const { handleNav, params: pathValue } = useNav();

  const handleMove = () => {
    if (requestSe === 'A') {
      handleNav('/request/easyview', { requestDocGroupNo: reqNo, requestFormNo: pathValue?.id });
    } else if (requestSe === 'B') {
      handleNav('/request/detailview', { requestDocGroupNo: reqNo,  requestFormNo : pathValue?.id });
    }
  }


  return (
    <div className="detail reQMinInfo">
      <div className="left">
        {type === 1 && (
          <span className={'itemTag'}>
            <em>{sw}</em>
          </span>
        )}
        {type === 2 && <ItemTag items={items} className="itemTag" />}
        <strong>{reqTitle}</strong>
        <p>{reqDesc}</p>
      </div>
      <div className="right">
        <strong className="time">
          {datePart} <strong>{timePart}</strong>
        </strong>
        <a className="bMR" onClick={() => handleMove()}>
          {t('base.do_detail')}
        </a>
        {/*<Link className="bMR" to={url}>
          {t('base.do_detail')}
        </Link>*/}
      </div>
    </div>
  );
};

RequestMiniInfo.displayName = 'RequestMiniInfo';

RequestMiniInfo.propTypes = {
  sw: PropTypes.string,
  reqTitle: PropTypes.string,
  reqDesc: PropTypes.string,
  registerDt: PropTypes.string,
  reqNo: PropTypes.any.isRequired,
  type: PropTypes.oneOf([1, 2]).isRequired,
};

RequestMiniInfo.defaultProps = {
  type: 2,
};

export default RequestMiniInfo;

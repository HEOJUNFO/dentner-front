import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useNav} from "@components/hooks/index.jsx";

const RequestMyInfo = ({ className, requestList: items }) => {
  const { t } = useTranslation();

  const { handleNav, params: pathValue } = useNav();

  const handleMove = (item) => {
      if (item?.requestSe === 'A') {
          handleNav('/request/easyview', { requestDocGroupNo: item.requestDocGroupNo, requestFormNo: pathValue?.id });
      } else if (item?.requestSe === 'B') {
          handleNav('/request/detailview', { requestDocGroupNo: item.requestDocGroupNo,  requestFormNo : pathValue?.id });
      }
  }

  return (
    <>
      <h3 className={`${className} reQTit`}>{t('request.my_request_info')}</h3>
      {items?.map((el, idx) => {
        const dt = el?.registerDt.split(' ');
        const date = dt[0];
        const time = dt[1]?.substring(0, 5);
        console.log(el.requestSe)

        const viewUrl = `/request/easyview`

          // if (data?.requestSe === 'A') {
          //     handleNav('/request/easymode', { requestDocGroupNo: pathValue?.id });
          // } else if (data?.requestSe === 'B') {
          //     handleNav('/request/detailmode', { requestDocGroupNo: pathValue?.id });
          // }

        return (
          <div key={`RequestMyInfo_${idx}`} className="detail reQMinInfo">
            <div className="left">
              <span className="itemTag">
                <em>{el.requestDocName}</em>
              </span>
              <strong>{el.requestNumber}</strong>
              <p>{el.requestDocDesc}</p>
            </div>
            <div className="right">
              <strong className="time">
                {date} <strong>{time}</strong>
              </strong>
                <a className="bMR" onClick={() => handleMove(el)}>
                    {t('base.do_detail')}
                </a>
              {/*<Link className="bMR" to={`/request/view/doc/${el.requestDocGroupNo}`}>*/}
              {/*  {t('base.do_detail')}*/}
              {/*</Link>*/}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default RequestMyInfo;

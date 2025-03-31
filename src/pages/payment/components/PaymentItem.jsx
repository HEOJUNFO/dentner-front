import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, BaseButton } from '@components/common';

/**
 * 요청서 진행상태
 * @param {*} param0
 * @returns
 */
const PaymentItem = ({
  requestFormNo,
  statusName,
  status,
  dealStatusName,
  dealStatus,
  docCnt,
  title,
  registerDate,
  registerTime,
  requestType,
  deadlineDate,
  deadlineTime,
  expireDate,
  expireTime,
  designer,
}) => {
  // '거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const detailStep = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  return (
    <li>
      <div className="stsSum">
        <span>
          <strong className={`iSts ${status === 'B' ? 'select' : ''}`}>{statusName}</strong>
          <span className="reQNum">
            <i>견적서</i>
            <strong>{docCnt}</strong>
          </span>
        </span>
        <strong className="time">
          {registerDate} <strong>{registerTime}</strong>
        </strong>
      </div>
      <div className="subject">
        <strong>{title}</strong>
      </div>

      {requestType === 'A' && (
        <div className="stepBox">
          <div className="totalStep">
            <div className="progress">
              <div>
                <span style={{ width: status === 'A' ? '5%' : status === 'B' ? '37%' : status === 'C' ? '67%' : '' }}></span>
              </div>
              <ol>
                {/* //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기) */}
                <li className={status === 'A' ? 'on' : ''}>견적 요청</li> {/* 5% */}
                <li className={status === 'B' ? 'on' : ''}>치자이너 선택</li> {/* 37% */}
                <li className={status === 'C' ? 'on' : ''}>거래중</li> {/* 67% */}
                <li>거래완료</li> {/* 100% */}
              </ol>
            </div>
            <div className="infoNd">
              {status === 'A' && (
                <p>
                  <span role="img" aria-label="guide">
                    💬
                  </span>
                  견적을 요청하고 있어요 ...
                </p>
              )}
              {status === 'B' && (
                <p>
                  <span role="img" aria-label="technologist">
                    🧑🏻‍💻
                  </span>
                  견적이 도착했어요! 치자이너를 선택해주세요.
                </p>
              )}
              {status === 'C' && (
                <p>
                  <span role="img" aria-label="sparkles">
                    ✨️
                  </span>
                  거래가 진행되고 있어요! 전자계약서를 작성하고 결제를 진행해주세요.
                </p>
              )}

              <dl className="deadlineSet">
                <dt>
                  <em>견적요청 만료일</em>
                </dt>
                <dd>
                  <span className="time">
                    {expireDate} <span>{expireTime}</span>
                  </span>
                </dd>

                <dt>
                  <em>납품 마감일</em>
                </dt>
                <dd>
                  <span className="time red">
                    {deadlineDate} <span>{deadlineTime}</span>
                  </span>
                </dd>
              </dl>
            </div>
          </div>

          {status === 'C' && (
            <div className="detailStep">
              <ol>
                <li className="end">
                  <em>1</em>
                  <span>견적서</span>
                </li>
                <li className={dealStatus === 'A' ? 'ing' : 'end'}>
                  <em>2</em>
                  <span>의뢰서 결제</span>
                </li>
                <li className={dealStatus === 'B' ? 'ing' : 'end'}>
                  <em>3</em>
                  <span>의뢰서 수령</span>
                </li>
                <li>
                  <em>4</em>
                  <span>3D 뷰어 소통</span>
                </li>
                <li>
                  <em>5</em>
                  <span>CAD파일 업로드</span>
                </li>
                <li>
                  <em>6</em>
                  <span>추가금 결제</span>
                </li>
                <li>
                  <em>7</em>
                  <span>CAD파일 수령</span>
                </li>
                <li>
                  <em>8</em>
                  <span>리뷰작성</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      )}

      {designer && (
        <div className="choiceDt">
          <div className="left">
            <span className="profileSet">
              <span className="profileImg">
                <img src={designer?.profileImage} />
              </span>
              <span className="nick">
                <span>치자이너</span>
                <strong>{designer?.nickName}</strong>
              </span>
            </span>
            <span className="mileage">
              <label>예상 결제 마일리지</label>
              <strong>
                <strong>-30,000</strong>P(￦)
              </strong>
            </span>
          </div>
          <div>
            <span className="postEdit">
              <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
              <span>
                <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
              </span>
            </span>
            <span className="twinBtn small">
              <BaseButton label={'프로필 보기'} />
              <span>
                <BaseButton label={'채팅하기'} />
              </span>
            </span>
          </div>
        </div>
      )}

      {requestType === 'B' && (
        <div className="stepBox">
          <div className="totalStep">
            <div className="progress">
              <div>
                <span style={{ width: '5%' }}></span>
              </div>
              <ol>
                <li>요청 수락</li> {/* 5% */}
                <li>거래중</li> {/* 51% */}
                <li>거래완료</li> {/* 100% */}
              </ol>
            </div>
            <div className="infoNd">
              <p>
                <span role="img" aria-label="guide">
                  💬
                </span>
                지정 치자이너의 수락을 기다리고 있어요 ...
              </p>
              <dl className="deadlineSet">
                <dt>
                  <em>납품 마감일</em>
                </dt>
                <dd>
                  <span className="time red">
                    {deadlineDate} <span>{deadlineTime}</span>
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      )}

      <div className="listStsBtn">
        <Link to="/RequestView" className="btnL">
          내 요청서
        </Link>
        <BaseButton label={'거래취소'} className={'btnW'} onClick={() => console.log('취소')} />
      </div>

      {status === 'B' && (
        <div className="btnArea">
          <Link to={`/payment/${requestFormNo}/designer`} className="btnB">
            치자이너 선택
          </Link>
        </div>
      )}

      {status === 'C' && (
        <div className="btnArea">
          <Link to={`/payment/reqeust/${requestFormNo}`} className="btnB">
            전자계약하고 결제하기
          </Link>
        </div>
      )}

    </li>
  );
};

export default PaymentItem;

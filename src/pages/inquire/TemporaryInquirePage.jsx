import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseButton } from '@components/common';

const TemporaryInquirePage = () => {
  return (
    <>
      <article>
        <div className="listTopSorting">
          <div>
            <span className="checkSet">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">선택 해제</label>
            </span>
            <span className="postEdit">
              <strong>
                선택 <em>10</em>개
              </strong>
              <span>
                <Link to="/designerChoiceEnd">의뢰서 삭제</Link>
              </span>
            </span>
          </div>
        </div>
        <div className="listBox">
          <div className="inquireList">
            <ul>
              <li>
                <input type="checkbox" id="check01" />
                <div className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag br4">
                      <em>의뢰서 a</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어버트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                    <Link className="bMR" to="/requestView">
                      <span>
                        <em>더</em> 자세히보기
                      </span>
                    </Link>
                  </div>
                  <div className="moreWrite">
                    <button className="btnB" to="">
                      이어서 작성하기
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <input type="checkbox" id="check01" />
                <div className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag br4">
                      <em>의뢰서 a</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어버트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                    <Link className="bMR" to="/requestView">
                      <span>
                        <em>더</em> 자세히보기
                      </span>
                    </Link>
                  </div>
                  <div className="moreWrite">
                    <button className="btnB" to="">
                      이어서 작성하기
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <input type="checkbox" id="check01" />
                <div className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag br4">
                      <em>의뢰서 a</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어버트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                    <Link className="bMR" to="/requestView">
                      <span>
                        <em>더</em> 자세히보기
                      </span>
                    </Link>
                  </div>
                  <div className="moreWrite">
                    <button className="btnB" to="" disabled>
                      이어서 작성하기
                    </button>
                  </div>
                </div>
              </li>
              {/* <li className='noList search'>검색 결과가 없습니다.</li>
                        <li className='noList'>등록된 목록이 없습니다.</li> */}
            </ul>
          </div>
          <Pagenation />
        </div>
        <div className="inquireChoiced">
          <div className="listTit"></div>
          <ol className="iChoicedList">
            <li>
              <em>의뢰서 1</em>
              <em>@8321430183048173057</em>
              <em>교정 32</em>
            </li>
            <li>
              <em>의뢰서 6</em>
              <em>@8321~430187</em>
              <em>교정 32 / 인레이 8</em>
            </li>
          </ol>
          <div className="btnArea">
            <BaseButton label={'이어서 작성하기'} className={'btnB'} />
          </div>
        </div>
      </article>
    </>
  );
};

export default TemporaryInquirePage;

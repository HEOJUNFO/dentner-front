import React, { useEffect, useState } from 'react';

//삭제예정 사용안함
const EstimateTable = () => {
  return (
    <div className="detail">
      <h4>
        <strong>보철 종류와 그에 따른 수가표</strong>
      </h4>
      <div className="prostheticsType">
        <div className={`${sStep === 1 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(1)}>크라운</strong>
          <div className="itemData">
            <div>
              <ul className="noDeph">
                <li>
                  <span>일반 (Hole X)</span>
                </li>
                <li>
                  <span>SCRP (Hole O)</span>
                </li>
                <li className="on">
                  <span>국소의치 지대치 일반</span>
                </li>
                <li>
                  <span>국소의치 지대치 SCRP</span>
                </li>
                <li>
                  <span>기타(직접입력)</span>
                </li>
              </ul>
            </div>
            <p>
              <span className="left">
                크라운 &gt; 국소의치 지대치 SCRP{' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 2 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(2)}>캡</strong>
          <div className="itemData">
            <div>
              <ul className="noDeph">
                <li>
                  <span>일반 (Hole X)</span>
                </li>
                <li>
                  <span>SCRP (Hole O)</span>
                </li>
                <li className="on">
                  <span>국소의치 지대치 일반</span>
                </li>
                <li>
                  <span>국소의치 지대치 SCRP</span>
                </li>
                <li>
                  <span>기타(직접입력)</span>
                </li>
              </ul>
            </div>
            <p>
              <span className="left">
                캡 &gt; 국소의치 지대치 SCRP{' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 3 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(3)}>어버트먼트</strong>
          <div className="itemData">
            <div></div>
            <p>
              <span className="left">
                어버트먼트{' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 4 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(4)}>인레이/온레이</strong>
          <div className="itemData">
            <div></div>
            <p>
              <span className="left">
                인레이/온레이{' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 5 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(5)}>의치</strong>
          <div className="itemData">
            <div>
              <ul>
                <li>
                  <span>Full</span>
                </li>
                <li>
                  <span>Partial</span>
                </li>
                <li className="on">
                  <span>Flipper</span>
                </li>
              </ul>
              <ol>
                <li>
                  <span>1~4 Teeth</span>
                </li>
                <li className="on">
                  <span>5~ Teeth</span>
                </li>
              </ol>
              <ol className="noDeph">
                <li>
                  <span>One body(Base + Teeth)</span>
                </li>
                <li className="on">
                  <span>Two body(Base / Teeth)</span>
                </li>
              </ol>
            </div>
            <p>
              <span className="left">
                의치 &gt; Flipper &gt; 5~ Teeth &gt;Two body(Base / Teeth){' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 6 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(6)}>스프린트/서지컬가이드</strong>
          <div className="itemData">
            <div>
              <ul>
                <li>
                  <span>Splint</span>
                </li>
                <li className="on">
                  <span>Surgical Guide</span>
                </li>
              </ul>
              <ol>
                <li className="on">
                  <span>Partial</span>
                </li>
              </ol>
              <ol className="noDeph">
                <li className="on">
                  <span>1~3 Holes</span>
                </li>
                <li>
                  <span>4~ Holes</span>
                </li>
              </ol>
            </div>
            <p>
              <span className="left">
                스프린트/서지컬가이드 &gt; Surgical Guide &gt; Partial &gt; 1~3 Holes
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 7 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(7)}>개인트레이</strong>
          <div className="itemData">
            <div>
              <ul>
                <li className="on">
                  <span>Hole</span>
                </li>
                <li>
                  <span>Mo Hole</span>
                </li>
              </ul>
              <ol className="noDeph">
                <li>
                  <span>일반</span>
                </li>
                <li>
                  <span>Transfer type</span>
                </li>
                <li className="on">
                  <span>Pick-up type</span>
                </li>
              </ol>
            </div>
            <p>
              <span className="left">
                개인트레이 &gt; Hole &gt; Pick-up type{' '}
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 8 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(8)}>프레임</strong>
          <div className="itemData">
            <div>
              <ul>
                <li>
                  <span>Partial</span>
                </li>
                <li className="on">
                  <span>Full</span>
                </li>
              </ul>
              <ol className="noDeph">
                <li>
                  <span>Full mesh</span>
                </li>
                <li className="on">
                  <span>직접입력</span>
                </li>
              </ol>
            </div>
            <p>
              <span className="left">
                프레임 &gt; Full &gt; 직접입력
                <span>
                  <em>1,000</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 9 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(9)}>교정</strong>
          <div className="itemData">
            <div></div>
            <p>
              <span className="left">
                교정{' '}
                <span>
                  <em>0</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
        <div className={`${sStep === 10 ? 'listItem on' : 'listItem'}`}>
          <strong onClick={() => handleSearchTab(10)}>기타</strong>
          <div className="itemData">
            <div></div>
            <p>
              <span className="left">
                기타{' '}
                <span>
                  <em>0</em> 원
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateTable;

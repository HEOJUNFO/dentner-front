import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { BaseInput, ItemTag, BaseButton, DragDropImage, SwiperImage } from '@components/common';
import { Link } from 'react-router-dom';

const ProfileModifyPage = () => {
    const [isOn, setOptionView] = useState(true);
    const toggleHandler = () => {
      setOptionView(!isOn);
    };
    const [sStep, setSearchTab] = useState(1);
    const handleSearchTab = (sStep) => {
      setSearchTab(sStep);
    };
    const [imgFileList, setImgFileList] = useState([]);
    useEffect(() => {}, [imgFileList]);
    const items = [{ file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }];
    const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" className="bMP">
            이전
          </Link>
        </div>
        <h2 className='withToggle'>
          프로필 관리
          <span className="toggleSet label">
              <input type="checkbox" id="toggleLabel" defaultChecked />
              <label>
                <span>공개</span>
                <em>비공개</em>
              </label>
          </span>
        </h2>
        <article>
            <div className='profileModify supply'>
                <form>
                    <div className="tws">
                        <div className="topArea">
                            <span className='profileImgMBack'>
                                <span className='profileImgBack'>
                                    <span className='profileImg'>
                                        <img src={sampleProfile} />
                                    </span>
                                    <span className='profileUpload'>
                                        <input type='file' id='file1' />
                                    </span>
                                </span>
                            </span>
                            <dl>
                                <dt>
                                    닉네임
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type="text" placeholder="닉네임을 입력하세요." />
                                    <BaseButton type='button' className={'btnB sm mt10'} label={'중복 확인'} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    선호 CAD S/W
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <ul>
                                        <li>
                                            <span className='checkSet'>
                                                <input type='checkbox' id='checkbox1' />
                                                <label htmlFor='checkbox1'>EXOCAD</label>
                                            </span>
                                        </li>
                                        <li>
                                            <span className='checkSet'>
                                                <input type='checkbox' id='checkbox2' />
                                                <label htmlFor='checkbox2'>3Shape</label>
                                            </span>
                                            <div>
                                                <span className='radioSet'>
                                                    <input type='radio' name='radio1' id='radio1' defaultChecked />
                                                    <label htmlFor='radio1'>2020</label>
                                                </span>
                                                <span className='radioSet'>
                                                    <input type='radio' name='radio1' id='radio2' />
                                                    <label htmlFor='radio2'>2021</label>
                                                </span>
                                                <span className='radioSet'>
                                                    <input type='radio' name='radio1' id='radio3' />
                                                    <label htmlFor='radio3'>2022</label>
                                                </span>
                                                <span className='radioSet'>
                                                    <input type='radio' name='radio1' id='radio4' />
                                                    <label htmlFor='radio4'>2023</label>
                                                </span>
                                                <span className='radioSet'>
                                                    <input type='radio' name='radio1' id='radio5' />
                                                    <label htmlFor='radio5'>2024</label>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className='checkSet'>
                                                <input type='checkbox' id='checkbox3' />
                                                <label htmlFor='checkbox3'>기타</label>
                                            </span>
                                            <BaseInput type="text" placeholder="직접입력" />
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </div>
                        <dl>
                            <dt>
                                한줄소개
                                <sup>필수항목</sup>
                            </dt>
                            <dd>
                                <textarea placeholder='한줄소개를 입력해주세요. (최대 200자)'></textarea>
                            </dd>
                        </dl>
                        <dl>
                            <dt className='withSorting'>
                                보철 종류와 그에 따른 수가표
                                <span className='sorting sts'>
                                <span>
                                    <input type='radio' id='sortingSts1' name='sortingSts1' checked />
                                    <label htmlFor='sortingSts1'>원화</label>
                                </span>
                                <span>
                                    <input type='radio' id='sortingSts2' name='sortingSts1' />
                                    <label htmlFor='sortingSts2'>달러</label>
                                </span>
                                </span>
                            </dt>
                            <dd>
                                <div className="prostheticsType">
                                    <div className={`${sStep === 1 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(1)}>크라운</strong>
                                        <div className="itemData">
                                        <div>
                                            <ul>
                                            <li className="on">
                                                <span>Zirconia</span>
                                            </li>
                                            <li>
                                                <span>Resin</span>
                                            </li>
                                            <li>
                                                <span>Metal</span>
                                            </li>
                                            <li>
                                                <span>Wax</span>
                                            </li>
                                            </ul>
                                            <ol>
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
                                                <span>국기타(직접입력)</span>
                                            </li>
                                            </ol>
                                            <ol className="noDeph">
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf01" />
                                                <label htmlFor="checkboxf01">Mesial rest seat</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf02" defaultChecked />
                                                <label htmlFor="checkboxf02">Distal rest seat</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf03" defaultChecked />
                                                <label htmlFor="checkboxf03">Cingulum rest seat</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf04" />
                                                <label htmlFor="checkboxf04">No rest seat</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf05" defaultChecked />
                                                <label htmlFor="checkboxf05">Lingual ledge</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf06" defaultChecked />
                                                <label htmlFor="checkboxf06">Akers’ clasp (C-clasp)</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf07" />
                                                <label htmlFor="checkboxf07">RPA clasp</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf08" />
                                                <label htmlFor="checkboxf08">RPA clasp</label>
                                                </span>
                                            </li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className="left">
                                            크라운 &gt; <input type="text" placeholder="2차 보철종류를 입력하세요" /> &gt; 국소의치 지대치 일반 &gt; Distal rest seat / Cingulum rest seat / Lingual ledge / Akers’
                                            clasp (C-clasp)
                                            </span>
                                            <span>
                                                <span className='unit'>
                                                    <span>단가</span>
                                                    <input type='text' defaultValue='0.00' />
                                                    <em>원</em>
                                                </span>
                                                <button className='btnB'>완료</button>
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
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf21" />
                                                <label htmlFor="checkboxf21">일반 (Hole X)</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf22" />
                                                <label htmlFor="checkboxf22">SCRP (Hole O)</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf23" />
                                                <label htmlFor="checkboxf23">국소의치 지대치 일반</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf24" />
                                                <label htmlFor="checkboxf24">국소의치 지대치 SCRP</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf25" />
                                                <label htmlFor="checkboxf25">기타(직접입력)</label>
                                                </span>
                                            </li>
                                            </ul>
                                        </div>
                                        <p>
                                            <span className="left">캡 &gt; 국소의치 지대치 SCRP</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                                        </p>
                                        </div>
                                    </div>
                                    <div className={`${sStep === 3 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(3)}>어버트먼트</strong>
                                        <div className="itemData">
                                        <div></div>
                                        <p>
                                            <span className="left">어버트먼트</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                                        </p>
                                        </div>
                                    </div>
                                    <div className={`${sStep === 4 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(4)}>인레이/온레이</strong>
                                        <div className="itemData">
                                        <div></div>
                                        <p>
                                            <span className="left">인레이/온레이</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
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
                                            <ol className="noDeph">
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf51" />
                                                <label htmlFor="checkboxf51">1~4 Teeth</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf52" defaultChecked />
                                                <label htmlFor="checkboxf52">5~ Teeth</label>
                                                </span>
                                            </li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className="left">의치 &gt; Flipper &gt; 5~ Teeth &gt;Two body(Base / Teeth)</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
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
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf61" />
                                                <label htmlFor="checkboxf61">1~3 Holes</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf62" />
                                                <label htmlFor="checkboxf62">4~ Holes</label>
                                                </span>
                                            </li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className="left">스프린트/서지컬가이드 &gt; Surgical Guide &gt; Partial &gt; 1~3 Holes</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
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
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf71" />
                                                <label htmlFor="checkboxf71">일반</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf71" />
                                                <label htmlFor="checkboxf71">Transfer type</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf71" />
                                                <label htmlFor="checkboxf71">Pick-up type</label>
                                                </span>
                                            </li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className="left">개인트레이 &gt; Hole &gt; Pick-up type</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
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
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf81" />
                                                <label htmlFor="checkboxf81">Full mesh</label>
                                                </span>
                                            </li>
                                            <li>
                                                <span className="checkSet">
                                                <input type="checkbox" id="checkboxf82" />
                                                <label htmlFor="checkboxf82">직접입력</label>
                                                </span>
                                            </li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className="left">프레임 &gt; Full &gt; 직접입력</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                                        </p>
                                        </div>
                                    </div>
                                    <div className={`${sStep === 9 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(9)}>교정</strong>
                                        <div className="itemData">
                                        <div></div>
                                        <p>
                                            <span className="left">교정</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                                        </p>
                                        </div>
                                    </div>
                                    <div className={`${sStep === 10 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(10)}>기타</strong>
                                        <div className="itemData">
                                        <div></div>
                                        <p>
                                            <span className="left">기타</span>
                                            <BaseButton label="추가하기 (0/10)" className="btnB ss" />
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="prostheticsMType">
                                    <BaseSelect items={cate} placeholder={'1차 카테고리 '} onChange={(e) => console.log(e)} />
                                    <BaseSelect items={cate} placeholder={'2차 카테고리 '} onChange={(e) => console.log(e)} />
                                    <BaseSelect items={cate} placeholder={'3차 카테고리 '} onChange={(e) => console.log(e)} />
                                    <BaseSelect items={cate} placeholder={'4차 카테고리 '} onChange={(e) => console.log(e)} />
                                    <div className='choice'><div>크라운 &gt; 국소의치 지대치 일반</div></div>
                                    <span className='priceUnit'>
                                        <span className='unit'>
                                            <span>단가</span>
                                            <BaseInput type='text' id='typeAmount' placeholder='0'/>
                                            <em>원</em>
                                        </span>
                                    </span>
                                    <span className='priceUnit dollar'>
                                        <span className='unit'>
                                            <span>단가</span>
                                            <BaseInput type='text' id='typeAmount' placeholder='0'/>
                                            <em>달러</em>
                                        </span>
                                    </span>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                참고사항
                                <sup>필수항목</sup>
                            </dt>
                            <dd>
                                <textarea placeholder='참고사항을 입력해주세요. (최대 300자)'></textarea>
                            </dd>
                        </dl>
                        <dl>
                            <dt className='etc'>
                                <span>
                                    포트폴리오
                                    <sup>필수항목</sup>
                                </span>
                                <em className='fileNum'>
                                    (<strong>2</strong>/10)
                                </em>
                            </dt>
                            <dd>
                                <div className='fileSet'>
                                    <DragDropImage className={'fileFind'}>
                                        <label className='inq'><strong>사진 등록하기</strong> (zip파일 권장, 500MB 이하)</label>
                                    </DragDropImage>
                                    {/*  */}
                                    <div className="pfImgSwiper">
                                        <SwiperImage
                                        items={items.map((el, idx) => {
                                            return (
                                            <span className="imgSet">
                                                <span>
                                                <img key={`${idx}pimgSet`} src={sampleProfile} />
                                                </span>
                                                <button>삭제</button>
                                            </span>
                                            );
                                        })}
                                        perview={'auto'}
                                        space="13"
                                        pagination={false}
                                        />
                                    </div>
                                    {/*  */}
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <BaseButton className={'btnB modifyCase'} label={'수정하기'} />
                </form>
            </div>
        </article>
      </section>
    </>
  );
};

export default ProfileModifyPage;

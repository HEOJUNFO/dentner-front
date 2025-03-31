import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { BaseInput, ItemTag, BaseButton, DragDropImage, BaseSelect, SwiperImage } from '@components/common';
import { ProstheticsPrice } from '@components/ui';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProfileModifyPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setIsModal4] = useState(false);
  const [numvalue, setNumvalue] = useState(false);
  const [isOn, setOptionView] = useState(true);
  const toggleHandler = () => {
    setOptionView(!isOn);
  };
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
  const [sStep, setSearchTab] = useState(1);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {}, [imgFileList]);

  const modiftNum = [
    { name: '3회', value: 0 },
    { name: '4회', value: 1 },
  ];

  const modiftTerm = [
    { name: '20일', value: 0 },
    { name: '30일', value: 1 },
  ];
  const items = [{ file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }];
  const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
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
          <div className="profileModify supply">
            <form>
              <div className="tws">
                <div className="topArea">
                  <span className='profileImgMBack'>
                    <span className="profileImgBack">
                      <span className="profileImg">
                        <img src={sampleProfile} />
                      </span>
                      <span className="profileUpload">
                        <input type="file" id="file1" />
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
                      <BaseButton type="button" className={'btnB sm mt10'} label={'중복 확인'} />
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
                          <span className="checkSet">
                            <input type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1">EXOCAD</label>
                          </span>
                        </li>
                        <li>
                          <span className="checkSet">
                            <input type="checkbox" id="checkbox2" />
                            <label htmlFor="checkbox2">3Shape</label>
                          </span>
                          <div>
                            <span className="radioSet">
                              <input type="radio" name="radio1" id="radio1" defaultChecked />
                              <label htmlFor="radio1">2020</label>
                            </span>
                            <span className="radioSet">
                              <input type="radio" name="radio1" id="radio2" />
                              <label htmlFor="radio2">2021</label>
                            </span>
                            <span className="radioSet">
                              <input type="radio" name="radio1" id="radio3" />
                              <label htmlFor="radio3">2022</label>
                            </span>
                            <span className="radioSet">
                              <input type="radio" name="radio1" id="radio4" />
                              <label htmlFor="radio4">2023</label>
                            </span>
                            <span className="radioSet">
                              <input type="radio" name="radio1" id="radio5" />
                              <label htmlFor="radio5">2024</label>
                            </span>
                          </div>
                        </li>
                        <li>
                          <span className="checkSet">
                            <input type="checkbox" id="checkbox3" />
                            <label htmlFor="checkbox3">기타</label>
                          </span>
                          <BaseInput type="text" placeholder="직접입력" />
                        </li>
                      </ul>
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      수정 가능 횟수
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      <BaseSelect items={modiftNum} placeholder={'3회'} onChange={(e) => console.log(e)} />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      수정 보증 기간
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      <BaseSelect items={modiftTerm} placeholder={'20일'} onChange={(e) => console.log(e)} />
                    </dd>
                  </dl>
                </div>
                <dl>
                  <dt>
                    한줄소개
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <textarea placeholder="한줄소개를 입력해주세요. (최대 200자)"></textarea>
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
                    <ProstheticsPrice type={'write'} />
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
                    <textarea placeholder="참고사항을 입력해주세요. (최대 300자)"></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt className="etc">
                    <span>
                      포트폴리오
                      <sup>필수항목</sup>
                    </span>
                    <em className="fileNum">
                      (<strong>2</strong>/10)
                    </em>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <DragDropImage className={'fileFind'}>
                        <label className="inq">
                          <strong>사진 등록하기</strong> (zip파일 권장, 500MB 이하)
                        </label>
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

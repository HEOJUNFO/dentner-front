import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample3.png';
import { BaseInput, BaseSelect, BaseButton, DragDropImage, SwiperImage } from '@components/common';
import { Link } from 'react-router-dom';

const ProfileModifyPage = () => {
    const [imgFileList, setImgFileList] = useState([]);
    useEffect(() => {}, [imgFileList]);
    const items = [{ file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }];
    const years = [{ name: '2024', value: 0 }, { name: '2023', value: 1 }];

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
                            <dt>
                                지역
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='centerFillter'>
                                <div>
                                    <span>
                                        <input type='radio' name='radio4' defaultChecked />
                                        <label>서울</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>인천/부천</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>경기</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>춘천/강원</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>청주/충북</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>대전/충남/세종</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>전주/전북</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>광주/전남</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>대구/경북</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>부산/울산/경남</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio4' />
                                        <label>제주</label>
                                    </span>
                                </div>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                보철종류 (복수 선택 가능)
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='centerFillter'>
                                <strong>고정성 보철물</strong>
                                <div>
                                    <span>
                                        <input type='radio' name='radio0' defaultChecked />
                                        <label>모델리스</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>지르코니아</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>PFM(PFZ)</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>커스텀 어버트먼트</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>Gold&#40;Metal&#41; Crown</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>Surveyed Crown</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio0' />
                                        <label>기타</label>
                                    </span>
                                </div>
                                <strong>가철성 보철물</strong>
                                <div>
                                    <span>
                                        <input type='radio' name='radio1' defaultChecked />
                                        <label>Framework</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>배열&큐어링</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>Flexible Denture</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>BPS</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>Bar type</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>Telescopic</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>Attachment</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio1' />
                                        <label>기타</label>
                                    </span>
                                </div>
                                <strong>교정</strong>
                                <div>
                                    <span>
                                        <input type='radio' name='radio2' defaultChecked />
                                        <label>장치</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio2' />
                                        <label>투명교정</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio2' />
                                        <label>스프린트</label>
                                    </span>
                                </div>
                                <strong>All on X</strong>
                                <div>
                                    <span>
                                        <input type='radio' name='radio3' defaultChecked />
                                        <label>All on X &#40;Zirconia&#41;</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio3' />
                                        <label>All on X &#40;Porcelain&#41;</label>
                                    </span>
                                    <span>
                                        <input type='radio' name='radio3' />
                                        <label>All on X &#40;Denture&#41;</label>
                                    </span>
                                </div>
                            </dd>
                        </dl>
                        <div className='officeEtc'>
                            <dl>
                                <dt>
                                    설립연도
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <BaseSelect items={years} placeholder={'2009년'} onChange={(e) => console.log(e)} />
                                </dd>
                            </dl>
                            <dl className='staff'>
                                <dt>
                                    치과기공사 수
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='pcCase'>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>5인 미만</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>5인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>10인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>15인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>20인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>25인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>30인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>40인 이상</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio5' />
                                        <label>50인 이상</label>
                                    </span>
                                </dd>
                                <dd className='mCase'>
                                    <BaseSelect items={years} placeholder={'2009년'} onChange={(e) => console.log(e)} />
                                </dd>
                            </dl>
                        </div>
                        <dl>
                            <dt>
                                회사소개
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

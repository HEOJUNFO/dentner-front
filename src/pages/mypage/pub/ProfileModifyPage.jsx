import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { BaseInput, ItemTag, BaseButton, } from '@components/common';
import { Link } from 'react-router-dom';

const ProfileModifyPage = () => {
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" className="bMP">
            이전
          </Link>
        </div>
        <h2>프로필 관리</h2>
        <article>
            <div className='profileModify'>
                <form>
                    <div className="tws">
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
                    <BaseButton className={'btnB modifyCase'} label={'수정하기'} />
                </form>
            </div>
        </article>
      </section>
    </>
  );
};

export default ProfileModifyPage;

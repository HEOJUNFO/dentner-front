import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx } from '@components/common';
import { DragDropImage } from '@components/common';

const PaymentAddRequestPage  = () => {
    const [imgFileList, setImgFileList] = useState([]);
    useEffect(() => {
      //console.log(imgFileList);
    }, [imgFileList]);
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>추가금 수정</h2>
            <div className='writeBox'>
                <div className='tws'>
                    <form>
                        <div className="detail">
                            <dl>
                                <dt>
                                    추가금
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='addPayArea'>
                                    <div>
                                        <span className='radioSet'>
                                            <input type='radio' name='radio1' id='radio1' defaultChecked />
                                            <label htmlFor='radio1'>추가금 있음</label>
                                        </span>
                                        <span className='radioSet'>
                                            <input type='radio' name='radio1' id='radio2' />
                                            <label htmlFor='radio2'>추가금 없음</label>
                                        </span>
                                    </div>
                                    <div className='addPaySet'>
                                        <span className='moneyChoice'>
                                            <span>
                                                <input type='radio' name='radio2' id='radio21' defaultChecked />
                                                <label htmlFor='radio21'>원화</label>
                                            </span>
                                            <span>
                                                <input type='radio' name='radio2' id='radio22' />
                                                <label htmlFor='radio22'>달러</label>
                                            </span>
                                        </span>
                                        <span className='unit'>
                                            <input type='text' defaultValue='30,000' />
                                            <em>P(￦)</em>
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    추가금 요청사유
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <textarea placeholder='추가금 요청사유를 작성해주세요 (최대 300자)'></textarea>
                                </dd>
                            </dl>
                            <dl>
                                <dt className='etc'>
                                    <span>
                                        파일첨부
                                        <sup>필수항목</sup>
                                    </span>
                                    <em className='fileNum'>
                                        (<strong>0</strong>/10)
                                    </em>
                                </dt>
                                <dd>
                                    <ImageSettingEx imgFileList={imgFileList} setImgFileList={setImgFileList} />
                                </dd>
                            </dl>
                        </div>
                        <div className='btnArea'>
                            {/* <BaseButton label={'CAD파일 업로드하기'} className={'btnB'} /> */}
                            <Link to='' className='btnB'>추가금 수정하기</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  );
};

export default PaymentAddRequestPage ;

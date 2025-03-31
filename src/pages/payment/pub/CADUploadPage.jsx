import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx } from '@components/common';
import { DragDropImage } from '@components/common';

const CADUploadPage  = () => {
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
            <h2>CAD파일 업로드</h2>
            <div className='writeBox'>
                <div className='tws'>
                    <form>
                        <h3 className='pt0'>파일 첨부하기</h3>
                        <div className='cadDownload'>
                            <ul>
                                <li>
                                    <div className='reQMinInfo'>
                                        <div className='left'>
                                            <span className='itemTag br4'><em>의뢰서 a</em></span>
                                            <strong>@8321430183048173057</strong>
                                            <p>크라운 15 / 어비트먼트 10</p>
                                        </div>
                                        <div className='right'>
                                            <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                            <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                                        </div>
                                    </div>
                                    <span className='fileLoad'>
                                        <span>
                                            01) 치자이너가 의뢰인에게 전달 CAD파일.zip
                                            <em>328.36 mb</em>
                                        </span>
                                        <button className='bFD'>Download</button>
                                    </span>
                                </li>
                                <li>
                                    <div className='reQMinInfo'>
                                        <div className='left'>
                                            <span className='itemTag br4'><em>의뢰서 a</em></span>
                                            <strong>@8321430183048173057</strong>
                                            <p>크라운 15 / 어비트먼트 10</p>
                                        </div>
                                        <div className='right'>
                                            <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                            <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                                        </div>
                                    </div>
                                    <DragDropImage  className={'fileFind'}>
                                        <span><span>의뢰서에 해당하는</span> CAD파일 첨부</span> <em>(zip파일 권장, 500MB 이하)</em>
                                    </DragDropImage>
                                </li>
                                <li>
                                    <div className='reQMinInfo'>
                                        <div className='left'>
                                            <span className='itemTag br4'><em>의뢰서 a</em></span>
                                            <strong>@8321430183048173057</strong>
                                            <p>크라운 15 / 어비트먼트 10</p>
                                        </div>
                                        <div className='right'>
                                            <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                            <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                                        </div>
                                    </div>
                                    <DragDropImage  className={'fileFind'}>
                                        <span><span>의뢰서에 해당하는</span> CAD파일 첨부</span> <em>(zip파일 권장, 500MB 이하)</em>
                                    </DragDropImage>
                                </li>
                                <li>
                                    <div className='reQMinInfo'>
                                        <div className='left'>
                                            <span className='itemTag br4'><em>의뢰서 a</em></span>
                                            <strong>@8321430183048173057</strong>
                                            <p>크라운 15 / 어비트먼트 10</p>
                                        </div>
                                        <div className='right'>
                                            <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                            <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                                        </div>
                                    </div>
                                    <DragDropImage  className={'fileFind'}>
                                        <span><span>의뢰서에 해당하는</span> CAD파일 첨부</span> <em>(zip파일 권장, 500MB 이하)</em>
                                    </DragDropImage>
                                </li>
                            </ul>
                        </div>
                        <h3 className='notM'>추가금 요청하기</h3>
                        <button className='bARToggle'>추가금 요청하기 접기</button> {/* 모바일용 클릭 시 className='bPSToggle on' */}
                        <div className="detail"> {/* 모바일용 className='bPSToggle on' 일 경우 hidden */}
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
                                            <input type='text' defaultValue='0' />
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
                            <Link to='' className='btnB'>CAD파일 업로드하기</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  );
};

export default CADUploadPage ;

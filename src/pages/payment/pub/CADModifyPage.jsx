import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx } from '@components/common';
import { DragDropImage } from '@components/common';

const CADModifyPage  = () => {
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
            <h2>CAD파일 수정</h2>
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
                        <div className='btnArea'>
                            {/* <BaseButton label={'CAD파일 업로드하기'} className={'btnB'} /> */}
                            <Link to='' className='btnB'>CAD파일 수정하기</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  );
};

export default CADModifyPage ;

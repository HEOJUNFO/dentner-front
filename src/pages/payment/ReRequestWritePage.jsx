import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx, BaseSelect } from '@components/common';
import ReqAddModal from '../../components/ui/modal/ReqAddModal';
import {ModalPresent} from '@components/common';

const ReRequestWritePage = () => {
    const [isModal, setIsModal] = useState(false);
    const [imgFileList, setImgFileList] = useState([]);
    useEffect(() => {
      //console.log(imgFileList);
    }, [imgFileList]);
    const whys = [{ name: '은행 1', value: 0 }, { name: '수정이 필요함', value: 1 }, { name: 'Scan file에 오류가 발견됨', value: 2 }, { name: '잘못 디자인함', value: 3 }, { name: '기타', value: 4 }];

  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>재제작 요청</h2>
            <div className='writeBox withInfo'>
                <div className='tws'>
                    <form>
                        <div className='infoNotes'>
                            <dl>
                                <dt>재제작 안내 (무료/비용추가)</dt>
                                <dd>
                                    <span>▪️ [무료 재제작] : </span>치자이너와 소통을 통해 재제작/수정을 요청해주세요.<br/>
                                    <span>▪ [비용추가 재제작] : </span>Scan file이 바뀐다면, 비용이 추가될 수 있습니다. 치자이너와 소통해주세요!
                                </dd>
                            </dl>
                        </div>
                        <div className="detail mt40">
                            <dl>
                                <dt>
                                    재제작 요청사유
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='addWhySelect'>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio1' id='radio1' />
                                        <label htmlFor='radio1'>파일이 훼손됨, 열리지 않음</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio1' id='radio2' />
                                        <label htmlFor='radio2'>수정이 필요함</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio1' id='radio3' />
                                        <label htmlFor='radio3'>Scan  file에 오류가 발견됨</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio1' id='radio4' />
                                        <label htmlFor='radio4'>잘못 디자인함</label>
                                    </span>
                                    <span className='radioSet'>
                                        <input type='radio' name='radio1' id='radio5' />
                                        <label htmlFor='radio5'>기타</label>
                                    </span>
                                </dd>
                                <dd className='addWhySelect mCase'>
                                    <BaseSelect items={whys} placeholder={'파일이 훼손됨, 열리지 않음'} onChange={(e) => console.log(e)} />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    요청/수정사항
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <textarea placeholder='요청/수정사항을 작성해주세요. (최대 300자)'></textarea>
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
                            {/* <BaseButton label={'재제작 요청하기'} className={'btnB'} /> */}
                            <Link to='/reRequestView' className='btnB'>재제작 요청하기</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        {isModal && 
            <ModalPresent >
                <ReqAddModal onClose={() => {setIsModal(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default ReRequestWritePage;

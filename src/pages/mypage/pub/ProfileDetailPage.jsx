import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample2.png';
import sampleProfile2 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import LinkAlert from '../../../components/ui/modal/LinkAlert';
import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';

const DesignerViewPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [isModal3, setIsModal3] = useState(false);
    const [sStep , setSearchTab] = useState(0);
    const handleSearchTab = (sStep) => {
        setSearchTab(sStep);
    }
    const [ratingValue, setRating] = useState(0);
    const handleRating = (rate) => {
      setRating(rate);
    }
    const handleReset = () => {
      setRating(0);
    }
    const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
    const moreItems = [
        {
            name: '차단하기',
            onClick: () => {
                setIsModal2(true);
            },
        },
        { name: '신고하기',
            onClick: () => {
                setIsModal3(true);
            },
        },
    ];
    const [thumbsSwiper, setThumbsSwiper] = useState();
    const img_file_list = [
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
    ]
    const img_file_list2 = [
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
    ]

  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='viewBox pfDView'>
                <h2>치자이너 상세</h2>
                <div className='cdInfo'>
                    <div className='back'>
                        <div className='infoD'>
                            <span className='profileImg'>
                                <img src={sampleProfile2} />
                            </span>
                            <div>
                                <strong>Apple 치카푸카</strong>
                            </div>
                        </div>
                    </div>
                    <span className='right'>
                        <Link className='btnL sm'>프로필 수정하기</Link>
                        <PostsMore items={moreItems} />
                    </span>
                </div>
                <div className='tvs'>
                    <article>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>구동 가능한 CAD S/W</strong></h4>
                                <ItemTag items={cadss} className='itemTag' />
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        {isModal2 &&
            <ModalAlertPresent >
                <BlockAlert onClose={() => {setIsModal2(false)}}/>
            </ModalAlertPresent>
        }
        {isModal3 &&
            <ModalPresent >
                <ReportModal onClose={() => {setIsModal3(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default DesignerViewPage;

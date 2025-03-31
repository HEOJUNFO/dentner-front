import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseButton, PostsMore } from '@components/common';
import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';
import sampleProfile from '@assets/images/sample/sample3.png';

const CenterMgtPage = () => {
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
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
  return (
    <>
      <div className='listTit'>
          <h3>관심 치과기공소</h3>
      </div>
      <div className='searchList'>
        <ul>
          <li>
            <span className='profileImg'>
              <img src={sampleProfile} />
            </span>
            <div className='listD'>
              <strong>Apple 치카푸카</strong>
              <p>
                Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                소중한 치아를 믿고 맡겨보세요!
              </p>
            </div>
            <span className='right'>
              <BaseButton className={'bBU'} label={'관심 치과기공소'} />
              <PostsMore items={moreItems} />
            </span>
          </li>
          <li>
            <span className='profileImg'>
              <img src={sampleProfile} />
            </span>
            <div className='listD'>
              <strong>Apple 치카푸카</strong>
              <p>
                Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                소중한 치아를 믿고 맡겨보세요!
              </p>
            </div>
            <span className='right'>
              <BaseButton className={'bBU'} label={'관심 치과기공소'} />
              <PostsMore items={moreItems} />
            </span>
          </li>
          {/* <li className='noList'>관심 치과기공소가 없습니다.</li> */}
        </ul>
      </div>
      <Pagenation />
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

export default CenterMgtPage;

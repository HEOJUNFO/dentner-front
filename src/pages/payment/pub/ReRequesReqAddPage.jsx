import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import ReqAddModal from '../../../components/ui/modal/pub/ReqAddModal';
import TemporaryModal from '../../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../../components/ui/modal/OftenDTModal';
import NumValueModal from '../../../components/ui/modal/NumValueModal';
import ItemTypeModal from '../../../components/ui/modal/pub/ItemTypeModal';
import DesignerChoiceModal from '../../../components/ui/modal/pub/DesignerChoiceModal';

const ReRequesReqAddPage = () => {
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='popupInPage'>
              {/* <ReqAddModal />
              <InquireTipModal />
              <TemporaryModal />
              <OftenDTModal />
              <NumValueModal />
              <ItemTypeModal />  */}
              <DesignerChoiceModal />
            </div>
        </section>
    </>
  );
};

export default ReRequesReqAddPage;

import defaultImg from '@assets/images/no_user.png';

import { BaseInput, ItemTag, ModalAlertPresent, ModalPresent, PostsMore, BaseButton } from '@components/common';
import { ImageThumbs } from '@components/ui';
import { replaceToBr } from '@utils/common';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import LinkAlert from '../../components/ui/modal/LinkAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import useCenterViewPage from './hooks/useCenterViewPage';
import useChat from '@components/hooks/useChat';
import { useTranslation } from 'react-i18next';

/**
 * MEMBER_SE A:의뢰인, B:치과기공소, C:치자이너
 * path: centerView/{memberNo}
 * 치기공소 상세
 * @returns
 */
const CenterViewPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { user, data, interest, skills, handleImageError, handleInterestChange, handleAddBlock, isModal2, setIsModal2, isMine } = useCenterViewPage();
  const { handleRoom } = useChat();

  const [isModal, setIsModal] = useState(false);
  const [isModal3, setIsModal3] = useState(false);

  const moreItems = [
    {
      name: t('disigner.copy_link'),
      onClick: () => {
        setIsModal(true);
      },
    },
    {
      name: t('disigner.block'),
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: t('disigner.report'),
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <div className="viewBox subView">
          {/* <h2>치과기공소 상세</h2> */}
          <h2>{t('version2_4.text88')}</h2>
          <div className="cdInfo office">
            <div className="back">
              <div className="infoD">
                <span className="profileImg">
                  <img src={data.memberProfileImage || defaultImg} onError={handleImageError} />
                </span>
                <div>
                  <strong>{data.memberDentistryName}</strong>
                  <span className="mLocal">{data.memberAreaName}</span>
                  {user?.memberSe === 'A' && (
                    <span className="sorting">
                      <span>
                        <input type="checkbox" id="sorting5" />
                        <BaseInput type="checkbox" id="sorting5" label={t('sort.like')} checked={interest} onChange={handleInterestChange} />
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <p>{data.oneIntroduction}</p>
              <span className="mSkills">
                <ItemTag items={skills} className="itemTag" />
              </span>
            </div>

            <span className="right">
              {user?.memberSe === 'A' && (
                <Link onClick={() => handleRoom(data?.memberNo, 'B')} className="bCG">
                  {/* 채팅하기 */}
                  {t('base.do_chat')}
                </Link>
              )}
              {!isMine && <PostsMore items={moreItems} />}
              {isMine && (
                <>
                  <BaseButton
                    label={t('disigner.copy_link')}
                    className="bLinkTxt"
                    onClick={() => {
                      if (moreItems[0]?.onClick) moreItems[0]?.onClick();
                    }}
                  />
                  <Link to="/mypage/modify" className="btnL sm">
                    {/* 프로필 수정하기 */}
                    {t('version2_1.text35')}
                  </Link>
                </>
              )}
            </span>
          </div>
          <div className="tvs">
            <article>
              <div className="cdSummery">
                <strong className="mTit">{t('mileage.detail')}</strong>
                <div className="centerCase">
                  <dl>
                    <dt>{t('base.location')}</dt>
                    <dd>{data.memberAreaName}</dd>
                  </dl>
                  <dl>
                    <dt>{t('version2_4.text89')}</dt>
                    <dd>{data.memberBusinessName}</dd>
                  </dl>
                  <dl>
                    <dt>{t('login.business_address')}</dt>
                    <dd>
                      {data.memberAddress} {data.memberDetailAddress}
                    </dd>
                  </dl>
                  <dl>
                    <dt>{t('version2_3.text5')}</dt>
                    <dd>{data.employeeCntName}</dd>
                  </dl>
                  <dl>
                    {/* 설립연도 */}
                    <dt>{t('version2_3.text4')}</dt>
                    <dd>
                      {data.establishYear}
                      {t('payment.year')}
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="detail">
                <div className="mBack notM">
                  <h4>
                    {/* 보철 종류 */}
                    <strong>{t('base.prosthesistype')}</strong>
                  </h4>
                  <ItemTag items={skills} className="itemTag" />
                </div>
                <div className="mBack">
                  <h4>
                    {/* <strong>회사 소개</strong> */}
                    <strong>{t('version2_3.text6')}</strong>
                  </h4>
                  <p className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.aboutUs)) }}></p>
                </div>
                <div className="mBack">
                  <h4>
                    {/* <strong>회사 사진</strong> */}
                    <strong>{t('version2_3.text7')}</strong>
                  </h4>
                  <ImageThumbs items={data?.imageList} imgName={'fileUrl'} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* url 복사 */}
      {isModal && (
        <ModalAlertPresent>
          <LinkAlert
            url={window.location.href}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 차단하기 */}
      {isModal2 && (
        <ModalAlertPresent>
          <BlockAlert
            onBlock={handleAddBlock}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 신고하기 */}
      {isModal3 && (
        <ModalPresent>
          <ReportModal
            type={'B'}
            target={{ memberNo: data.memberNo, memberName: data.memberDentistryName, profileImage: data.memberProfileImage || defaultImg }}
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default CenterViewPage;

import sampleProfile2 from '@assets/images/no_user.png';
import { ItemTag, ModalAlertPresent, ModalPresent, PostsMore } from '@components/common';
import BlockAlert from '@components/ui/modal/BlockAlert';
import ReportModal from '@components/ui/modal/ReportModal';
import { nameMaskingFormat } from '@utils/common';
import { Link, useNavigate } from 'react-router-dom';
import useProfileDetailPage from './hooks/useProfileDetailPage';
import { useTranslation } from 'react-i18next';

/**
 * path: /profile/view/{memberNo}
 * 프로필 보기
 * @returns
 */
const ProfileDetailPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, user, data, handleModifly, isModal, setIsModal, isModal2, setIsModal2, isMine, moreItems, handleAddBlock } = useProfileDetailPage();

  let cads = [];
  if (data?.memberSwName) cads = data?.memberSwName?.split(',').map((el) => ({ name: el }));
  if (data?.swEtc) cads.push({ name: data?.swEtc });
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            {/* 이전 */}${t('base.back')}
          </Link>
        </div>
        <div className="viewBox pfDView">
          <h2>
            {/* 치자이너 상세 */}
            {t('version2_1.text33')}
          </h2>
          <div className="cdInfo">
            <div className="back">
              <div className="infoD">
                <span className="profileImg">
                  <img src={data?.memberProfileImage || sampleProfile2} />
                </span>
                <div>
                  {/* <strong>{data?.memberNickName}</strong> */}
                  <strong>{isMine ? data?.memberNickName : data?.memberSe === 'A' ? nameMaskingFormat(data?.memberNickName) : data?.memberNickName}</strong>
                </div>
              </div>
            </div>

            <span className="right">
              {isMine && (
                <Link className="btnL sm" to="/mypage/modify">
                  {/* 프로필 수정하기 */}
                  {t('version2_1.text35')}
                </Link>
              )}

              {!isMine && user.memberSe !== 'A' && <PostsMore items={moreItems} />}
            </span>
          </div>
          <div className="tvs">
            <article>
              <div className="detail">
                <div className="mBack">
                  <h4>
                    <strong>
                      {/* 구동 가능한 CAD S/W */}
                      {t('version2_1.text43')}
                    </strong>
                  </h4>
                  <ItemTag items={cads} className="itemTag" />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 차단하기 */}
      {isModal && (
        <ModalAlertPresent>
          <BlockAlert
            onBlock={handleAddBlock}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 신고하기 */}
      {isModal2 && (
        <ModalPresent>
          <ReportModal
            type={'C'}
            targetType={'A'}
            target={{ memberNo: data?.memberNo, memberName: data?.memberNickName, profileImage: data?.memberProfileImage || sampleProfile2 }}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default ProfileDetailPage;

import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/no_user.png';
import { Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx, BaseTextArea, ModalPresent } from '@components/common';
import { RadioSet, FileUpload } from '@components/ui';
import ReqAddModal from '../../components/ui/modal/ReqAddModal';
import useReviewPage from './hooks/useReviewPage';
import { useTranslation } from 'react-i18next';

/**
 * 리뷰작성 페이지
 * 
 * 점수코멘트
  0.5 마음에 들지 않았어요.
  1 많이 아쉬워요.
  1.5 아쉬워요.
  2 그럭저럭이예요.
  2.5 그럭저럭 괜찮았어요.
  3 아쉬운 부분이 있지만 괜찮았어요!
  3.5 괜찮았어요!
  4 좋았어요!
  4.5 너무 좋았어요!
  5 너무 좋았어요, 감사합니다!  
 * @returns
 */
const ReviewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, isClick, files, setFiles, delFiles, setDelFiles, params, handleChange, handleSumbit, handleMessage, designer, avg, setAvg } = useReviewPage();

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{t('status.review')}</h2>
        <div className="writeBox withInfo">
          <div className="tws">
            <div className="infoNotes">
              <dl>
                <dt>{t('version2_2.text127')}</dt>
                <dd>
                  {t('version2_2.text128')} <br className="mline" />
                  {t('version2_2.text129')}
                </dd>
              </dl>
            </div>
            <div className="detail mt40">
              <div className="reviewUser">
                <span className="profileImg">
                  <img src={designer[0]?.designerProfileImage || sampleProfile} />
                </span>
                <span className="nick">
                  <span>{t('base.dental_designer')}</span>
                  <strong>{designer[0]?.memberNickName}</strong>
                </span>
              </div>
              <dl>
                <dt>
                  {t('version2_2.text130')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  <div className="ratingArea big pcCase">
                    <Rating
                      allowFraction
                      initialValue={avg}
                      onClick={(value) => {
                        setAvg(value);
                      }}
                      size={50}
                      fillColor="#FFB525"
                      emptyColor="#F7EFDE"
                      showTooltip
                    />
                    <div>{handleMessage(avg)}</div>
                  </div>
                  <div className="ratingArea big mCase">
                    <Rating
                      allowFraction
                      initialValue={avg}
                      onClick={(value) => {
                        setAvg(value);
                      }}
                      size={32}
                      fillColor="#FFB525"
                      emptyColor="#F7EFDE"
                    />
                    <div>
                      <span>{avg} / </span>
                      {handleMessage(avg)}
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('version2_2.text131')}
                  <sup>필수항목</sup>
                </dt>
                <dd>
                  {/* <textarea placeholder="자세하고 솔직한 리뷰는 다른 의뢰인에게 도움이 됩니다. (최소 5자 이상)"></textarea> */}
                  <BaseTextArea
                    id="reviewCn"
                    error={params.reviewCn.error}
                    isError={false}
                    value={params.reviewCn.value}
                    placeholder={params.reviewCn.placeholder}
                    maxLength={params.reviewCn.maxLength}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                  />
                </dd>
              </dl>
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_2.text132')}
                    {/* <sup>필수항목</sup> */}
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/5)
                  </em>
                </dt>
                <dd>
                  <FileUpload label={<label>drag&drop {t('version2_2.text133')}</label>} fileList={files} setFileList={setFiles} delFileList={delFiles} setDelFileList={setDelFiles} isMust={false} />
                </dd>
              </dl>
            </div>
            <div className="btnArea">
              <BaseButton label={t('base.completed')} className={'btnB'} onClick={handleSumbit} disabled={!isClick} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewPage;

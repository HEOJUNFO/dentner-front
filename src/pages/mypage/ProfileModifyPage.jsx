import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/no_user.png';
import { BaseInput, DragDropImage, BaseSelect, SwiperImage, BaseButton, BaseTextArea, ModalPresent, ModalFullPresent } from '@components/common';
import { ProstheticsPrice, ThreeDPotModal, ThreeDPotViewModal } from '@components/ui';
import useProfileModifyPage from './hooks/useProfileModifyPage';
import SwCheck from './components/SwCheck';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import sampleProfile from '@assets/images/sample/sample1.jpeg';
import useFileUpload from '@components/hooks/useFileUpload';

const ProfileModifyPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    data,
    profileImg,
    isDupClick,
    isDollar,
    setIsDollar,
    handleCheck,
    handleRest,
    handleFilesChange,
    handleChange,
    handleDupClick,
    handleSumbit,
    maxFile,
    fileTypes,
    maxSize,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    codeParentNo,
    items,
    handleProsthesistypeChange,
    prosthesistype, // 보철종류
    region, // 지역
    employees, // 치기공사 수
    years,
    handleChangeShowAt,
    isUploadModal,
    setUploadModal,
    handlePot,
    cadfiles,
    maxCadfilesFile,
    handlePotRemoveFile,
    isModal,
    setModal,
    handleThreeDView,
  } = useProfileModifyPage();

  const { handleAddFile, handleRemoveFile } = useFileUpload({ fileList: files, setFileList: setFiles, delFileList: delFiles, setDelFileList: setDelFiles, maxFile, fileTypes, maxSize });

  const { t } = useTranslation();

  const modiftNum = [
    { name: t('version2_1.text101'), value: 0 },
    { name: '1' + t('version2_1.text39'), value: 1 },
    { name: '3' + t('version2_1.text39'), value: 3 },
    { name: '5' + t('version2_1.text39'), value: 5 },
    { name: t('version2_3.text1'), value: 999 },
  ];

  const modiftTerm = [
    { name: t('version2_1.text101'), value: 0 },
    { name: '5' + t('version2_1.text41'), value: 5 },
    { name: '10' + t('version2_1.text41'), value: 10 },
    { name: '30' + t('version2_1.text41'), value: 30 },
  ];

  // const items = [{ file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }, { file_path: sampleProfile }];
  if (isLoading) return <></>;
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2 className={['B', 'C'].includes(data.memberSe.value) ? `withToggle` : ''}>
          {t('main_other.profile_mgt')}
          {['B', 'C'].includes(data.memberSe.value) && (
            <span className="toggleSet label">
              <input type="checkbox" id="toggleLabel" checked={data.showAt.value === 'Y' ? true : false} onChange={handleChangeShowAt} />
              <label>
                <span>{t('base.public')}</span>
                <em>{t('base.private')}</em>
              </label>
            </span>
          )}
        </h2>
        <article>
          <div className={`profileModify ${data.memberSe.value === 'A' ? '' : 'supply'}`}>
            <div className="tws">
              <div className={data.memberSe.value === 'A' ? '' : 'topArea'}>
                <span className="profileImgMBack">
                  <span className="profileImgBack">
                    <span className="profileImg">
                      <img src={profileImg || sampleProfile} />
                    </span>
                    <span className="profileUpload">
                      <BaseInput type="file" id="profileUpload" onChange={handleFilesChange} />
                    </span>
                  </span>
                </span>
                <dl>
                  <dt>
                    {t('login.nickname')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      type="text"
                      placeholder={data.memberNickName.placeholder}
                      id="memberNickName"
                      value={data.memberNickName.value}
                      error={data.memberNickName.error}
                      maxLength={data.memberNickName.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                    {Boolean(Number(data.memberNickName.success)) && <p className="notiP">{t('notify.usable_nickname')}</p>}
                    <BaseButton type="button" className={'btnB sm mt10'} label={t('version2_1.text58')} onClick={handleDupClick} disabled={isDupClick} />
                  </dd>
                </dl>

                {/* sw */}
                {['C', 'A'].includes(data.memberSe.value) && (
                  <SwCheck
                    swNo={data.swNo.value}
                    swEtc={data.swEtc.value}
                    swEtcDisabled={data.swEtc.disabled}
                    onChange={handleCheck}
                    onReset={handleRest}
                    onTextChange={(e) => handleChange('swEtc', e.target.value)}
                  />
                )}

                {/* 치자이너인 경우 */}
                {data.memberSe.value === 'C' && (
                  <>
                    <dl>
                      <dt>
                        {t('version2_1.text38')}
                        <sup>필수항목</sup>
                      </dt>
                      <dd>
                        <BaseSelect items={modiftNum} selectedValue={data?.modifyCnt?.value} onChange={(e) => handleChange('modifyCnt', e.value)} error={data?.modifyCnt?.error} />
                        {/* <BaseSelect items={stss} onChange={({ value }) => handleChange('statusFilter', value)} /> */}
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        {t('version2_1.text40')}
                        <sup>필수항목</sup>
                      </dt>
                      <dd>
                        <BaseSelect
                          items={modiftTerm}
                          selectedValue={data?.modifyWarrantyDay?.value}
                          onChange={(e) => handleChange('modifyWarrantyDay', e.value)}
                          error={data?.modifyWarrantyDay?.error}
                        />
                      </dd>
                    </dl>
                  </>
                )}
              </div>

              {['C', 'B'].includes(data.memberSe.value) && (
                <dl>
                  <dt>
                    {t('version2_3.text2')}
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    {/* <textarea placeholder="한줄소개를 입력해주세요. (최대 200자)"></textarea> */}
                    <BaseTextArea
                      id="oneIntroduction"
                      error={data.oneIntroduction.error}
                      value={data.oneIntroduction.value}
                      maxLength={data.oneIntroduction.maxLength}
                      placeholder={data.oneIntroduction.placeholder}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                  </dd>
                </dl>
              )}

              {/* 치자이너 */}
              {data.memberSe.value === 'C' && (
                <>
                  <dl>
                    <dt style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {t('version2_1.text44')}
                      <span className="right" style={{ display: 'flex', justifyContent: 'space-between', width: 108 }}>
                        <BaseButton
                          style={{
                            width: 47,
                            height: 40,
                            color: isDollar ? '#6687FA' : '#FFFFFF',
                            backgroundColor: isDollar ? '#F2F7FF' : '#4b72fe',
                            border: isDollar ? '1px solid #F2F7FF' : '1px solid #4b72fe',
                          }}
                          label={t('version2_3.text38')}
                          // label={'원화'}
                          className={'btnB ss'}
                          onClick={() => setIsDollar(false)}
                        />
                        <BaseButton
                          style={{
                            width: 47,
                            height: 40,
                            color: !isDollar ? '#6687FA' : '#FFFFFF',
                            backgroundColor: !isDollar ? '#F2F7FF' : '#4b72fe',
                            border: !isDollar ? '1px solid #F2F7FF' : '1px solid #4b72fe',
                          }}
                          label={t('version2_3.text39')}
                          // label={'달러'}
                          className={'btnB ss'}
                          onClick={() => setIsDollar(true)}
                        />
                      </span>
                    </dt>

                    <dd>
                      <ProstheticsPrice type={'write'} typeList={data.typeList} isDollar={isDollar} />
                    </dd>
                  </dl>
                  <dl>
                    <dt>
                      {t('version2_1.text46')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      {/* <textarea placeholder="참고사항을 입력해주세요. (최대 300자)"></textarea> */}
                      <BaseTextArea
                        id="note"
                        error={data.note.error}
                        value={data.note.value}
                        placeholder={data.note.placeholder}
                        maxLength={data.note.maxLength}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                      />
                    </dd>
                  </dl>
                </>
              )}

              {/* 치기공소 */}
              {data.memberSe.value === 'B' && (
                <>
                  <dl>
                    <dt>
                      {t('base.location')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd className="centerFillter">
                      <div>
                        {region?.map((el, idx) => {
                          return (
                            <span key={`groupName_${el['codeName']}_${idx}`}>
                              <BaseInput
                                type="radio"
                                id={`groupName_${el['codeNo']}_${idx}`}
                                name={`memberArea`}
                                value={el['codeNo']}
                                label={el['codeName']}
                                checked={data['memberAreaNo'].value.toString() === el['codeNo'].toString()}
                                onChange={(e) => handleChange('memberAreaNo', el['codeNo'])}
                              />
                            </span>
                          );
                        })}
                      </div>
                    </dd>
                  </dl>

                  <dl>
                    <dt>
                      {t('version2_3.text3')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd className="centerFillter">
                      {codeParentNo?.map((el, idx) => {
                        return (
                          <React.Fragment key={`CodeParentNo_${idx}`}>
                            <strong>{t(items[el.value].name)}</strong>
                            <div>
                              {items[el.value].value?.map((item, idxx) => {
                                return (
                                  <span key={`groupName_${el['codeName']}_${idxx}`}>
                                    <BaseInput
                                      type="checkbox"
                                      id={`groupName_${item['codeNo']}_${idxx}`}
                                      value={item['codeNo']}
                                      label={item['codeName']}
                                      checked={prosthesistype[el.id]?.includes(item['codeNo'].toString())}
                                      onChange={(e) => handleProsthesistypeChange(el.id, item['codeNo'].toString())}
                                    />
                                  </span>
                                );
                              })}
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </dd>
                  </dl>

                  <div className="officeEtc">
                    <dl>
                      <dt>
                        {t('version2_3.text4')}
                        <sup>필수항목</sup>
                      </dt>
                      <dd>
                        <BaseSelect items={years} placeholder={t('version2_1.text101')} selectedValue={data['establishYear'].value} onChange={(e) => handleChange('establishYear', e.value)} />
                      </dd>
                    </dl>
                    <dl className="staff">
                      <dt>
                        {t('version2_3.text5')}
                        <sup>필수항목</sup>
                      </dt>
                      <dd className="pcCase">
                        {employees?.map((el, idx) => {
                          return (
                            <span className="radioSet" key={`groupName_${el['codeName']}_${idx}`}>
                              <BaseInput
                                type="radio"
                                id={`groupName_${el['codeNo']}_${idx}`}
                                name={`employees`}
                                value={el['codeNo']}
                                label={el['codeName']}
                                checked={data['employeeCnt'].value.toString() === el['codeNo'].toString()}
                                onChange={(e) => handleChange('employeeCnt', el['codeNo'])}
                              />
                            </span>
                          );
                        })}
                      </dd>
                      <dd className="mCase">
                        <BaseSelect
                          items={employees}
                          titleName={'codeName'}
                          valueName={'codeNo'}
                          placeholder={t('version2_1.text101')}
                          selectedValue={data['employeeCnt'].value}
                          onChange={(e) => handleChange('employeeCnt', e.codeNo)}
                        />
                      </dd>
                    </dl>
                  </div>
                  <dl>
                    <dt>
                      {t('version2_3.text6')}
                      <sup>필수항목</sup>
                    </dt>
                    <dd>
                      <BaseTextArea
                        id="aboutUs"
                        error={data?.aboutUs?.error}
                        value={data?.aboutUs?.value}
                        placeholder={data?.aboutUs?.placeholder}
                        maxLength={data?.aboutUs?.maxLength}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                      />
                    </dd>
                  </dl>
                </>
              )}

              {['B', 'C'].includes(data?.memberSe?.value) && (
                <dl>
                  <dt className="etc">
                    <span>
                      {data?.memberSe?.value === 'C' && t('version2_1.text47')}
                      {data?.memberSe?.value === 'B' && t('version2_3.text7')}
                      <sup>필수항목</sup>
                    </span>
                    <em className="fileNum">
                      (<strong>{files.length}</strong>/{maxFile})
                    </em>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <DragDropImage className={'fileFind'} fileTypes={fileTypes} onHandleDrop={(file) => handleAddFile(file)} maxSize={maxSize}>
                        <label className="inq">
                          <strong>drag&drop {t('version2_3.text9')}</strong> {`(${t('version2_3.text8')} ${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}
                        </label>
                      </DragDropImage>

                      {/*  */}
                      <div className="pfImgSwiper">
                        <SwiperImage
                          items={files?.map((el, idx) => {
                            return (
                              <span className="imgSet">
                                <span>
                                  <img key={`${idx}pimgSet`} src={el.type === 'server' ? el.fileUrl : el.source} />
                                </span>
                                <button style={{ cursor: 'pointer' }} onClick={() => handleRemoveFile(idx)}>
                                  삭제
                                </button>
                              </span>
                            );
                          })}
                          perview={'auto'}
                          space="13"
                          pagination={false}
                        />
                      </div>
                      {/*  */}
                    </div>
                  </dd>
                </dl>
              )}

              {['C'].includes(data?.memberSe?.value) && (
                <dl>
                  <dt className="etc">
                    <span>
                      {t('version2_3.text9')}
                      <em> (클릭시 상세보기)</em>
                    </span>
                    <em className="fileNum">
                      (<strong>{cadfiles.length}</strong>/{maxCadfilesFile})
                    </em>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <label class="fileFind" style={{ marginTop: 10 }} htmlFor="file" onClick={() => setUploadModal(true)}>
                        <label class="inq">
                          <strong>stl {t('version2_3.text11')}</strong> {`(stl ${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}
                        </label>
                      </label>

                      {/*  */}
                      <div className="pfImgSwiper">
                        <SwiperImage
                          items={cadfiles?.map((el, idx) => {
                            return (
                              <span className="imgSet">
                                <span onClick={() => handleThreeDView(el)}>
                                  <img key={`${idx}pimgSet`} src={el.type === 'server' ? el.fileUrl : el.source} />
                                </span>
                                <button style={{ cursor: 'pointer' }} onClick={() => handlePotRemoveFile(idx)}>
                                  삭제
                                </button>
                              </span>
                            );
                          })}
                          perview={'auto'}
                          space="13"
                          pagination={false}
                        />
                      </div>
                      {/*  */}
                    </div>
                  </dd>
                </dl>
              )}
            </div>

            <BaseButton className={'btnB modifyCase'} label={t('base.mutate')} onClick={handleSumbit} />
          </div>
        </article>
      </section>

      {/* 3d 포트폴리오 첨부 */}
      {isUploadModal && (
        <ModalPresent>
          <ThreeDPotModal
            handlePot={handlePot}
            onClose={() => {
              setUploadModal(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 3d 뷰어 */}
      {isModal?.isVisible && (
        <ModalFullPresent>
          <ThreeDPotViewModal
            {...isModal}
            onClose={() => {
              setModal({ isVisible: false });
            }}
          />
        </ModalFullPresent>
      )}
    </>
  );
};

export default ProfileModifyPage;

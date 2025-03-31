import React, { useEffect, useRef, useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseSelect, ItemTag, BaseButton, ImageSettingEx, ModalPresent, BaseTextArea } from '@components/common';
import { RadioFilter, FileUpload, CheckSet } from '@components/ui';

import InquireTipModal from '../../components/ui/modal/InquireTipModal';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';
import { useRequestEasyForm } from './hooks/useRequestEasyForm';
import ProstheticsType from './components/ProstheticsType';
import SelectProsthetics from './components/SelectProsthetics';
import { useTranslation } from 'react-i18next';

/**
 * 의뢰서 간편모드 작성
 * @returns
 */
const RequestEasyForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    params,
    maxFile,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    handleChange,
    handleCheck,
    teethTypeCode,
    millingTypeCode,
    handleChangeMillingType,
    handleAddTeethType,
    handleTypeCountChange,
    handleRemoveType,
    handleSubmit,
    handleSubmitDraft,
    handleOftenSubmit,
    mode,
    fetchData,
    isMobile,
  } = useRequestEasyForm();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);


  console.log(params?.typeList?.value)

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>{t('main_tip.tab_nav.simple_mode')}</strong>
              {t('version2_2.text24')}
              <br />
              &nbsp;{t('request_target.write')}
            </h2>
            <span>
              <BaseButton
                label={`${t('transaction.temp_saved')} ${t('version2_2.text25')}`}
                className="btnL ss"
                onClick={() => {
                  isMobile ? navigate('/request/tempSaved', { state: { type: 'A' } }) : setIsModal2(true);
                }}
              />
            </span>
          </div>
        </div>
        <div className="writeBox">
          <div className="tws" style={{ marginTop: 0 }}>
            <div className="detail">
              <BaseButton
                label={t('version2_2.text26')}
                className="btnB ss tip"
                onClick={() => {
                  isMobile ? navigate('/request/requestTip') : setIsModal(true);
                }}
              />
              <dl>
                <dt>
                  {t('version2_2.text10')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseInput
                    type="text"
                    id="requestNumber"
                    placeholder={params?.requestNumber?.placeholder}
                    value={params?.requestNumber?.value}
                    error={params?.requestNumber?.error}
                    maxLength={params?.requestNumber?.maxLength}
                    onChange={(e) => {
                      const regex = /^[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
                      handleChange(e.target.id, e.target.value);
                      if (!regex.test(e.target.value)) {
                        const newValue = e.target.value.slice(0, -1);
                        handleChange(e.target.id, newValue);
                      }
                    }}
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('base.prosthesistype')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <ProstheticsType code={teethTypeCode} onClick={handleAddTeethType} maxCnt={10} currCnt={params?.typeList?.value.length} />
                  {params?.typeList?.error && <p className="errorP">{params?.typeList?.error}</p>}
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('version2_2.text47')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <ul className="dChoosed">
                    {params?.typeList?.value.map((el, idx) => {
                      return (
                        <SelectProsthetics
                          isEdit={!el.direct}
                          key={`${el.valueName}_${idx}`}
                          element={el}
                          placeholder={''}
                          onChange={(e) => handleTypeCountChange(idx, { ...el, typeCount: isNaN(e.target.value) ? '' : e.target.value, error: '' })}
                          onDeleteClick={(e) => handleRemoveType(idx)}
                        />
                      );
                    })}
                  </ul>
                  <div className={`guide ${isMobile ? 'm' : ''}`}>
                    <p>
                      {t('version2_2.text48')} <strong>{t('version2_2.text49')}</strong>
                      {t('version2_2.text50')}
                    </p>
                  </div>
                </dd>
              </dl>
              {/* 가공방법 */}
              {isMobile ? (
                <dl>
                  <dt>{t('version2_2.text11')}</dt>
                  <dd>
                    <div className="millingMType">
                      <BaseSelect
                        items={millingTypeCode}
                        titleName={'codeName'}
                        valueName={'codeNo'}
                        placeholder={t('version2_4.text116')}
                        selectedValue={params?.requestProcessNo?.value}
                        input={true}
                        inputValue={params?.requestProcessEtcName.value}
                        valueChange={(e) => handleChange('requestProcessEtcName', e.target.value)}
                        onChange={handleChangeMillingType}
                      />
                    </div>
                  </dd>
                </dl>
              ) : (
                <RadioFilter
                  title={t('version2_2.text11')}
                  items={millingTypeCode}
                  ddClassName={'itemSelect'}
                  spanClassName={'radioSet'}
                  groupName={'milling'}
                  titleName={'codeName'}
                  valueName={'codeNo'}
                  checkValue={params?.requestProcessNo?.value}
                  onChange={handleChangeMillingType}
                  onTextChange={(e) => handleChange('requestProcessEtcName', e.target.value)}
                  etcValue={params?.requestProcessEtcName.value}
                />
              )}
              <dl>
                <dt>{t('version2_2.text34')}</dt>
                <dd>
                  <div
                    style={{
                      border: params?.requestDc.error ? '1px solid #D8DDE5' : '',
                    }}
                    className="detailTxt"
                  >
                    <BaseTextArea
                      id="requestDc"
                      error={params?.requestDc.error}
                      value={params?.requestDc.value}
                      placeholder={params?.requestDc.placeholder}
                      maxLength={params?.requestDc.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                    <div>
                      <BaseButton
                        label={t('version2_3.text61')}
                        onClick={() => {
                          isMobile ? navigate('/request/oftenDt', { state: { type: 'A', params } }) : setIsModal3(true);
                        }}
                      />
                      <BaseButton label={t('version2_3.text127')} onClick={handleOftenSubmit} disabled={!params?.requestDc?.value || params?.requestDc?.value?.length === 0} />
                    </div>
                  </div>
                </dd>
              </dl>
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_2.text35')}
                    <sup>필수항목</sup>
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/{maxFile})
                  </em>
                </dt>
                <dd>
                  {/* <ImageSettingEx imgFileList={imgFileList} setImgFileList={setImgFileList} /> */}
                  <FileUpload
                    isMust={true}
                    fileList={files}
                    setFileList={setFiles}
                    delFileList={delFiles}
                    setDelFileList={setDelFiles}
                    maxFile={maxFile}
                    maxSize={500}
                    fileTypes={['pdf', 'jpg', 'png', 'zip', 'stl', 'obj', 'ply', 'dcm']}
                    label={
                      <label className="inq">
                        <strong>{t('version2_1.text27')}</strong> {`(zip${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}
                      </label>
                    }
                    guide={
                      <em className="guide">
                        <div>
                          <>
                            {`[${t('version2_2.text41')}]`} <i>{t('version2_2.text38')}</i> / {`[${t('version2_2.text40')}]`} <i>{t('version2_2.text39')}</i>{' '}
                          </>
                          <br />
                          <>
                            {`[${t('version2_2.text42')}]`} <i>pdf, jpg, png, zip, stl, obj, ply, dcm</i>
                          </>
                        </div>
                      </em>
                    }
                  />
                </dd>
              </dl>
              <dl>
                <dt>
                  {t('version2_2.text43')} <sup>필수항목</sup>
                </dt>
                <dd className="inqAgree">
                  <div>
                    <CheckSet id={'isConfirm'} onChange={handleCheck} value={params?.isConfirm.value} label={t('version2_2.text44')} />
                  </div>
                  {/* <div>
                    <CheckSet
                      id={'isTemp'}
                      onChange={handleCheck}
                      value={params?.isTemp.value}
                      label={
                        '의뢰인]은, [환자]의 의료정보, 민감정보 또는 개인정보인 [보철물 의뢰에 필요한 의뢰서, 3D File]을 개인정보 보호법 제17조에 따라 [환자]로부터 제3자인 주식회사 덴트너에 제공하는 것에 대하여 명시적이고 구체적인 동의를 받았음을 확인합니다.'
                      }
                    />
                    <BaseButton label="양식 보기" />
                  </div>
                  <div>
                    <em>* 주식회사 덴트너와 개인정보 업무위탁 계약관리를 체결하면, 환자에게 매번 '개인정보 제 3자 제공 동의서'를 받지 않아도 됩니다. </em>
                    <BaseButton label="자세히 보기" />
                  </div> */}
                </dd>
              </dl>
            </div>

            <div className="btnArea col">
              <BaseButton label={t('version2_2.text45')} className={'btnL'} onClick={handleSubmitDraft} />
              <BaseButton label={t('version2_2.text46')} className={'btnB'} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </section>
      {isModal && (
        <ModalPresent>
          <InquireTipModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal2 && (
        <ModalPresent>
          <TemporaryModal
            type={'A'}
            onLoad={(requestDocGroupNo) => {
              fetchData(requestDocGroupNo);
            }}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal3 && (
        <ModalPresent>
          <OftenDTModal
            type={'A'}
            onClose={() => {
              setIsModal3(false);
            }}
            onLoad={(often) => {
              handleChange('requestDc', often);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default RequestEasyForm;

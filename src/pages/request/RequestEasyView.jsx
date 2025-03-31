import React, {useState} from 'react';

import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseSelect,  ModalPresent, BaseTextArea } from '@components/common';
import { RadioFilter} from '@components/ui';

import InquireTipModal from '../../components/ui/modal/InquireTipModal';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';
import ProstheticsType from './components/ProstheticsType';
import SelectProsthetics from './components/SelectProsthetics';
import { useTranslation } from 'react-i18next';
import {useRequestEasyView} from "@pages/request/hooks/useRequestEasyView.jsx";
import {getByteSize} from "../../utils/common.js";
import useFileDownload from "../../components/hooks/useFileDownload.jsx";

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
  } = useRequestEasyView();

  const { handleFileDownload, handleFileZipDownload, handleFileDownloadEncrypt, handleFileZipDownloadEncrypt } = useFileDownload();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>{t('main_tip.tab_nav.simple_mode')}</strong>
              {t('version2_2.text24')}
              <br />
            </h2>
          </div>
        </div>
        <div className="writeBox">
          <div className="tws" style={{ marginTop: 0 }}>
            <div className="detail">
              <dl>
                <dt>
                  {t('version2_2.text10')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <BaseInput
                      readOnly
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
                  <ProstheticsType code={teethTypeCode} onClick={handleAddTeethType} maxCnt={10} currCnt={params?.typeList?.value.length} viewMode={true}/>
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
                          isViewMode={true}
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
                        readOnly
                      id="requestDc"
                      error={params?.requestDc.error}
                      value={params?.requestDc.value}
                      placeholder={params?.requestDc.placeholder}
                      maxLength={params?.requestDc.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                    />
                  
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
                  {files?.map((el, idx) => {
                    return (
                        <li key={`fileSet_${idx}`}>
                          <span className={`fileLoad ${idx === 0 ? '' : 'notMust'}`}>
                            <span>
                              {el.fileName}
                              <em>{getByteSize(el.fileSize)}</em>
                            </span>
                            <button className="bFD" onClick={(e) => handleFileDownloadEncrypt(e, el.fileNo, el.fileName)}>
                              Download
                            </button>
                          </span>
                        </li>
                    );
                  })}
                 
                </dd>
              </dl>
            
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

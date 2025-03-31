import React, {useState} from 'react';

import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseSelect, ModalPresent, BaseTextArea } from '@components/common';
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
 * 의뢰서 간편모드 작성 (뷰어 모드)
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

  // 뷰어 모드에서는 모달이 필요 없으므로 상태만 유지하고 사용하지 않음
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
                  />
                </dd>
              </dl>
              {/* <dl>
                <dt>
                  {t('base.prosthesistype')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <ProstheticsType code={teethTypeCode} maxCnt={10} currCnt={params?.typeList?.value.length} viewMode={true}/>
                  {params?.typeList?.error && <p className="errorP">{params?.typeList?.error}</p>}
                </dd>
              </dl> */}
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
                          // 상호작용 이벤트 제거
                          readOnly={true}
                          disableRemove={true}
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
                        disabled={true}
                        readOnly={true}
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
                  disabled={true}
                  readOnly={true}
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
                            {/* 파일 다운로드 기능은 뷰어모드에서도 필요하므로 유지 */}
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
      {/* 뷰어 모드에서는 모달이 필요 없으므로 제거 */}
    </>
  );
};

export default RequestEasyForm;
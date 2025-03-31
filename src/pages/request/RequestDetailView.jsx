import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseButton, BaseSelect, BaseTextArea } from '@components/common';
import { RadioFilter, RadioSet } from '@components/ui';
import { ModalPresent } from '@components/common';
import Tabs from './components/detailmode/Tabs';
import Tooths from './components/detailmode/Tooths';
import ProstheticsType from './components/ProstheticsType';
import SelectProsthetics from './components/SelectProsthetics';
import UnitSet from './components/detailmode/UnitSet';
import NumValue from './components/detailmode/NumValue';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../components/hooks/useWindowSize';
import {useRequestDetailView} from "@pages/request/hooks/useRequestDetailView.jsx";
import {getByteSize} from "../../utils/common.js";
import useFileDownload from "../../components/hooks/useFileDownload.jsx";

const InquireWritePage = () => {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  
  // Initialize with expanded view state for better viewing experience
  const [isOn, setOptionView] = useState(true);
  
  const [sStep, setSearchTab] = useState(1);
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {}, [imgFileList]);

  const {
    pontic,
    values,
    valueSe,
    agree,
    params,
    setParams,
    activeIndex,
    maxFile,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    handleChange,
    handleReqTabAdd,
    handleReqTabRemove,
    handleReqTabClick,
    handleToothsChange,
    handleToothsRemove,
    isNumValue,
    teethTypeCode,
    millingTypeCode,
    handleToggle,
    handleCheck,
    handleAddTeethType,
    handleRemoveType,
    handleOftenSubmit,
    handleChangeMillingType,
    handleSubmit,
    handleSubmitDraft,
    toothsRef,
    fetchData,
  } = useRequestDetailView();

  const { t } = useTranslation();
  const { handleFileDownload, handleFileZipDownload, handleFileDownloadEncrypt, handleFileZipDownloadEncrypt } = useFileDownload();

  // Empty handler functions to replace interactive handlers
  const emptyHandler = () => {};

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>{t('main_tip.tab_nav.detail_mode')}</strong>
              {t('version2_2.text24')}
              <br />
            </h2>
          </div>
        </div>

        {/* Read-only tabs with no interaction */}
        <Tabs 
          tabs={params} 
          onAdd={emptyHandler} 
          onRemove={emptyHandler} 
          onActive={(index) => setSearchTab(index)} 
          readOnly={true}
        />

        <div className="writeBox inquireBox">
          <div className="tws inqDCase">
            {/* Hide delete buttons in view mode */}
            
            <div className="detail">
              {activeIndex === 0 && (
                <dl>
                  <dt>
                    {t('version2_2.text10')} <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      readOnly={true}
                      type="text"
                      id="requestNumber"
                      placeholder={params[activeIndex].requestNumber.placeholder}
                      value={params[activeIndex].requestNumber.value}
                      error={params[activeIndex].requestNumber.error}
                      maxLength={params[activeIndex].requestNumber.maxLength}
                      onChange={emptyHandler}
                    />
                  </dd>
                </dl>
              )}

              <dl>
                <dt>
                  {t('base.prosthesistype')} <sup>필수항목</sup>
                </dt>
                <dd>
                  <ProstheticsType
                    viewMode={true}
                    activeIndex={activeIndex}
                    params={params}
                    code={teethTypeCode}
                    onClick={emptyHandler}
                    maxCnt={1}
                    currCnt={params[activeIndex].typeList.value.length}
                  />
                  {params[activeIndex].typeList.error && <p className="errorP">{params[activeIndex].typeList.error}</p>}
                  {params[activeIndex].typeList.value.length > 0 && 
                    <Tooths 
                      ref={toothsRef} 
                      activeIndex={activeIndex} 
                      params={params} 
                      setParams={setParams} 
                      onChange={emptyHandler} 
                      isViewMode={true}
                    />
                  }
                </dd>
              </dl>

              {params.length > 0 && (
                <>
                  <dl>
                    <dt>
                      {t('version2_2.text27')} <sup>필수항목</sup>
                    </dt>
                    <UnitSet 
                      activeIndex={activeIndex} 
                      params={params} 
                      setParams={setParams} 
                      onRemove={emptyHandler} 
                      isViewMode={true}
                    />
                  </dl>
                  <dl>
                    <dt>{t('version2_2.text28')}</dt>
                    <dd>
                      <ul className="dChoosed">
                        {
                          params?.map((el, idx) => {
                            return el?.typeList?.value.map((el2, idx2) => {
                              return (
                                <SelectProsthetics
                                  isViewMode={true}
                                  isEdit={false}
                                  key={`${el2.valueName}_${idx2}`}
                                  element={el2}
                                  placeholder={''}
                                  onChange={emptyHandler}
                                  onDeleteClick={emptyHandler}
                                />
                              );
                            })
                          })
                        }
                      </ul>
                    </dd>
                  </dl>
                </>
              )}

              <div>
                {/* Replace toggle button with static display of content */}
                <BaseButton
                  label={t('version2_2.text29')}
                  className="btnOptionMore on"
                  onClick={emptyHandler}
                  disabled={true}
                />

                <div className="optionArea" style={{ display: 'block' }}>
                  {/* Display milling method without interaction */}
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
                            selectedValue={params[activeIndex]?.requestProcessNo?.value}
                            input={true}
                            inputValue={params[activeIndex]?.requestProcessEtcName.value}
                            valueChange={emptyHandler}
                            onChange={emptyHandler}
                            disabled={true}
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
                      checkValue={params[activeIndex].requestProcessNo.value}
                      etcValue={params[activeIndex].requestProcessEtcName?.value}
                      disabled={true}
                    />
                  )}

                  <dl>
                    <dt>{t('version2_2.text31')}</dt>
                    <dd className="maxW">
                      <BaseInput
                        readOnly={true}
                        type="text"
                        id="implantType"
                        placeholder={params[activeIndex].implantType.placeholder}
                        value={params[activeIndex].implantType.value}
                        error={params[activeIndex].implantType.error}
                        maxLength={params[activeIndex].implantType.maxLength}
                        onChange={emptyHandler}
                      />
                    </dd>
                  </dl>

                  <dl>
                    <dt>{t('version2_2.text32')}</dt>
                    <dd className={isNumValue ? 'numvalue directCase' : 'numvalue'}>
                      <RadioSet 
                        items={valueSe} 
                        groupName={'valueSe'} 
                        checkValue={params[activeIndex].valueSe.value} 
                        onChange={emptyHandler}
                        disabled={true} 
                      />

                      {isNumValue && (
                        <NumValue 
                          values={values} 
                          params={params} 
                          activeIndex={activeIndex} 
                          onChange={emptyHandler}
                          isViewMode={true} 
                        />
                      )}
                    </dd>
                  </dl>
                  <dl>
                    <dt>{t('version2_2.text33')}</dt>
                    <dd className="pontic">
                      <RadioSet
                        items={pontic}
                        groupName={'requestPonticSe'}
                        titleName={'label'}
                        checkValue={params[activeIndex].requestPonticSe.value}
                        onChange={emptyHandler}
                        disabled={true}
                      />
                    </dd>
                  </dl>
                </div>
              </div>
              <dl>
                <dt>{t('version2_2.text34')}</dt>
                <dd>
                  <div className="detailTxt">
                    <BaseTextArea
                      id="requestDc"
                      error={params[activeIndex].requestDc.error}
                      value={params[activeIndex].requestDc.value}
                      placeholder={params[activeIndex].requestDc.placeholder}
                      onChange={emptyHandler}
                      maxLength={params[activeIndex].requestDc.maxLength}
                      readOnly={true}
                    />
                  </div>
                </dd>
              </dl>
              <dl>
                <dt className="etc">
                  <span>
                    <span>
                      {t('version2_2.text35')}
                      <sup>필수항목</sup>
                    </span>
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/{maxFile})
                  </em>
                </dt>
                <dd>
                  <ul>
                    {files?.map((el, idx) => {
                      return (
                        <li key={`fileSet_${el.fileNo}_${idx}`}>
                          <span className={`fileLoad ${idx === 0 ? '' : 'notMust'}`}>
                            <span>
                              {el.fileName}
                              <em>{getByteSize(el.fileSize)}</em>
                            </span>
                            {/* Keep download capability but disable other file interactions */}
                            <button className="bFD" onClick={(e) => handleFileDownloadEncrypt(e, el.fileNo, el.fileName)}>
                              Download
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InquireWritePage;
import React, { useEffect,  useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseInput, BaseButton,  BaseSelect, BaseTextArea } from '@components/common';
import { RadioFilter,  RadioSet, CheckSet } from '@components/ui';
import FileUpload2 from '../../components/ui/components/FileUpload2';
import InquireTipModal from '../../components/ui/modal/InquireTipModal';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';
import NumValueModal from '../../components/ui/modal/NumValueModal';
import { ModalPresent } from '@components/common';
import { useRequestDetailForm } from './hooks/useRequestDetailForm';
import Tabs from './components/detailmode/Tabs';
import Tooths from './components/detailmode/Tooths';
import ProstheticsType from './components/ProstheticsType';
import SelectProsthetics from './components/SelectProsthetics';
import UnitSet from './components/detailmode/UnitSet';
import NumValue from './components/detailmode/NumValue';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../components/hooks/useWindowSize';

const InquireWritePage = () => {
  const isMobile = useWindowSize();
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setIsModal4] = useState(false);

  const [isOn, setOptionView] = useState(true);
  const toggleHandler = () => {
    setOptionView(!isOn);
  };

  const [sStep, setSearchTab] = useState(1);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
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
  } = useRequestDetailForm();

  const { t } = useTranslation();

  return (
    <>
      <section>
        <div className="titNbtn inqCase">
          <div>
            <h2>
              <strong>{t('main_tip.tab_nav.detail_mode')}</strong>
              {t('version2_2.text24')}
              <br />
              &nbsp;{t('request_target.write')}
            </h2>
            <span>
              <BaseButton
                label={`${t('transaction.temp_saved')} ${t('version2_2.text25')}`}
                className="btnL ss"
                onClick={() => {
                  isMobile ? navigate('/request/tempSaved', { state: { type: 'B' } }) : setIsModal2(true);
                }}
              />
            </span>
          </div>
        </div>

        <Tabs tabs={params} onAdd={handleReqTabAdd} onRemove={handleReqTabRemove} onActive={handleReqTabClick} />

        <div className="writeBox inquireBox">
          {/* tws 영역을 tab 별로 적용 */}
          <div className="tws inqDCase">
            <button className="bTDM">{t('transaction.delete_request')}</button> {/* 모바일용 tab 삭제버튼 */}
            {params.map((tab, idx) => {
  if (idx !== 0) {
    return (
      <button
        key={`delete-tab-${idx}`}
        className="bTDM"
        onClick={(e) => {
          e.stopPropagation();
          handleReqTabRemove(idx);
        }}
      >
        {t('transaction.delete_request')}
      </button>
    );
  }
  return null; // Add explicit return for the else case
})}
            <div className="detail">
              <BaseButton
                label={t('version2_2.text26')}
                className="btnB ss tip"
                onClick={() => {
                  isMobile ? navigate('/request/requestTip') : setIsModal(true);
                }}
              />
              {activeIndex === 0 && (
                <dl>
                  <dt>
                    {t('version2_2.text10')} <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      type="text"
                      id="requestNumber"
                      placeholder={params[activeIndex].requestNumber.placeholder}
                      value={params[activeIndex].requestNumber.value}
                      error={params[activeIndex].requestNumber.error}
                      maxLength={params[activeIndex].requestNumber.maxLength}
                      onChange={(e) => {
                        const regex = /^[^a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/;
                        handleChange(e.target.id, e.target.value);
                        if (!regex.test(e.target.value)) {
                          const newValue = e.target.value.slice(0, -1);
                          handleChange(e.target.id, newValue);
                        }
                      }}
                      disabled={activeIndex === 0 ? false : true}
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
                    activeIndex={activeIndex}
                    params={params}
                    code={teethTypeCode}
                    onClick={handleAddTeethType}
                    maxCnt={1}
                    currCnt={params[activeIndex].typeList.value.length}
                  />
                  {params[activeIndex].typeList.error && <p className="errorP">{params[activeIndex].typeList.error}</p>}
                  {params[activeIndex].typeList.value.length > 0 && <Tooths ref={toothsRef} activeIndex={activeIndex} params={params} setParams={setParams} onChange={handleToothsChange} />}
                </dd>
              </dl>
              {params.length > 0 && (
                <>
                  <dl>
                    <dt>
                      {t('version2_2.text27')} <sup>필수항목</sup>
                    </dt>
                    <UnitSet activeIndex={activeIndex} params={params} setParams={setParams} onRemove={handleToothsRemove} />
                  </dl>
                  <dl>
                    <dt>{t('version2_2.text28')}</dt>
                    <dd>
                      <ul className="dChoosed">
                        {
                          params?.map((el , idx) => {
                            return el?.typeList?.value.map((el2, idx2) => {
                              return (
                                  <SelectProsthetics
                                      isEdit={false}
                                      key={`${el2.valueName}_${idx2}`}
                                      element={el2}
                                      placeholder={''}
                                      onChange={(e) => handleTypeCountChange(idx2, { ...el, typeCount: e.target.value, error: '' })}
                                      onDeleteClick={(e) => handleRemoveType(idx2)}
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
                <BaseButton
                  label={`${params[activeIndex].isOn ? t('version2_2.text29') : t('version2_2.text30')}`}
                  className={`${params[activeIndex].isOn ? 'btnOptionMore on' : 'btnOptionMore'}`}
                  onClick={handleToggle}
                />
                <div className="optionArea" style={{ display: `${params[activeIndex].isOn ? 'block' : 'none'}` }}>
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
                            selectedValue={params[activeIndex]?.requestProcessNo?.value}
                            input={true}
                            inputValue={params[activeIndex]?.requestProcessEtcName.value}
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
                      checkValue={params[activeIndex].requestProcessNo.value}
                      onChange={handleChangeMillingType}
                      onTextChange={(e) => handleChange('requestProcessEtcName', e.target.value)}
                      etcValue={params[activeIndex].requestProcessEtcName?.value}
                    />
                  )}

                  <dl>
                    <dt>{t('version2_2.text31')}</dt>
                    <dd className="maxW">
                      <BaseInput
                        type="text"
                        id="implantType"
                        placeholder={params[activeIndex].implantType.placeholder}
                        value={params[activeIndex].implantType.value}
                        error={params[activeIndex].implantType.error}
                        maxLength={params[activeIndex].implantType.maxLength}
                        onChange={(e) => handleChange(e.target.id, e.target.value)}
                      />
                    </dd>
                  </dl>

                  <dl>
                    <dt>{t('version2_2.text32')}</dt>
                    <dd className={isNumValue ? 'numvalue directCase' : 'numvalue'}>
                      <RadioSet items={valueSe} groupName={'valueSe'} checkValue={params[activeIndex].valueSe.value} onChange={(e) => handleChange('valueSe', e.target.value, 1)} />

                      {isNumValue && (
                        <NumValue values={values} params={params} activeIndex={activeIndex} onChange={handleChange} />
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
                        onChange={(e) => handleChange('requestPonticSe', e.target.value, 1)}
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
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                      maxLength={params[activeIndex].requestDc.maxLength}
                    />
                    <div>
                      <BaseButton
                        label={t('version2_3.text61')}
                        onClick={() => {
                          isMobile ? navigate('/request/oftenDt', { state: { type: 'B', params } }) : setIsModal3(true);
                        }}
                      />
                      <BaseButton label={t('version2_3.text127')} onClick={handleOftenSubmit} disabled={!params[activeIndex].requestDc.value.length} />
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
    <FileUpload2
      fileList={files}
      setFileList={setFiles}
      delFileList={delFiles}
      setDelFileList={setDelFiles}
    />
  </dd>
</dl>
              <dl>
                <dt>
                  {t('version2_2.text43')} <sup>필수항목</sup>
                </dt>
                <dd className="inqAgree">
                  <div>
                    <CheckSet id={'isConfirm'} onChange={handleCheck} value={agree.isConfirm.value} label={t('version2_2.text44')} />
                  </div>
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

      {/* 작성 Tip */}
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
            type={'B'}
            onLoad={(requestDocGroupNo) => {
              fetchData(requestDocGroupNo);
            }}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 자주쓰는말 */}
      {isModal3 && (
        <ModalPresent>
          <OftenDTModal
            type={'B'}
            onClose={() => {
              setIsModal3(false);
            }}
            onLoad={(often) => {
              handleChange('requestDc', often);
            }}
          />
        </ModalPresent>
      )}

      {isModal4 && (
        <ModalPresent>
          <NumValueModal
            onClose={() => {
              setIsModal4(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default InquireWritePage;

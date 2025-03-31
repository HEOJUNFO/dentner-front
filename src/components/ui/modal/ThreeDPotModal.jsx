import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton, DragDropImage, SwiperImage } from '@components/common';
import { FileUpload } from '@components/ui';
import { useSnack } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import { post3d } from '@api/Payment';
import { replaceToBr, withCommas, strToLength } from '@utils/common';
import useFileUpload from '@components/hooks/useFileUpload';

const ThreeDPotModal = ({ onClose, handlePot }) => {
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const maxFile = 1;
  const fileTypes = ['png', 'jpg'];
  const maxSize = 500;

  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일
  const { handleAddFile, handleRemoveFile } = useFileUpload({ fileList: files, setFileList: setFiles, delFileList: delFiles, setDelFileList: setDelFiles, maxFile, fileTypes, maxSize });

  const cadMaxFile = 10;
  const [cadFiles, setCadFiles] = useState([]);
  const [cadDelFiles, setCadDelFiles] = useState([]);

  const handleSubmit = () => {
    if (files.length === 0) {
      showWarnSnackbar(t('version2_3.text113'));
      return;
    }
    if (cadFiles.length === 0) {
      showWarnSnackbar(t('version2_3.text114'));
      return;
    }

    const time = Date.now();
    const newCad = cadFiles.map((el) => {
      const maskingName = el?.fileName + '_' + time;
      return {
        ...el,
        newFile: new File([el.file], maskingName, { type: el?.fileType }), // File생성자를 이용해서 oldFile의 이름을 바꿔준다
      };
    });

    const newImg = files.map((el) => {
      const maskingName = el?.fileName + '_' + time;
      return {
        ...el,
        cadFile: newCad,
        newFile: new File([el.file], maskingName, { type: el?.fileType }), // File생성자를 이용해서 oldFile의 이름을 바꿔준다
      };
    });

    if (handlePot) handlePot(newImg);
  };

  return (
    <>
      <div className="basicPop threeDCommsPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">
          {t('version2_3.text10')} {t('status.upload')}
        </h1>
        <div className="pBack">
          <div className="tws">
            <div className="detail">
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_3.text115')}
                    <sup>필수항목</sup>
                  </span>
                  <em className="fileNum">
                    (<strong>{files.length}</strong>/{maxFile})
                  </em>
                </dt>
                <dd>
                  <div className="fileSet">
                    <DragDropImage className={'fileFind'} maxFile={maxFile} fileTypes={fileTypes} onHandleDrop={(file) => handleAddFile(file)} maxSize={maxSize}>
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
                                {t('version2_2.text3')}
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
              <dl>
                <dt className="etc">
                  <span>
                    {t('version2_3.text116')}
                    <sup>필수항목</sup>
                  </span>
                  <em className="fileNum">
                    (<strong>{cadFiles.length}</strong>/{cadMaxFile})
                  </em>
                </dt>
                <dd>
                  <FileUpload
                    fileList={cadFiles}
                    setFileList={setCadFiles}
                    delFileList={cadDelFiles}
                    setDelFileList={setCadDelFiles}
                    maxFile={cadMaxFile}
                    maxSize={500}
                    fileTypes={['stl']}
                    label={
                      <label className="inq">
                        <strong>drag&drop {t('version2_1.text27')}</strong> {`(stl ${t('version2_2.text36')}, 500MB ${t('version2_2.text37')})`}
                      </label>
                    }
                    guide={
                      <em className="guide">
                        [{t('version2_4.text39')}] <i>stl</i> (500MB {t('version2_2.text37')})
                      </em>
                    }
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_3.text117')} className={'btnB'} onClick={() => handleSubmit()} />
        </div>
      </div>
    </>
  );
};

export default ThreeDPotModal;

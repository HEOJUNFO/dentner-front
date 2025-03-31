import React from 'react';
import PropTypes from 'prop-types';
import { DragDropImage } from '@components/common';
import useFileUpload from '@components/hooks/useFileUpload';
import FileItem from './FileItem';
import { useTranslation } from 'react-i18next';

const FileUpload = ({ fileList, setFileList, delFileList, setDelFileList, maxSize, maxFile, fileTypes, label, guide, isMust }) => {
  const { t, i18n } = useTranslation();
  const { handleAddFile, handleRemoveFile } = useFileUpload({ fileList, setFileList, delFileList, setDelFileList, maxFile, fileTypes, maxSize });

  const defaultLabel = label || <label>{t('version2_4.text38')}</label>;
  const defaultGuide = guide || (
    <em className="guide">
      [{t('version2_4.text39')}] <i>pdf, jpg, png</i> (500MB {t('version2_2.text37')})
    </em>
  );

  return (
    <>
      <div className="fileSet">
        <DragDropImage className={'fileFind'} fileTypes={fileTypes} onHandleDrop={(file) => handleAddFile(file)} maxSize={maxSize}>
          {defaultLabel}
        </DragDropImage>
        {defaultGuide}

        <ul>
          {fileList?.map((el, idx) => {
            return <FileItem key={`file-key-${idx}`} isMust={isMust} element={el} idx={idx} onRemoveFile={handleRemoveFile} />;
          })}
        </ul>
      </div>
    </>
  );
};

FileUpload.defaultProps = {
  isMust: false,
  maxFile: 10,
  maxSize: 500,
  fileTypes: ['pdf', 'jpg', 'png'],
  // label: <label>drag&drop 파일 첨부하기</label>,
  // guide: (
  //   <em className="guide">
  //     [파일형식] <i>pdf, jpg, png</i> (500MB 이하)
  //   </em>
  // ),
};

export default FileUpload;

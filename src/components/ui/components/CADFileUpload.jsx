import React from 'react';
import PropTypes from 'prop-types';
import { DragDropImage } from '@components/common';
import useCADFileUpload from '@components/hooks/useCADFileUpload';
import { getByteSize } from '@utils/common';

const CADFileUpload = ({ fileList = [], setFileList, maxSize, maxFile, fileTypes, label }) => {
  const { handleAddFile, handleRemoveFile } = useCADFileUpload({ fileList, setFileList, maxFile });

  if (fileList.length > 0) {
    return (
      <span className="fileLoad">
        <span>
          {fileList[0]?.fileName}
          <em>{getByteSize(fileList[0]?.fileSize)}</em>
        </span>
        {/* <button className="bFD">Download</button> */}
        <button className="bID" onClick={() => handleRemoveFile(0)}></button>
      </span>
    );
  }

  return (
    <DragDropImage className={'fileFind'} fileTypes={fileTypes} onHandleDrop={(file) => handleAddFile(file)} maxSize={maxSize}>
      {label}
    </DragDropImage>
  );
};

CADFileUpload.defaultProps = {
  isMust: false,
  maxFile: 1,
  label: <label>drag&drop 파일 첨부하기</label>,
  guide: (
    <em className="guide">
      [파일형식] <i>pdf, jpg, png</i> (500MB 이하)
    </em>
  ),
};

export default CADFileUpload;

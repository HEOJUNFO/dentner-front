import React, { forwardRef } from 'react';
import { DragDropImage } from '@components/common';
// import { getImageUrl } from '@utils/Image';
import useImageUpload from '../hooks/useImageUpload';
import ImageItem from './ImageItem';

const ImageSetting = ({ fileList, setFileList, maxSize }) => {
  const { handleAddFile, handleRemoveFile } = useImageUpload({ fileList, setFileList });
  return (
    <>
      <div className="fileSet">
        <DragDropImage className={'fileFind'} onHandleDrop={(file) => handleAddFile(file)} maxSize={maxSize}>
          <label>drag&drop 파일 첨부하기</label>
        </DragDropImage>
        <em className="guide">
          [파일형식] <i>pdf, jpg, png</i> (500MB 이하)
        </em>
        <ul>
          <li>
            <span className="fileLoad">
              <span>
                면허증.pdf
                <em>328.36 mb</em>
              </span>
              <button className="bID">Del</button>
            </span>
          </li>
        </ul>
        <ul
          items={fileList?.map((el, i) => {
            return <ImageItem element={el} idx={i} />;
          })}
        ></ul>
      </div>
    </>
  );
};

export default ImageSetting;

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
          <label className="inq">
            <strong>drag&drop 파일 첨부하기</strong> (zip파일 권장, 500MB 이하)
          </label>
        </DragDropImage>
        <em className="guide">
          <span>
            [필수] <i>스캔 파일 - 1개</i> / [선택] <i>기타 파일 - 9개</i>{' '}
            <span>
              [파일형식] <i>pdf, jpg, png, zip, stl, obj, ply, dcm</i>
            </span>
          </span>
        </em>
        <ul>
          <li>
            <span className="fileLoad">
              <span>
                환자8337_스캔 파일.zip
                <em>328.36 mb</em>
              </span>
              <button className="bID">Del</button>
            </span>
          </li>
          <li>
            <span className="fileLoad notMust">
              <span>
                환자8337_스캔 파일.pdf
                <em>328.36 mb</em>
              </span>
              <button className="bID">Del</button>
            </span>
          </li>
        </ul>
        {/* <ul items={fileList?.map((el, i) => {
            return <ImageItem element={el} idx={i} />;
          })}>
        </ul> */}
      </div>
    </>
  );
};

export default ImageSetting;

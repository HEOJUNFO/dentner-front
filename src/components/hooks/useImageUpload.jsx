import React, { useEffect, useRef, useState } from 'react';
import { dateFormatUse, getTodayAdd } from '@utils/DateUtil';

const useImageUpload = ({ fileList, setFileList }) => {
  const handleAddFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = () => {
      let newFileList = [...fileList, { type: 'local', fileName: file[0].name, fileSize: file[0].size, fileType: file[0].type, source: reader.result }];
      setFileList(newFileList);
    };
  };

  const handleRemoveFile = (idx) => {
    console.log(idx);
    // const newFileList = _.remove(fileList, (n, i) => {
    //   console.log(i, index);
    //   return i !== index; // 짝수 제거
    // });

    setFileList(newFileList);
  };

  return { handleAddFile, handleRemoveFile };
};

export default useImageUpload;

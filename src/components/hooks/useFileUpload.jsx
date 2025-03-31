import React, { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';

const useFileUpload = ({ fileList, setFileList, delFileList, setDelFileList, maxFile, fileTypes, maxSize }) => {
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const handleAddFile = (files) => {

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve({
            type: 'local',
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            source: reader.result,
            file: file,
          });
        };
        reader.onerror = reject;
      });
    };

    const filesArray = Array.from(files);

    // 9.2 추가 - 윈도우 모든파일 선택관련
    const validExtensions = fileTypes;
    const newFilesArray = filesArray.filter(file => validExtensions.includes(file.name.split('.').pop().toLowerCase()));
    const size = fileList.reduce((acc, cur, idx) => {
      return Number(acc) + Number(cur.fileSize || 0);
    }, []);
    const currSize = filesArray.reduce((acc, cur, idx) => {
      return Number(acc) + Number(cur.size || 0);
    }, []);


    const max = (maxSize || 10) * 1024 * 1024;
    if(size + currSize > max) {
      alert('제한 용량이상을 업로드 했습니다.');
      return
    }

    if (newFilesArray.length < filesArray.length) {
      alert('허용된 파일만 업로드 할 수 있습니다. 해당 확장자가 아닌 파일은 제외되었습니다.');
    }

    // Promise.all(filesArray.map((f) => readFile(f)))
    Promise.all(newFilesArray.map((f) => readFile(f)))
      .then((newFiles) => {
        const updatedFiles = [...fileList, ...newFiles];
        if (updatedFiles.length > maxFile) {
          showWarnSnackbar(`최대 업로드 파일 개수는 ${maxFile}개 입니다.`);
          return;
        }
        setFileList((prevFileList) => [...prevFileList, ...newFiles]);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  const handleRemoveFile = (index) => {
    if (setDelFileList) {
      const file = fileList[index];
      console.log(file);
      if (file.type === 'server') setDelFileList([...(delFileList.length > 0 ? delFileList : []), file.fileNo]);
    }
    const files = fileList.filter((el, idx) => idx !== index);
    setFileList(files);
  };

  return { handleAddFile, handleRemoveFile };
};

export default useFileUpload;

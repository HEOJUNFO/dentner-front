import React, { useEffect, useRef, useState } from 'react';

const useCADFileUpload = ({ fileList, setFileList, maxFile }) => {
  const handleAddFile = (files) => {
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          //const fileExtension = file.name.split('.')[1]; // 업로드한 파일의 확장자
          const time = Date.now();
          const maskingName = file.name + '_' + time;
          resolve({
            type: 'local',
            maskingName: maskingName,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            source: reader.result,
            file: file,
            newFile: new File([file], maskingName, { type: file.type }), // File생성자를 이용해서 oldFile의 이름을 바꿔준다
          });
        };
        reader.onerror = reject;
      });
    };

    const filesArray = Array.from(files);
    Promise.all(filesArray.map((f) => readFile(f)))
      .then((newFiles) => {
        console.log('newFiles', newFiles);
        const updatedFiles = [...fileList, ...newFiles];
        if (updatedFiles.length > maxFile) {
          alert('초과');
          return;
        }
        // setFileList((prevFileList) => [...prevFileList, ...newFiles]);
        setFileList(updatedFiles);
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  const handleRemoveFile = (index) => {
    const files = fileList.filter((el, idx) => idx !== index);
    setFileList(files);
  };

  return { handleAddFile, handleRemoveFile };
};

export default useCADFileUpload;

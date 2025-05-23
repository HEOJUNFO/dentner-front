import React, { useState, useRef } from 'react';
import FileUploadSVG from '../../../svg/FileUploadSVG';
import { useTranslation } from 'react-i18next';
import useFileUpload from '@components/hooks/useFileUpload';

const FileUpload2 = ({ 
  maxSize = 500, 
  fileTypes = ['pdf', 'jpg', 'png', 'zip', 'stl', 'obj', 'ply', 'dcm', 'txt'], 
  maxFile = 10,
  fileList = [],
  setFileList = () => {},
  delFileList = [],
  setDelFileList = () => {},
  isMust = false
}) => {
  const { t, i18n } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  
  // Use the useFileUpload hook to handle file operations
  const { handleAddFile, handleRemoveFile } = useFileUpload({ 
    fileList, 
    setFileList, 
    delFileList, 
    setDelFileList, 
    maxFile, 
    fileTypes, 
    maxSize 
  });

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFile(e.dataTransfer.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddFile(e.target.files);
    }
  };

  // Styles
  const containerStyle = {
    width: '100%',
  };

  const dropzoneStyle = {
    border: '1px dashed #d1d5db',
    borderRadius: '8px',
    padding: '36px 24px',
    transition: 'all 0.3s ease',
    backgroundColor: isDragging ? '#f3f4f6' : 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const flexColCenterStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const textStyle = {
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#4285F4', // Blue color
  };

  const infoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  };

  const infoIconStyle = {
    marginRight: '8px',
    color: '#8B8B8B',
    fontSize: '16px',
  };

  const infoTextStyle = {
    fontSize: '14px',
    color: '#8B8B8B',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#4B72FE',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '20px',
    minWidth: '140px'
  };

  const fileListStyle = {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const fileItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: 'white',
    width: 'calc(50% - 8px)',
    boxSizing: 'border-box',
  };
  
  const fileIconStyle = {
    color: '#4285F4',
    marginRight: '12px',
  };
  
  const fileInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    width: 'calc(100% - 36px)',
  };
  
  const fileNameStyle = {
    fontSize: '14px',
    marginBottom: '2px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: '500',
  };
  
  const fileSizeStyle = {
    fontSize: '12px',
    color: '#6B7280',
  };

  const removeButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid #e5e7eb',
    background: 'white',
    cursor: 'pointer',
    color: '#9CA3AF',
    padding: 0,
    minWidth: '24px',
  };

  return (
    <div style={containerStyle}>
      <div
        style={dropzoneStyle}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div style={flexColCenterStyle}>
          <div style={{ marginBottom: '15px' }}>
            <FileUploadSVG />
          </div>
          
          {/* Text content with translation */}
          <p style={textStyle}>
            {isEnglish ? 
              `Drag & Drop to attach files (STL file recommended, under ${maxSize}MB)` :
              `Drag&Drop 파일 첨부하기 (stl 파일 권장, ${maxSize}MB 이하)`
            }
          </p>
          
          {/* Info with icon */}
          <div style={infoContainerStyle}>
            <span style={infoIconStyle}>ⓘ</span>
            <p style={infoTextStyle}>
              {isEnglish ? 
                `[Required] Scan file - 1 / [Optional] Other files - 9 [File formats] ${fileTypes.join(', ')}` :
                `[필수] 스캔 파일 - 1개 / [선택] 기타 파일 - 9개 [파일형식] ${fileTypes.join(', ')}`
              }
            </p>
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
            multiple
            accept={fileTypes.map(type => `.${type}`).join(',')}
          />
          
          <button style={buttonStyle} onClick={handleButtonClick}>
            {isEnglish ? "Attach Files" : "파일 첨부하기"}
          </button>
        </div>
      </div>
      
      {/* File list - Now outside the dropzone */}
      {fileList.length > 0 && (
        <div style={fileListStyle}>
          {fileList.map((file, index) => (
            <div key={index} style={fileItemStyle}>
              <div style={fileInfoStyle}>
                <div style={fileIconStyle}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="#F2F7FF"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.75 10.75H15.081C15.499 10.75 15.8893 10.9589 16.1211 11.3066L16.6289 12.0684C16.8607 12.4161 17.251 12.625 17.669 12.625H23.25C23.9404 12.625 24.5 13.1846 24.5 13.875V22C24.5 22.6904 23.9404 23.25 23.25 23.25H10.75C10.0596 23.25 9.5 22.6904 9.5 22V12C9.5 11.3096 10.0596 10.75 10.75 10.75Z" stroke="#4B72FE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.875 15.75L16.375 18.875L15.125 17.375" stroke="#4B72FE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                </div>
                <div>
                  <div style={fileNameStyle}>{file.fileName || file.name}</div>
                  <div style={fileSizeStyle}>
                    {((file.fileSize || file.size) / (1024 * 1024)).toFixed(2)} mb
                  </div>
                </div>
              </div>
              <button 
                style={removeButtonStyle} 
                onClick={() => handleRemoveFile(index)}
                aria-label={isEnglish ? "Remove file" : "파일 제거"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 8H5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload2;
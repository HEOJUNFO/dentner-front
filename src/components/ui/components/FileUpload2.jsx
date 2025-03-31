import React, { useState, useRef } from 'react';
import FileUploadSVG from '../../../svg/FileUploadSVG';
import { useTranslation } from 'react-i18next';

const FileUpload = ({ 
  maxSize = 500, 
  fileTypes = ['pdf', 'jpg', 'png', 'zip', 'stl', 'obj', 'ply', 'dcm', 'txt'], 
  maxFile = 10,
  onFileUpload = (files) => console.log("Files uploaded:", files)
}) => {
  const { t, i18n } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  
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

  const validateFiles = (files) => {
    const newErrors = [];
    const validFiles = [];
    
    // Check if adding these files would exceed the max number of files
    if (selectedFiles.length + files.length > maxFile) {
      newErrors.push(isEnglish 
        ? `You can only upload a maximum of ${maxFile} files.` 
        : `최대 ${maxFile}개의 파일만 업로드할 수 있습니다.`);
      return { validFiles, errors: newErrors };
    }
    
    Array.from(files).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(isEnglish 
          ? `File "${file.name}" exceeds the maximum size of ${maxSize}MB.` 
          : `파일 "${file.name}"이(가) 최대 크기 ${maxSize}MB를 초과합니다.`);
        return;
      }
      
      // Check file type
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!fileTypes.includes(fileExtension)) {
        newErrors.push(isEnglish 
          ? `File type "${fileExtension}" is not supported. Supported types: ${fileTypes.join(', ')}.` 
          : `파일 형식 "${fileExtension}"은(는) 지원되지 않습니다. 지원되는 형식: ${fileTypes.join(', ')}.`);
        return;
      }
      
      validFiles.push(file);
    });
    
    return { validFiles, errors: newErrors };
  };

  const handleFiles = (files) => {
    const { validFiles, errors } = validateFiles(files);
    
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
    
    // Add the valid files to the selected files
    const newSelectedFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newSelectedFiles);
    onFileUpload(newSelectedFiles);
    setErrors([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFileUpload(newFiles);
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
    marginBottom: '16px',
    color: '#4285F4', // Blue color
  };

  const infoContainerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
  };

  const alertCircleStyle = {
    marginTop: '4px',
    marginRight: '8px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    color: '#4B5563',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  };

  const infoTextStyle = {
    fontSize: '14px',
    color: '#6b7280',
  };

  const buttonStyle = {
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    marginTop: '16px',
    width: '140px'
  };

  const errorStyle = {
    color: '#DC2626',
    fontSize: '14px',
    marginTop: '10px',
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
          <div style={{ marginBottom: '20px' }}>
            <FileUploadSVG/>
          </div>
          
          {/* Text content with translation */}
          <p style={textStyle}>
            {isEnglish ? 
              `Drag & Drop to attach files (ZIP file recommended, under ${maxSize}MB)` :
              `Drag&Drop 파일 첨부하기 (zip파일 권장, ${maxSize}MB 이하)`
            }
          </p>
          
          {/* Alert circle with info */}
          <div style={infoContainerStyle}>
            <div style={alertCircleStyle}>
              !
            </div>
            <p style={infoTextStyle}>
              {isEnglish ? 
                `[Required] Scan file - 1 item / [Optional] Other files - 9 items [File formats] ${fileTypes.join(', ')}` :
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
          
          {/* Error messages */}
          {errors.length > 0 && (
            <div style={errorStyle}>
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* File list - Now outside the dropzone */}
      {selectedFiles.length > 0 && (
        <div style={fileListStyle}>
          {selectedFiles.map((file, index) => (
            <div key={index} style={fileItemStyle}>
              <div style={fileInfoStyle}>
                <div style={fileIconStyle}>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="17" cy="17" r="17" fill="#F2F7FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 10.75H15.081C15.499 10.75 15.8893 10.9589 16.1211 11.3066L16.6289 12.0684C16.8607 12.4161 17.251 12.625 17.669 12.625H23.25C23.9404 12.625 24.5 13.1846 24.5 13.875V22C24.5 22.6904 23.9404 23.25 23.25 23.25H10.75C10.0596 23.25 9.5 22.6904 9.5 22V12C9.5 11.3096 10.0596 10.75 10.75 10.75Z" stroke="#4B72FE" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.875 15.75L16.375 18.875L15.125 17.375" stroke="#4B72FE" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </div>
                <div>
                  <div style={fileNameStyle}>{file.name}</div>
                  <div style={fileSizeStyle}>{(file.size / (1024 * 1024)).toFixed(2)} mb</div>
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

export default FileUpload;
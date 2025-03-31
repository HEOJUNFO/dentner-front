import React from 'react';
import PropTypes from 'prop-types';
import { useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';
import CustomFileUploader from './CustomFileUploader'

const DragDropImage = ({ onHandleDrop, className, children, maxSize, fileTypes }) => {
  const { t } = useTranslation();
  const { showWarnSnackbar } = useSnack();
  
  const handleTypeError = () => {
    console.log('type error');
    showWarnSnackbar(t('version2_3.text125'));
  };
  
  const handleSizeError = () => {
    console.log('size error');
    showWarnSnackbar(t('version2_3.text126'));
  };
  
  return (
    <CustomFileUploader
      name="file"
      types={fileTypes}
      multiple={true}
      classes={className}
      maxSize={maxSize}
      onDrop={onHandleDrop}
      onSelect={onHandleDrop}
      onTypeError={handleTypeError}
      onSizeError={handleSizeError}
    >
      {children}
    </CustomFileUploader>
  );
};

DragDropImage.displayName = 'DragDropImage';

DragDropImage.propTypes = {
  onHandleDrop: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  maxSize: PropTypes.number,
  fileTypes: PropTypes.array,
};

DragDropImage.defaultProps = {
  maxSize: 10,
  fileTypes: ['JPG', 'PNG', 'GIF', 'JPEG'],
};

export default DragDropImage;
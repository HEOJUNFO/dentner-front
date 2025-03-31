import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FileUploader } from 'react-drag-drop-files';
import { useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const DragDropImage = ({ onHandleDrop, className, children, maxSize, fileTypes }) => {
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  return (
    <FileUploader
      name="file"
      types={fileTypes}
      multiple={true}
      classes={className}
      maxSize={maxSize}
      onDrop={onHandleDrop}
      onSelect={onHandleDrop}
      onTypeError={() => {
        console.log('type error');
        showWarnSnackbar(t('version2_3.text125'));
      }}
      onSizeError={() => {
        console.log('size error');
        showWarnSnackbar(t('version2_3.text126'));
      }}
    >
      {children}
    </FileUploader>
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

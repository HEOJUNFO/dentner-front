import React from 'react';
import { getByteSize } from '@utils/common';

const FileItem = ({ element, idx, onRemoveFile, isMust }) => {
  return (
    <li>
      <span className={`fileLoad ${isMust ? (idx === 0 ? '' : 'notMust') : ''}`}>
        <span>
          {element.fileName}
          <em>{getByteSize(element?.fileSize)}</em>
        </span>
        <button className="bID" onClick={() => onRemoveFile(idx)}>
          Del
        </button>
      </span>
    </li>
  );
};

export default FileItem;

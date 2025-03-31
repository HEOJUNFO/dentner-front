import React, { forwardRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { StyleSheetManager } from 'styled-components';

/**
 * 문제가 있는 prop을 필터링하는 함수
 * styled-components에서 사용
 */
const filterProps = (prop) => {
  // 문제가 되는 'overRide' prop을 필터링
  return prop !== 'overRide';
};

/**
 * FileUploader 라이브러리를 래핑하여 prop 문제를 해결하는 컴포넌트
 */
const CustomFileUploader = forwardRef((props, ref) => {
  // StyleSheetManager를 사용하여 styled-components의 prop 전달을 제어
  return (
    <StyleSheetManager shouldForwardProp={filterProps}>
      <FileUploader ref={ref} {...props} />
    </StyleSheetManager>
  );
});

CustomFileUploader.displayName = 'CustomFileUploader';

export default CustomFileUploader;
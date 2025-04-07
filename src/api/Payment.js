import axios from '@api/config/axios';

/**
 * 요청서 거래 상태값 변경
 * @param {*} param0
 * @returns
 */
export const putDeal = async ({ requestFormNo, state }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/deal/${requestFormNo}/${state}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 요청서 상태값 변경
 * @param {*} param0
 * @returns
 */
export const putState = async ({ requestFormNo, state }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/state/${requestFormNo}/${state}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 요청서 상태 조회
 * @param {*} requestFormNo
 * @returns
 */
export const getTransactionStatus = async (requestFormNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/status/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 거래목록 조회
 * 예외처리) requestFormNo 조회시 단건 조회 가능
 * @param {*} params
 * @returns
 */
export const getTransactions = async ({ requestFormSe, params }) => {
  try {
    const response = await axios.get(`/api/v1/transaction${requestFormSe ? `/${requestFormSe}` : ''}`, {
      params,
    });
    
    // 상태 코드 매핑 정의
    const statusNameMapping = {
      'cancel': {
        KOR: '취소됨',
        ENG: 'Canceled'
      },
      '요청거절': {
        KOR: '요청거절',
        ENG: 'Request Rejected'
      },
      'quote_ing': {
        KOR: '견적 진행 중',
        ENG: 'Quote in Progress'
      },
      'select_dental_designer': {
        KOR: '치자이너 선택중',
        ENG: 'Selecting Dental Designer'
      },
      'cancel_wait': {
        KOR: '취소 대기',
        ENG: 'Awaiting Cancellation'
      },
      'trade': {
        KOR: '거래 중',
        ENG: 'Trading'
      },
      'complete': {
        KOR: '완료',
        ENG: 'Completed'
      },
      '요청거절(치자이너)': {
        KOR: '요청거절(치자이너)',
        ENG: 'Request Rejected (Dental Designer)'
      },
      '치자이너 수락대기': {
        KOR: '치자이너 수락대기',
        ENG: 'Awaiting Dental Designer Acceptance'
      }
    };

    // 응답 데이터의 정확한 구조에 맞게 접근
    if (response.data && response.data.data && response.data.data.list && Array.isArray(response.data.data.list)) {
      response.data.data.list = response.data.data.list.map(item => {
        const statusName = item.requestStatusName || '';
        const mapping = statusNameMapping[statusName] || {
          KOR: statusName, // 매핑이 없는 경우 원래 값 사용
          ENG: statusName
        };

        return {
          ...item,
          requestStatusNameKOR: mapping.KOR,
          requestStatusNameENG: mapping.ENG
        };
      });
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 치자이너 견적 선택
 * @param {*} param0
 * @returns
 */
export const postTransaction = async ({ requestFormNo, memberNo }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/estimate/choice/${requestFormNo}/${memberNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적보낸 치자이너 목록 조회
 * state (A:선택, B:비선택)
 * @param {*} param0
 * @returns
 */
export const getEstimateds = async ({ pathValue, state, params }) => {
  try {
    const response = await axios.get(`/api/v1/transaction/estimate/${pathValue}/${state}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 조회
 * @param {*} param0
 * @returns
 */
export const getEstimated = async (requestEstimateNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/estimate/detail/${requestEstimateNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 결제정보 조회
 * @param {*} pathValue
 * @returns
 */
export const getPayment = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/transaction/payment/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 계약요청서 조회
 * @param {*} pathValue
 * @returns
 */
export const getContract = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/transaction/contract/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 결제
 * @param {*} param0
 * @returns
 */
export const postPayment = async ({ requestFormNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/pay/${requestFormNo}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 치자이너 계약 결정
 * @param {*} param0
 * @returns
 */
export const putContract = async ({ requestFormNo, body }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/contract/${requestFormNo}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 수령
 * @param {*} param0
 * @returns
 */
export const putDocReceive = async (requestFormNo, requestType) => {
  try {
    const response = await axios.put(`/api/v1/transaction/doc/receive/${requestFormNo}/${requestType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 목록 조회
 * @param {*} pathValue
 * @returns
 */
export const getContractDoc = async (requestFormNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/doc/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 건너뛰기, 3D 뷰어 소통
 * @param {*} param0
 * @returns
 */
export const putViewer3d = async ({ requestFormNo, state, requestType }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/viewer3d/${requestFormNo}/${state}/${requestType}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * CAD파일 업로드
 * @param {*} param0
 * @returns
 */
export const postCad = async ({ requestFormNo, formData, fileProgress }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/cad/${requestFormNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 100000,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.bytes) {
          if (fileProgress) {
            fileProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        }
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 추가금 요청 정보 조회
 * @param {*} requestFormNo
 * @returns
 */
export const getAddPay = async ({ requestFormNo, memberSe }) => {
  try {
    const response = await axios.get(`/api/v1/transaction/add-pay/${requestFormNo}/${memberSe}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 추가금 요청 결제
 * @param {*} param0
 * @returns
 */
export const postAddPay = async ({ requestFormNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/add-pay/${requestFormNo}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 추가금 요청 수정
 * @param {*} param0
 * @returns
 */
export const putAddPay = async ({ requestFormPayNo, formData }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/pay/${requestFormPayNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 추가금 철회
 * @param {*} requestFormNo
 * @returns
 */
export const deleteAddPay = async (requestFormNo) => {
  try {
    const response = await axios.delete(`/api/v1/transaction/add-pay/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 재제작 철회
 * @param {*} requestFormNo
 * @returns
 */
export const deleteRemaking = async (requestFormNo) => {
  try {
    const response = await axios.delete(`/api/v1/transaction/remaking/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 재제작 요청
 * @param {*} param0
 * @returns
 */
export const postRemaking = async ({ requestFormNo, formData, fileProgress }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/remaking/${requestFormNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 100000,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.bytes) {
          if (fileProgress) {
            fileProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        }
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 재제작 요청 정보 조회
 * @param {*} requestFormNo
 * @returns
 */
export const getRemaking = async (requestFormNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/remaking/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * CAD파일 수령
 * @param {*} requestFormNo
 * @returns
 */
export const getCad = async ({ requestFormNo, memberSe }) => {
  try {
    const response = await axios.get(`/api/v1/transaction/cad/${requestFormNo}/${memberSe}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 치자이너 거래 현황
 * @returns
 */
export const getTransactionStat = async () => {
  try {
    const response = await axios.get(`/api/v1/transaction/stat`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 리뷰작성
 * @param {*} param0
 * @returns
 */
export const postReview = async ({ designerId, requestFormNo, formData }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/review/${designerId}/${requestFormNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 거래취소
 * @param {*} requestFormNo
 * @returns
 */
export const deleteTransactionCancel = async ({ requestFormNo, body }) => {
  try {
    // const response = await axios.delete(`/api/v1/transaction/cancel/${requestCancelNo}`, body);
    const response = await axios.put(`/api/v1/transaction/cancel/${requestFormNo}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 거래취소 승인
 * @param {*} requestFormNo
 * @returns
 */
export const putTransactionCancelConfirm = async ({ requestFormNo }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/cancel/confirm/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 거래취소 승인 거절
 * @param {*} param0
 * @returns
 */
export const putTransactionCancelReject = async ({ requestFormNo }) => {
  try {
    const response = await axios.put(`/api/v1/transaction/cancel/reject/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 거래내역 삭제
 * @param {*} param0
 * @returns
 */
export const deleteTransactionHistory = async (requestFormNo) => {
  try {
    const response = await axios.delete(`/api/v1/transaction/history/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 공전소 데이터 전송 여부
 * @param {*} requestFormNo
 * @returns
 */
export const getTransactionTransferStat = async (requestFormNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/data-transfer/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 공전소 데이터 전송
 * @param {*} requestFormNo
 * @returns
 */
export const postTransactionTransfer = async (requestFormNo) => {
  try {
    const response = await axios.post(`/api/v1/transaction/approval/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * stl 파일 업로드
 * @param {*} param0
 * @returns
 */
export const post3d = async ({ requestFormNo, formData, fileProgress }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/3d/${requestFormNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 100000,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.bytes) {
          if (fileProgress) {
            fileProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        }
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 3d 뷰어 소통
 * @param {*} requestFormNo
 * @returns
 */
export const get3d = async (requestFormNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/3d/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 3d 뷰어 목록 삭제
 * @param {*} requestFormNo
 * @returns
 */
export const delete3d = async (threeInfoNoArr) => {
  try {
    const response = await axios.delete(`/api/v1/transaction/3d/${threeInfoNoArr}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 3d 메모 목록
 * @param {*} threeInfoNo
 * @returns
 */
export const get3dMemo = async (threeFileNo) => {
  try {
    const response = await axios.get(`/api/v1/transaction/3d/memo/${threeFileNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 3d 메모 저장
 * @param {*} threeInfoNo
 * @returns
 */
export const post3dMemo = async ({ threeFileNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/3d/memo/${threeFileNo}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 3d 뷰어 알림톡 전송
 * @param {*} param0
 * @returns
 */
export const post3dAlarmTalk = async ({ requestFormNo, memberSe }) => {
  try {
    const response = await axios.post(`/api/v1/transaction/3d/alarm-talk/${requestFormNo}/${memberSe}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

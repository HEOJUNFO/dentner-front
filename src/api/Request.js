import axios from '@api/config/axios';

export const getRequestCode = async () => {
  try {
    const response = await axios.get('/api/v1/request');
    console.log('response.data', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 간편모드 저장
 * @param {*} formData
 * @returns
 */
export const postRequestSimple = async (formData, fileProgress) => {
  try {
    const response = await axios.post('/api/v1/request/simple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 500000,
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
 * 의뢰서 간편모드 수정
 * @param {*} param0
 * @returns
 */
export const putRequestSimple = async ({ requestDocGroupNo, formData, fileProgress }) => {
  try {
    const response = await axios.put(`/api/v1/request/simple/${requestDocGroupNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 500000,
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
 * 의뢰서 상세모드 저장
 * @param {*} formData
 * @returns
 */
export const postRequestDetail = async (formData, fileProgress) => {
  try {
    const response = await axios.post('/api/v1/request/detail', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 500000,
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
 * 의뢰서 상세모드 수정
 * @param {*} param0
 * @returns
 */
export const putRequestDetail = async ({ requestDocGroupNo, formData }) => {
  try {
    const response = await axios.put(`/api/v1/request/detail/${requestDocGroupNo}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 500000,
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
 * 의뢰서 정보 조회
 * @param {*} requestDocGroupNo
 * @returns
 */
export const getRequestMyInfo = async (requestDocGroupNo) => {
  const response = await axios.get(`/api/v1/transaction/doc/detail/${requestDocGroupNo}`);
  return response.data;
};

/**
 * 의뢰서 수정 정보 조회
 * @param {*} requestDocGroupNo
 * @returns
 */
export const getRequestJson = async (requestDocGroupNo) => {
  const response = await axios.get(`/api/v1/request/json/${requestDocGroupNo}`);
  return response.data;
};

/**
 * 의뢰서 뷰 (신규추가)
 * @param requestDocGroupNo
 * @returns {Promise<*>}
 */
export const getRequestJsonView = async (requestDocGroupNo, requestFormNo) => {
  const response = await axios.get(`/api/v1/request/json/view/${requestDocGroupNo}/${requestFormNo}`);
  return response.data;
};

/**
 * 자주쓰는 말 저장
 * @param {*} param0
 * @returns
 */
export const postRequestOften = async ({ oftenCn }) => {
  try {
    const response = await axios.post('/api/v1/request/often', {
      oftenCn,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 자주쓰는 말 조회
 * @returns
 */
export const getRequestOften = async () => {
  try {
    const response = await axios.get('/api/v1/request/often');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 자주쓰는 말 삭제
 * @returns
 */
export const deleteRequestOften = async (pathValue) => {
  try {
    const response = await axios.delete(`/api/v1/request/often/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 자주쓰는 수치값 제목 조회
 * @returns
 */
export const getRequestValueTitle = async () => {
  const response = await axios.get(`/api/v1/request/value`);
  return response.data;
};

/**
 * 자주쓰는 수치값 제목 삭제
 * @param {*} valueNo
 * @returns
 */
export const deleteRequestValueTitle = async (valueNo) => {
  const response = await axios.delete(`/api/v1/request/value/${valueNo}`);
  return response.data;
};

/**
 * 요청서 목록 조회
 * @returns
 */
export const getRequestForms = async ({ pathValue, params }) => {
  try {
    const response = await axios.get(`/api/v1/request/form/${pathValue}`, {
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 임시저장 의뢰서 목록 조회
 * @param {*} state A 간편, B 상세
 * @returns
 */
export const getRequestTemp = async (state) => {
  try {
    const response = await axios.get(`/api/v1/request/temp/${state}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 요청서 상세 조회
 * @param {*} pathValue
 * @returns
 */
export const getRequestForm = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/form/detail/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 목록
 * @param {*} pathValue
 * @returns
 */
export const getRequestDoc = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/doc/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰서 삭제
 * @param {*} requestDocNo
 * @returns
 */
export const deleteRequestDoc = async (requestDocGroupNo) => {
  try {
    const response = await axios.delete(`/api/v1/request/doc/${requestDocGroupNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 보철종류 보기
 * @param {*} pathValue
 * @returns
 */
export const getRequestProsthetics = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/form/prosthetics/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 지정치자이너 목록
 * @returns
 */
export const getRequestTargetDesigner = async () => {
  try {
    const response = await axios.get(`/api/v1/request/target-designer`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 치자이너 총 결제 금액
 * @param {*} params
 * @returns
 */
export const getRequestTargetPrice = async (params) => {
  try {
    const response = await axios.get(`/api/v1/request/form/target`, {
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 공개요청서 저장
 * @param {*} body
 * @returns
 */
export const postRequestPublicForm = async (body) => {
  try {
    const response = await axios.post('/api/v1/request/public-form', {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 요청서 수정
 * @param {*} body
 * @returns
 */
export const putRequestPublicForm = async (body) => {
  try {
    const response = await axios.put('/api/v1/request/form', {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 요청서 삭제
 * @param {*} pathValue
 * @returns
 */
export const deleteRequestForm = async (requestFormNo) => {
  try {
    const response = await axios.delete(`/api/v1/request/form/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 지정요청서 저장
 * @param {*} body
 * @returns
 */
export const postRequestTargetForm = async (body) => {
  try {
    const response = await axios.post('/api/v1/request/target-form', {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 지정요청서 수락하기
 * @param {*} body
 * @returns
 */
export const postRequestTargetFormAgree = async (requestFormNo) => {
  try {
    const response = await axios.post(`/api/v1/request/target-form/agree/${requestFormNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 지정요청서 거절하기
 * @param {*} param0
 * @returns
 */
export const postRequestTargetFormRefuse = async ({ requestFormNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/request/target-form/refuse/${requestFormNo}`, {
      ...body,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 댓글 등록
 * @param {*} body
 * @returns
 */
export const postRequestFormReply = async (body) => {
  try {
    const response = await axios.post('/api/v1/request/form/reply', body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 댓글 수정
 * @param {*} body
 * @returns
 */
export const putRequestFormReply = async ({ requestFormAnswerNo, body }) => {
  try {
    const response = await axios.put(`/api/v1/request/form/reply/${requestFormAnswerNo}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 댓글 삭제
 * @param {*} param0
 * @returns
 */
export const deleteRequestFormReply = async ({ requestFormAnswerNo }) => {
  try {
    const response = await axios.delete(`/api/v1/request/form/reply/${requestFormAnswerNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 댓글 신고
 * @param {*} param0
 * @returns
 */
export const postRequestFormReplyReport = async ({ requestFormAnswerNo, targetNo }) => {
  try {
    const response = await axios.post(`/api/v1/request/form/reply/report/${requestFormAnswerNo}/${targetNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 댓글 목록
 * @param {*} pathValue
 * @returns
 */
export const getRequestFormReply = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/form/reply-list/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 작성 전 정보 조회
 * @param {*} pathValue
 * @returns
 */
export const getRequestBeforeEstimated = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/estimate/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 작성
 * @param {*} param0
 * @returns
 */
export const postRequestBeforeEstimated = async ({ pathValue, body }) => {
  try {
    const response = await axios.post(`/api/v1/request/estimate/${pathValue}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 작성여부 조회
 * @param {*} pathValue 요청서번호
 * @returns
 */
export const getEstimatedStatus = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/estimate/status/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 상세 조회 (의뢰인)
 * @param {*} pathValue
 * @returns
 */
export const getRequestEstimated = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/transaction/estimate/detail/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 견적서 상세 조회 (치자이너)
 * @param {*} pathValue
 * @returns
 */
export const getRequestDesignerEstimated = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/transaction/estimate/detail/designer/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 프로필 상세
 * @param {*} pathValue
 * @returns
 */
export const getRequestProfile = async (pathValue) => {
  try {
    const response = await axios.get(`/api/v1/request/profile/${pathValue}`); //memberSe
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 의뢰인 차단
 * @param {*} pathValue
 * @returns
 */
export const postRequestBlock = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/dental/request/block/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 의뢰인 차단 해제
 * @param {*} pathValue
 * @returns
 */
export const deleteRequestBlock = async (memberNo) => {
  try {
    const response = await axios.delete(`/api/v1/dental/request/block/${memberNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

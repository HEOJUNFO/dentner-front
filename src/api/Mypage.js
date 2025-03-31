import axios from '@api/config/axios';

/**
 * 관심 치기공소, 치자이너 목록 조회
 * pathValue: A 치기공소,B 치자이너
 * @param {*} param0
 * @returns
 */
export const getMypageInterest = async ({ pathValue, params }) => {
  const response = await axios.get(`/api/v1/mypage/interest/${pathValue}`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 차단 치기공소, 치자이너 목록 조회
 * pathValue: A 치기공소,B 치자이너
 * @param {*} param0
 * @returns
 */
export const getMypageBlock = async ({ pathValue, params }) => {
  const response = await axios.get(`/api/v1/mypage/block/${pathValue}`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 내정보 조회
 * @returns
 */
export const getMyinfo = async () => {
  const response = await axios.get(`/api/v1/mypage/profile`);
  return response.data;
};

/**
 * 내정보 수정
 * @param {*} formData
 * @returns
 */
export const putMyinfo = async (formData, fileProgress) => {
  try {
    const response = await axios.put('/api/v1/mypage/profile', formData, {
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
 * 비밀번호 수정
 * @param {*} formData
 * @returns
 */
export const putPassword = async (body) => {
  // console.log(body);
  try {
    const response = await axios.put('/api/v1/mypage/password', body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 휴대전화번호 수정
 * @param {*} formData
 * @returns
 */
export const putPhoneNumber = async (body) => {
  // console.log(body);
  try {
    const response = await axios.put('/api/v1/mypage/phone', body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 보철수가표 수정
 * @param {*} body
 * @returns
 */
export const putMyteethType = async (body) => {
  try {
    const response = await axios.put('/api/v1/mypage/type', body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMyteethType = async () => {
  const response = await axios.get(`/api/v1/mypage/type-list`);
  return response.data;
};

/**
 * 리뷰 목록 조회
 * @param {*} param0
 * @returns
 */
export const getMyReview = async (params) => {
  const response = await axios.get(`/api/v1/mypage/review`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 리뷰 상세 조회
 * @param {*} param0
 * @returns
 */
export const getReview = async (reviewNo) => {
  const response = await axios.get(`/api/v1/mypage/review/${reviewNo}`);
  return response.data;
};

/**
 * 리뷰삭제
 * @param {*} reviewNo
 * @returns
 */
export const deleteMyReview = async (reviewNo) => {
  try {
    const response = await axios.delete(`/api/v1/mypage/review/${reviewNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 리뷰 수정
 * @param {*} param0
 * @returns
 */
export const putMyReview = async ({ reviewNo, formData }) => {
  try {
    const response = await axios.put(`/api/v1/mypage/review/${reviewNo}`, formData, {
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
 * 리뷰 수정
 * @param {*} param0
 * @returns
 */
export const putMyPageInfo = async ({ reviewNo, formData }) => {
  try {
    const response = await axios.put(`/api/v1/mypage/info`, formData, {
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
 * 내정보 조회
 * @returns
 */
export const getMyPageinfo = async () => {
  const response = await axios.get(`/api/v1/mypage/info`);
  return response.data;
};

/**
 * 설정 알림 목록 조회
 * @returns
 */
export const getAlarm = async (params) => {
  const response = await axios.get(`/api/v1/mypage/alarm`,{params: params});
  return response.data;
};

/**
 * 설정 알림 수정
 * @param {*} param0
 * @returns
 */
export const putAlarm = async ({ alarmCodeNo, state }) => {
  try {
    const response = await axios.put(`/api/v1/mypage/alarm/${alarmCodeNo}/${state}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 알림 개수 조회
 * @param {*} param0
 * @returns
 */
export const getNotiCnt = async () => {
  const response = await axios.get(`/api/v1/common/alarm-cnt`);
  return response.data;
};

/**
 * 알림 목록 조회
 * @param {*} param0
 * @returns
 */
export const getNotiList = async (params) => {
  const response = await axios.get(`/api/v1/common/alarm`, {
    params: { ...params },
  });
  return response.data;
};

/**
 * 알림 전체 읽음
 * @param {*} type
 * @returns
 */
export const putAlarmReadAll = async (type) => {
  try {
    const response = await axios.put(`/api/v1/common/alarm/read-all/${type}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 알림 읽음
 * @param {*} no
 * @returns
 */
export const putAlarmRead = async (no) => {
  try {
    const response = await axios.put(`/api/v1/common/alarm/read/${no}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 회원탈퇴
 * @returns
 */
export const putMemberOut = async () => {
  try {
    const response = await axios.put(`/api/v1/mypage/out`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 프로필 전환
 * @param {*} param0
 * @returns
 */
export const putProfileType = async () => {
  try {
    const response = await axios.put(`/api/v1/mypage/profile/change`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치자이너 프로필 등록 (치기공소)
 * @param {*} param0
 * @returns
 */
export const postDesignerProfile = async () => {
  try {
    const response = await axios.post(`/api/v1/mypage/profile/designer`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 프로필 공개/비공개
 * @param {*} type
 * @returns
 */
export const putProfileShowType = async ({ type, memberSe }) => {
  try {
    const response = await axios.put(`/api/v1/mypage/profile/show/${type}/${memberSe}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


/**
 * 설정 알림 수정 전체
 * @param {*} param0
 * @returns
 */
export const putAlarmAll = async ({ alarmCode, state }) => {
  try {
    const response = await axios.put(`/api/v1/mypage/alarm/all/${alarmCode}/${state}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
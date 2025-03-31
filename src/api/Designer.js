import axios from '@api/config/axios';

export const getDentalDesigners = async (params) => {
  const response = await axios.get(`/api/v1/dental/designer`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

export const getDentalDesigner = async (pathValue) => {
  const response = await axios.get(`/api/v1/dental/designer/${pathValue}`);
  return response.data;
};

/**
 * 치자이너 차단
 * @param {*} pathValue
 * @returns
 */
export const postDesignerBlock = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/dental/designer/block/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치자이너 차단 해제
 * @param {*} pathValue
 * @returns
 */
export const deleteDesignerBlock = async (memberNo) => {
  try {
    const response = await axios.delete(`/api/v1/dental/designer/block/${memberNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postDesignerInterest = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/dental/designer/interest/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteDesignerInterest = async (pathValue) => {
  try {
    const response = await axios.delete(`/api/v1/dental/designer/interest/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치자이너 신고
 * @param {*} memberNo
 * @returns
 */
export const postDesignerReport = async ({ memberNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/dental/designer/report/${memberNo}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 *
 * @param pathValue
 * @returns {Promise<*>}
 */
export const getDentalDesignerReviewList = async (pathValue, params) => {
  const response = await axios.get(`/api/v1/mypage/review-list/${pathValue}`, {params:params});
  return response.data;
}
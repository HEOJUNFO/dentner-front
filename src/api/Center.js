import axios from '@api/config/axios';

/**
 * 치기공소 목록
 * @param {*} params
 * @returns
 */
export const getDentallaboratories = async (params) => {
  const response = await axios.get(`/api/v1/dental/laboratory`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 치기공소 상세
 * @param {*} pathValue
 * @returns
 */
export const getDentalLaboratory = async (pathValue) => {
  const response = await axios.get(`/api/v1/dental/laboratory/${pathValue}`);
  return response.data;
};

/**
 * 관심치기공소 등록
 * @param {*} pathValue
 * @returns
 */
export const postLaboratoryInterest = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/dental/laboratory/interest/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 관심치기공소 삭제
 * @param {*} pathValue
 * @returns
 */
export const deleteLaboratoryInterest = async (pathValue) => {
  try {
    const response = await axios.delete(`/api/v1/dental/laboratory/interest/${pathValue}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치기공소 신고
 * @param {*} memberNo
 * @returns
 */
export const postLaboratoryReport = async ({ memberNo, body }) => {
  try {
    const response = await axios.post(`/api/v1/dental/laboratory/report/${memberNo}`, body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치기공소 차단
 * @param {*} param0
 * @returns
 */
export const postLaboratoryBlock = async (memberNo) => {
  try {
    const response = await axios.post(`/api/v1/dental/laboratory/block/${memberNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 치기공소 차단 해제
 * @param {*} memberNo
 * @returns
 */
export const deleteLaboratoryBlock = async (memberNo) => {
  try {
    const response = await axios.delete(`/api/v1/dental/laboratory/block/${memberNo}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

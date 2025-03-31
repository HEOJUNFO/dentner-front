import axios from '@api/config/axios';

export const getMainBanner = async () => {
  try {
    const response = await axios.get('/api/v1/main/banner');

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getStatCnt = async () => {
  try {
    const response = await axios.get('/api/v1/common/stat-cnt');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMainFaq = async (pathValue) => {
  const response = await axios.get(`/api/v1/main/bbs${!pathValue ? '' : `/${pathValue}`}`);
  return response.data;
};

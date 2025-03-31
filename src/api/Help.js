import axios from '@api/config/axios';

export const getBoard = async ({ pathValue, params }) => {
  const response = await axios.get(`/api/v1/bbs/A${!pathValue ? '' : `/${pathValue}`}`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

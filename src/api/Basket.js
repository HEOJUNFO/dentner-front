import axios from '@api/config/axios';

/**
 * 의뢰서 바구니 목록
 * @param {*} param0
 * @returns
 */
export const getRequestFormBasket = async ({ pathValue, params }) => {
  try {
    const response = await axios.get(`/api/v1/request/basket/${pathValue}`, {
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
 * 의뢰서 삭제
 * @param {*} requestDocGroupNo
 * @returns
 */
export const deleteRequestFormBasket = async (requestDocGroupNo) => {
  try {
    const response = await axios.delete(`/api/v1/request/doc/${requestDocGroupNo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from '@api/config/axios';

/**
 * 마일리지 조회
 * @returns
 */
export const getMileage = async () => {
  const response = await axios.get(`/api/v1/transaction/mileage`);
  return response.data;
};

/**
 * 마일리지 충전 목록
 * @returns
 */
export const getMileageCharges = async (params) => {
  const response = await axios.get(`/api/v1/mileage/charge`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 마일리지 결제 목록
 * @param {*} params
 * @returns
 */
export const getMileagePayments = async (params) => {
  const response = await axios.get(`/api/v1/mileage/payment`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 내 카드 조회
 * @param {*} params
 * @returns
 */
export const getMileageCard = async (params) => {
  const response = await axios.get(`/api/v1/mileage/card`);
  return response.data;
};

/**
 * 마일리지 충전
 * @param {*} body
 * @returns
 */
export const postMileageCharge = async (body) => {
  try {
    const response = await axios.post(`/api/v1/mileage/charge`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 카드 저장
 * @param {*} body
 * @returns
 */
export const postMileageCard = async (body) => {
  try {
    const response = await axios.post(`/api/v1/mileage/card`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 카드 수정
 * @param {*} body
 * @returns
 */
export const putMileageCard = async (body) => {
  try {
    const response = await axios.put(`/api/v1/mileage/card`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 치자이너 보유 마일리지 조회
 * @returns
 */
export const getDesignerMileage = async () => {
  const response = await axios.get(`/api/v1/mileage/designer`);
  return response.data;
};

/**
 * 치자이너 정산 마일리지 조회
 * @returns
 */
export const getSettleMileage = async () => {
  const response = await axios.get(`/api/v1/mileage/designer-calculate`);
  return response.data;
};

/**
 * 치자이너 입금내역
 * @returns
 */
export const getDepositList = async (params) => {
  const response = await axios.get(`/api/v1/mileage/designer/deposit`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 치자이너 입금내역
 * @returns
 */
export const getSettleList = async (params) => {
  const response = await axios.get(`/api/v1/mileage/designer/calculate`, {
    params: {
      ...params,
    },
  });
  return response.data;
};

/**
 * 치자이너 마일리지 정산
 * @param {*} body
 * @returns
 */
/*
    mileageNo 입금정산에서 선택한 경우에만 필요
    calculateSe 정산 구분(A:전체정산,B:입금정산)
*/
export const postDesignerMileage = async (body) => {
  try {
    const response = await axios.post(`/api/v1/mileage/calculate`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 마일리지 환불
 */
export const postMileageRefund = async (body) => {
  try {
    const response = await axios.post(`/api/v1/mileage/refund`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 간편결제 결제 데이터 생성
 * @param {*} body
 * @returns
 */
export const postEPAY = async (amount) => {
  try {
    const response = await axios.post(`/api/v1/mileage/easy/${amount}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 간편결제 결제 완료
 * @param {*} body
 * @returns
 */
export const postEPAYEnd = async (body, unit) => {
  try {
    const response = await axios.post(`/api/v1/mileage/easy-success/${unit}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 페이팔 결제 데이터 생성
 * @param {*} amount
 * @returns
 */
export const postPaypalPAY = async (amount) => {
  try {
    const response = await axios.post(`/api/v1/mileage/paypal/${amount}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 페이팔 결제 완료
 * @param {*} body
 * @returns
 */
export const postPaypalPAYEnd = async (body) => {
  try {
    const response = await axios.post(`/api/v1/mileage/paypal`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

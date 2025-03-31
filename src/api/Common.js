import axios from '@api/config/axios';
import i18n from 'i18next';

export const postAuthPhone = async ({ phone, memberContactNation, certification, email, memberTp }) => {
  try {
    const response = await axios.post('/api/v1/common/auth-phone', {
      phone,
      memberContactNation,
      certification,
      email,
      memberTp,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const postAccCheck = async (body) => {
  try {
    const response = await axios.post('/api/v1/common/account', body);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAuthPhone = async (params) => {
  try {
    const response = await axios.get('/api/v1/common/auth-phone', {
      params: { ...params },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getTeethType = async (type) => {
  try {
    const response = await axios.get('/api/v1/common/teeth-type', {
      params: {
        type: type === 'ko' ? 'A' : 'B',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCommonCode = async (pathValue, type) => {
  // console.log(i18n.language);
  try {
    const response = await axios.get(`/api/v1/common/code/${pathValue}`, {
      params: {
        type: type === 'ko' ? 'A' : 'B',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fileDownload = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/common/download/${pathValue}`, {
      responseType: 'blob',
      timeout: 300000,
    });
    // return response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

export const fileChatDownload = async (chatNo) => {
  try {
    const response = await axios.post(`/api/v1/common/download/chat/${chatNo}`, {
      responseType: 'blob',
      timeout: 30000,
    });
    // return response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

// 파일업로드
export const fileUpload = async (formData, fileProgress) => {
  try {
    const response = await axios.post('/api/v1/common/file/upload', formData, {
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

export const fileZipDownload = async ({ fileType, fileNo }) => {
  try {
    const response = await axios.post(`/api/v1/common/download/zip/${fileType}/${fileNo}`, {
      responseType: 'blob',
      timeout: 30000,
    });
    // return response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

export const fileDownloadEncrypt = async (pathValue) => {
  try {
    const response = await axios.post(`/api/v1/common/download/encrypt/${pathValue}`, {
      responseType: 'blob',
      timeout: 30000,
    });
    // return response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

export const fileZipDownloadEncrypt = async ({ fileType, fileNo }) => {
  try {
    const response = await axios.post(`/api/v1/common/download/zip/encrypt/${fileType}/${fileNo}`, {
      responseType: 'blob',
      timeout: 30000,
    });
    // return response.data;
    return response;
  } catch (error) {
    throw error;
  }
};

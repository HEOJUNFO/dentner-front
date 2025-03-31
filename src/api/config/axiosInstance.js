import axios from 'axios';
import i18n from "@utils/i18n.js";
import UserStore from '@store/UserStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    // sessionStorage 대신 localStorage 사용
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.language = i18n.language === 'ko' ? 'A' : 'B'
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post('/auth/refresh', {}, { 
            withCredentials: true,
            baseURL: import.meta.env.VITE_API_URL 
          })
          .then(({ data }) => {
            console.log('토큰 갱신 성공:', data);

            // sessionStorage 대신 localStorage 사용
            localStorage.setItem('token', data.accessToken);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            console.error('토큰 갱신 실패:', err);
            
            // 토큰 갱신 실패 시 로그아웃
            UserStore.getState().logout();
            // localStorage에서도 토큰 제거
            localStorage.removeItem('token');
            
            // 로그인 페이지로 리다이렉트
            window.location.href = '/login';
            
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

// 토큰 유효성 검증 함수
axiosInstance.validateToken = async () => {
  try {
    await axiosInstance.get('/api/v1/mypage/profile');
    return true;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // 로컬 스토리지에서도 토큰 제거
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }
};

export default axiosInstance;
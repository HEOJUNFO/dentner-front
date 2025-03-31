import axios from 'axios';
import i18n from "@utils/i18n.js";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // local
  // baseURL: 'http://192.168.0.174:4140', // local
  // baseURL: 'http://192.168.219.59:4140', // local
  // baseURL: 'http://203.216.174.89:4140', // ipforu
  // baseURL: 'http://115.144.235.93:4140', // haiip
  // baseURL: 'http://ec2-43-202-36-182.ap-northeast-2.compute.amazonaws.com:4140/', // ec2

  timeout: 10000, // 요청 타임아웃을 설정합니다.
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청을 위해 설정
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
    const token = sessionStorage.getItem('token');
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

    if (error.response.status === 401 && !originalRequest._retry) {
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
          .post('/auth/refresh', {}, { withCredentials: true })
          .then(({ data }) => {
            console.log(data);

            sessionStorage.setItem('token', data.accessToken);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            processQueue(null, data.accessToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
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

export default axiosInstance;

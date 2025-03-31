import axios from '@api/config/axios';

export const postLogin = async ({ memberEmail, memberPassword, fcmToken }) => {
  try {
    const response = await axios.post('/api/v1/login', {
      memberEmail,
      memberPassword,
      fcmToken,
    });
    console.log('response.data', response.data);
    const { data } = response.data;

    const { accessToken, grantType, refreshToken } = data;
    console.log('refreshToken', refreshToken);
    // 액세스 토큰을 로컬 스토리지에 저장
    sessionStorage.setItem('token', accessToken);

    // 리프레시 토큰을 쿠키에 저장
    document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

    // 이후 요청에 사용할 수 있도록 Axios 인스턴스의 헤더에 설정
    axios.defaults.headers.common.Authorization = `${grantType} ${accessToken}`;

    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

/**
 * 이용약관 조회
 * @returns
 */
export const getTerms = async () => {
  const response = await axios.get(`/api/v1/join/terms`);
  return response.data;
};

/**
 * 한국인 회원가입
 * @param {*} formData
 * @returns
 */
export const postJoinLocalMember = async (formData) => {
  try {
    const response = await axios.post('/api/v1/join/local/member', formData, {
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
 * 외국인 회원가입
 * @param {*} formData
 * @returns
 */
export const postJoinCountryMember = async (formData) => {
  try {
    const response = await axios.post('/api/v1/join/country/member', formData, {
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
 * 이메일 조회
 * @param {*} params
 * @returns
 */
export const getEmail = async (params) => {
  try {
    const response = await axios.get('/api/v1/join/email', {
      params: {
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

/**
 * 패스워드 변경
 * @param {*} param0
 * @returns
 */
export const putPassword = async ({ token, password }) => {
  try {
    const response = await axios.put('/api/v1/join/password', {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * 이메일 중복조회
 * @param {*} params
 * @returns
 */
export const getDupEmail = async (params) => {
  try {
    const response = await axios.get('/api/v1/join/dup/email', {
      params: {
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const getDupNickname = async (params) => {
  try {
    const response = await axios.get('/api/v1/join/dup/nickname', {
      params: {
        ...params,
      },
    });

    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

export const postGoogleLogin = async ({ socialSe, uniqueKey, memberEmail, fcmToken }) => {
  try {
    const response = await axios.post('/api/v1/login/social', {
      socialSe,
      uniqueKey,
      memberEmail,
      fcmToken,
    });
    // console.log('response.data', response.data);
    const { data } = response.data;

    if (data) {
      const { accessToken, grantType, refreshToken } = data;
      // console.log('refreshToken', refreshToken);
      // 액세스 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem('token', accessToken);

      // 리프레시 토큰을 쿠키에 저장
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

      // 이후 요청에 사용할 수 있도록 Axios 인스턴스의 헤더에 설정
      axios.defaults.headers.common.Authorization = `${grantType} ${accessToken}`;
    }

    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

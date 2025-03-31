import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import { postLogin, postGoogleLogin } from '@api/Login';
import UserStore from '@store/UserStore';
import { getDesignerMileage } from '@api/Mileage';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { requestPermissionAndGetToken } from '../../../../firebase';

export const useLogin = () => {
  const { t, i18n } = useTranslation();
  const { handleNav } = useNav();
  const { user, login } = UserStore();
  // const { fetchDesignerMileage } = useMileageOfficePage();
  const [fcm, setFcm] = useState();
  const [params, setParams] = useState({
    // memberEmail: 'test',
    // memberPassword: '00',
    memberEmail: '',
    memberPassword: '',
  });
  const [error, setError] = useState('');

  const initFCM = async () => {
    const token = await requestPermissionAndGetToken();
    if (token) {
      console.log('FCM Token:', token);
      setFcm(token);
    }
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 보유 마일리지 조회회
  const fetchDesignerMileage = async () => {
    const r = await getDesignerMileage();
    if (r?.data) {
      return r?.data?.mileageWon;
    } else {
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await postLogin({ ...params, fcmToken: fcm });
      // console.log('r', r);
      if (r.statusCode !== 200) return;
      const dt = r.data;
      delete dt.userInfo.memberPassword;

      if (dt?.userInfo?.blackYn === 'Y') {
        setError(t('version2_1.text95')); //'정지된 회원입니다. 관리자에게 문의해주세요.'
      } else {
        if (dt?.userInfo?.memberApprovalSe === 'B') {
          if (dt?.userInfo?.memberSe === 'A') {
            login({ userData: { ...dt.userInfo }, userPermissions: dt.userInfo.memberApprovalSe });
          } else {
            const m = await fetchDesignerMileage();
            login({ userData: { ...dt.userInfo, memberMileage: m }, userPermissions: dt.userInfo.memberApprovalSe });
          }
        } else {
          login({ userData: { ...dt.userInfo, memberMileage: 0 }, userPermissions: dt.userInfo.memberApprovalSe });
        }
      }
    } catch (e) {
      setError(t('version2_1.text96')); //'이메일 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'
      console.log('e', e);
    }
  };

  /** Google Login */

  const handleSubmitSns = async (el) => {
    try {
      const { user, socialSe } = el;
      const req = { socialSe, uniqueKey: user.id, memberEmail: user.email, fcmToken: fcm };
      const res = await postGoogleLogin({ ...req });
      if (res.statusCode !== 200) return;

      if (res.statusCode === 200 && res.data) {
        const dt = res.data;
        delete dt.userInfo.memberPassword;
        // login({ userData: dt.userInfo, userPermissions: dt.userInfo.memberApprovalSe });
        if (dt?.userInfo?.blackYn === 'Y') {
          setError(t('version2_1.text95')); //'정지된 회원입니다. 관리자에게 문의해주세요.'
        } else {
          //await fetchDesignerMileage();
          login({ userData: dt.userInfo, userPermissions: dt.userInfo.memberApprovalSe });
        }
      } else {
        handleNav('/login/join', { socialSe, socialUniqueKey: user.id, memberEmail: user.email });
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } });

      const LoginData = {
        user: {
          id: userInfo.data.sub,
          name: userInfo.data.name,
          email: userInfo.data.email,
        },
        socialSe: 'G',
      };
      handleSubmitSns(LoginData);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  useEffect(() => {
    if (user) {
      if (user?.lastLoginDt) handleNav('/');
      else handleNav('/login/JoinEnd', { memberApprovalSe: user?.memberApprovalSe });
    }
  }, [user]);

  useEffect(() => {
    setError('');
  }, [params]);

  useEffect(() => {
    initFCM();
  }, []);

  return { user, handleChange, handleSubmit, params, error, googleLoginHandler };
};

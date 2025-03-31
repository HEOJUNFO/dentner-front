import { getCommonCode } from '@api/Common';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
// import { onMessageListener } from '../../../firebase';
import ChannelService from '../../ChannelService';
import { useTranslation } from 'react-i18next';
import axios from '@api/config/axios'; // axios 명시적 import

const useApp = () => {
  const { user } = UserStore();
  const { codeList, actions, getters } = CodeStore();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [login, setLogin] = useState(false);
  const [isChannel, setChannel] = useState(false);
  const { i18n } = useTranslation();

  // 토큰 유효성 검증 추가
  useEffect(() => {
    const validateToken = async () => {
      if (user) {
        try {
          // 토큰 유효성 검증 API 호출
          await axios.validateToken();
          setLogin(true);
        } catch (err) {
          console.error('토큰 검증 실패:', err);
          // 토큰 유효하지 않음, 로그아웃 처리
          UserStore.getState().logout();
          setLogin(false);
        }
      }
    };

    // 페이지 로드 시 토큰 유효성 검증
    validateToken();
  }, []);

  useEffect(() => {
    if (user) setLogin(true);
    else setLogin(false);
  }, [user]);

  useEffect(() => {
    if (isChannel) {
      if (login) {
        const customerType = user?.memberSe === 'A' ? '의뢰인' : user?.memberSe === 'B' ? '치기공소' : '치자이너';
        const userObject = {
          language: 'ko',
          tags: [],
          profile: {
            email: user?.memberEmail,
            mobileNumber: user?.memberHp,
            name: user?.memberName,
          },
          profileOnce: {
            customerType: customerType,
            registeredAt: user?.registerDt,
          },
          unsubscribeEmail: false,
          unsubscribeTexting: true,
        };

        ChannelService.updateUser(userObject, (e) => {
          console.log(e);
        });
      } else {
        const userObject = {
          language: 'ko',
          tags: [],
          profile: null,
          profileOnce: null,
          unsubscribeEmail: false,
          unsubscribeTexting: true,
        };
        ChannelService.updateUser(userObject);
        // ChannelService.shutdown();
      }
    }
  }, [login, isChannel]);

  // DB 공통코드
  // (코드 목록은 그대로 유지)
  const code = [710, 704, 709, 759, 760, 821, 641, 910, 915, 945, 814];

  const fetchCode = async () => {
    try {
      const results = await Promise.all(
        code.map(async (el) => {
          const r = await getCommonCode(el, i18n.language);
          const { data } = r;
          return { name: el, value: data };
        })
      );
      actions.setCodeInit(results);
    } catch (error) {
      setError('서버점검');
      console.error('Error fetching codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const useChannel = () => {
    ChannelService.loadScript();

    //3. 부트하기
    ChannelService.boot(
      {
        pluginKey: 'a668ab8d-37a4-451b-bc16-bf8d5740827f',
      },
      () => {
        setChannel(true);
      }
    );
  };

  useEffect(() => {
    useChannel();
  }, []);

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return { isLoading, error };
};

export default useApp;